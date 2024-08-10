// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CIERC20} from "./interface/CIERC20.sol";
import {BaseFactory} from "./BaseFactory.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TokenVault} from "./TokenVault.sol";
import {CoInvestToken} from "./CoInvestToken.sol";
import {CCIPSender} from "./crosschain/CCIPSender.sol";

contract InvestmentPool {
    struct Pool {
        address creator;
        uint totalInvestment;
        uint minInvestment;
        uint requiredAmount;
        bool isActive;
        uint[] investmentPercentages; // [x%, y%, ...]
        address[] investmentTokens; // [Token A address, Token B address, ...]
        mapping(uint tokenId => uint64 destinationChain) crossChainToken;
        mapping(address => uint) investments;
        mapping(address => uint) shares; // Stores user shares after activation
        address[] investors; // List of investors
        mapping(address => uint) tokenBalances; // Track token balances of the pool
        uint investmentTime;
        uint endTime;
    }

    mapping(uint => Pool) public pools;
    uint public poolCount;
    mapping(uint64 => address) public ccipReceivers;
    mapping(address token => uint vaultID) public tokenVaultID;
    BaseFactory[] public tokenVaults;
    CoInvestToken public coInvestToken;
    CCIPSender public ccipSender;
    // Events
    event PoolCreated(
        uint poolId,
        address creator,
        uint requiredAmount,
        uint minInvestment,
        address[] tokens,
        uint[] percentages,
        uint investmentTime
    );
    event InvestmentMade(uint poolId, address investor, uint amount);
    event PoolActivated(uint poolId);
    event InvestmentWithdrawn(uint poolId, address investor, uint amount);

    constructor(address _router, address _link) {
        addVault(0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14);
        coInvestToken = new CoInvestToken();
        ccipSender = new CCIPSender(_router, _link);
    }

    function createPool(
        uint _requiredAmount,
        uint _minInvestment,
        address[] memory _tokens,
        uint64[] memory _crossChainToken,
        uint[] memory _percentages,
        uint _investmentTime
    ) external {
        require(
            _tokens.length == _percentages.length,
            "Tokens and percentages length mismatch"
        );

        poolCount++;
        Pool storage pool = pools[poolCount];
        pool.creator = msg.sender;
        pool.requiredAmount = _requiredAmount;
        pool.minInvestment = _minInvestment;
        pool.isActive = false;
        pool.investmentTokens = _tokens;
        pool.investmentPercentages = _percentages;
        pool.investmentTime = _investmentTime;
        for (uint i = 0; i < _tokens.length; i++) {
            pool.crossChainToken[i] = _crossChainToken[i];
            if (tokenVaultID[_tokens[i]] == 0) addVault(_tokens[i]);
        }
        emit PoolCreated(
            poolCount,
            msg.sender,
            _requiredAmount,
            _minInvestment,
            _tokens,
            _percentages,
            _investmentTime
        );
    }

    function invest(uint _poolId) external payable {
        Pool storage pool = pools[_poolId];
        require(
            msg.value >= pool.minInvestment,
            "Investment below minimum amount"
        );
        require(!pool.isActive, "Pool already activated");
        require(
            pool.totalInvestment + msg.value <= pool.requiredAmount,
            "Exceeds required amount"
        );

        if (pool.investments[msg.sender] == 0) {
            pool.investors.push(msg.sender); // Add new investor
        }

        pool.investments[msg.sender] += msg.value;
        pool.totalInvestment += msg.value;
        pool.shares[msg.sender] = (msg.value * 100) / pool.requiredAmount;
        coInvestToken.mint(msg.sender, msg.value);
        emit InvestmentMade(_poolId, msg.sender, msg.value);

        // Automatically activate the pool if the required amount is reached
        if (pool.totalInvestment == pool.requiredAmount && !pool.isActive) {
            activatePool(_poolId);
        }
    }

    function activatePool(uint _poolId) private {
        Pool storage pool = pools[_poolId];
        require(!pool.isActive, "Pool already activated");
        require(
            pool.totalInvestment >= pool.requiredAmount,
            "Required amount not met"
        );
        pool.endTime = block.timestamp + pool.investmentTime;

        pool.isActive = true;

        // Perform the investment based on percentages
        for (uint i = 0; i < pool.investmentTokens.length; i++) {
            address token = pool.investmentTokens[i];
            uint percentage = pool.investmentPercentages[i];
            uint investmentAmount = (pool.totalInvestment * percentage) / 100;
            uint tokenAmount = investmentAmount; // priceOracle.getTokenAmount(
            // token
            // );
            if (pool.crossChainToken[i] != 0) {
                ccipSender.sendMessage(
                    pool.crossChainToken[i],
                    ccipReceivers[pool.crossChainToken[i]],
                    token,
                    true,
                    tokenAmount,
                    _poolId
                );
            } else {
                CIERC20(token).deposit{value: investmentAmount}(); // Minting tokens with eth
                BaseFactory _vault = tokenVaults[tokenVaultID[token] - 1];
                CIERC20(token).approve(address(_vault), investmentAmount);
                _vault.deposit(_poolId, tokenAmount);
            }
            pool.tokenBalances[token] = tokenAmount;
        }

        emit PoolActivated(_poolId);
    }

    function withdrawPool(uint _poolId) external {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");
        require(
            block.timestamp > pool.endTime,
            "Withdrawal period not started"
        );

        uint totalETHValue = 0;

        // Calculate the total ETH value of the pool's tokens and transfer to contract
        for (uint i = 0; i < pool.investmentTokens.length; i++) {
            address token = pool.investmentTokens[i];
            uint totalTokenBalance = pool.tokenBalances[token];

            if (pool.crossChainToken[i] != 0) {
                ccipSender.sendMessage(
                    pool.crossChainToken[i],
                    ccipReceivers[pool.crossChainToken[i]],
                    token,
                    false,
                    totalTokenBalance,
                    _poolId
                );
            } else {
                BaseFactory _vault = tokenVaults[tokenVaultID[token] - 1];
                // Fetch the ETH value of the total token balance
                uint tokenETHValue = _vault.getValue(_poolId);
                // Add to the total ETH value
                totalETHValue += tokenETHValue;

                _vault.withdraw(_poolId, totalTokenBalance);
                CIERC20(token).withdraw(totalTokenBalance);
            }
        }

        // Distribute the total ETH value among all investors
        distributeShares(_poolId, totalETHValue);

        // Reset pool state
        pool.isActive = false;
        pool.totalInvestment = 0;
    }

    function distributeShares(uint _poolId, uint totalETHValue) private {
        Pool storage pool = pools[_poolId];

        for (uint i = 0; i < pool.investors.length; i++) {
            address investor = pool.investors[i];
            uint sharePercentage = pool.shares[investor];
            if (sharePercentage > 0) {
                uint investorETHValue = (totalETHValue * sharePercentage) / 100;

                // Transfer the investor's share of the ETH value
                payable(investor).transfer(investorETHValue);

                // Reset the investor's shares and investments
                coInvestToken.burn(investor, pool.investments[investor]);
                pool.shares[investor] = 0;
                pool.investments[investor] = 0;
            }
        }
    }

    function getInvestmentValue(uint _poolId) external view returns (uint) {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");

        uint totalValue = 0;

        for (uint i = 0; i < pool.investmentTokens.length; i++) {
            address token = pool.investmentTokens[i];
            BaseFactory _vault = tokenVaults[tokenVaultID[token] - 1];
            // Fetch the ETH value of the total token balance
            uint tokenETHValue = _vault.getValue(i);
            totalValue += tokenETHValue;
        }

        return totalValue;
    }

    function getInvestors(
        uint _poolId
    ) external view returns (address[] memory) {
        return pools[_poolId].investors;
    }

    function addVault(address _token) internal {
        BaseFactory _vault = new BaseFactory(address(_token));
        tokenVaults.push(_vault);
        tokenVaultID[_token] = tokenVaults.length;
    }

    receive() external payable {}

    fallback() external payable {}
}
