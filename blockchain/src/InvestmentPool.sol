// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "forge-std/Test.sol";
interface IERC20 {
    function withdraw(uint256 amount) external;
    function deposit() external payable;
}

interface ITokenPriceOracle {
    function getValueToken(
        uint256 investedToken,
        address token
    ) external view returns (uint256);
    function getTokenAmount(
        uint256 investmentAmount,
        address token
    ) external view returns (uint256);
}

contract InvestmentPool {
    struct Pool {
        address creator;
        uint256 totalInvestment;
        uint256 minInvestment;
        uint256 requiredAmount;
        bool isActive;
        uint256[] investmentPercentages; // [x%, y%, ...]
        address[] investmentTokens; // [Token A address, Token B address, ...]
        mapping(address => uint256) investments;
        mapping(address => uint256) shares; // Stores user shares after activation
        address[] investors; // List of investors
        mapping(address => uint256) tokenBalances; // Track token balances of the pool
        uint256 investmentTime;
        uint256 endTime;
    }

    mapping(uint256 => Pool) public pools;
    uint256 public poolCount;

    ITokenPriceOracle public priceOracle; // Token price oracle

    // Events
    event PoolCreated(
        uint256 poolId,
        address creator,
        uint256 requiredAmount,
        uint256 minInvestment,
        address[] tokens,
        uint256[] percentages,
        uint256 investmentTime
    );
    event InvestmentMade(uint256 poolId, address investor, uint256 amount);
    event PoolActivated(uint256 poolId);
    event InvestmentWithdrawn(uint256 poolId, address investor, uint256 amount);

    constructor(address _priceOracle) {
        priceOracle = ITokenPriceOracle(_priceOracle);
    }

    function createPool(
        uint256 _requiredAmount,
        uint256 _minInvestment,
        address[] memory _tokens,
        uint256[] memory _percentages,
        uint256 _investmentTime
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

    function invest(uint256 _poolId) external payable {
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

        emit InvestmentMade(_poolId, msg.sender, msg.value);

        // Automatically activate the pool if the required amount is reached
        if (pool.totalInvestment >= pool.requiredAmount && !pool.isActive) {
            activatePool(_poolId);
        }
    }

    function activatePool(uint256 _poolId) public {
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
            uint256 percentage = pool.investmentPercentages[i];
            uint256 investmentAmount = (pool.totalInvestment * percentage) /
                100;

            uint256 tokenAmount = 
            // priceOracle.getTokenAmount(
                investmentAmount;
                // token
            // );
            IERC20(token).deposit{value: investmentAmount}(); // Minting tokens with eth

            pool.tokenBalances[token] = tokenAmount;
        }

        // Calculate and store shares for each user
        for (uint i = 0; i < pool.investors.length; i++) {
            address investor = pool.investors[i];
            uint256 investment = pool.investments[investor];
            pool.shares[investor] = (investment * 100) / pool.totalInvestment;
        }

        emit PoolActivated(_poolId);
    }

    function withdraw(uint256 _poolId) external {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");
        require(
            block.timestamp > pool.endTime,
            "Withdrawal period not started"
        );

        uint256 totalETHValue = 0;

        // Calculate the total ETH value of the pool's tokens and transfer to contract
        for (uint i = 0; i < pool.investmentTokens.length; i++) {
            address token = pool.investmentTokens[i];
            uint256 totalTokenBalance = pool.tokenBalances[token];

            // Fetch the ETH value of the total token balance
            uint256 tokenETHValue = 
            // priceOracle.getValueToken(
                totalTokenBalance;
            //     token
            // );

            // Add to the total ETH value
            totalETHValue += tokenETHValue;

            // Burn tokens or transfer them to the contract for further processing
            IERC20(token).withdraw(totalTokenBalance);
        }

        // Distribute the total ETH value among all investors
        distributeShares(_poolId, totalETHValue);

        // Reset pool state
        pool.isActive = false;
        pool.totalInvestment = 0;
    }

    function distributeShares(uint256 _poolId, uint256 totalETHValue) internal {
        Pool storage pool = pools[_poolId];

        for (uint i = 0; i < pool.investors.length; i++) {
            address investor = pool.investors[i];
            uint256 sharePercentage = pool.shares[investor];
            if (sharePercentage > 0) {
                uint256 investorETHValue = (totalETHValue * sharePercentage) /
                    100;

                // Transfer the investor's share of the ETH value
                payable(investor).transfer(investorETHValue);

                // Reset the investor's shares and investments
                pool.shares[investor] = 0;
                pool.investments[investor] = 0;
            }
        }
    }

    function getInvestmentValue(
        uint256 _poolId
    ) external view returns (uint256) {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");

        uint256 totalValue = 0;

        for (uint i = 0; i < pool.investmentTokens.length; i++) {
            address token = pool.investmentTokens[i];
            uint256 tokenBalance = pool.tokenBalances[token];
            uint256 tokenETHValue = 
            // priceOracle.getValueToken(
                tokenBalance;
                // token
            // );
            totalValue += tokenETHValue;
        }

        return totalValue;
    }

    function getInvestors(
        uint256 _poolId
    ) external view returns (address[] memory) {
        return pools[_poolId].investors;
    }

    receive() external payable{}

}
