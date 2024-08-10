//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {BaseStrategy} from "tokenized-strategy/src/BaseStrategy.sol";
import {InvestTokens} from "./InvestTokens.sol";

contract BaseFactory is BaseStrategy {
    InvestTokens public immutable rewardTokens;
    address private poolContract;
    mapping(uint poolId => uint tokens) private poolTokens;

    modifier onlyOwner() {
        require(msg.sender == poolContract, "Owner Permissioned");
        _;
    }

    constructor(address _asset) BaseStrategy(_asset, "Investment Tokens") {
        poolContract = msg.sender;
        rewardTokens = new InvestTokens();
    }

    function getValue(uint poolId) external view returns (uint) {
        uint tokens = poolTokens[poolId];
        uint valueOfTokens = tokens;
        return valueOfTokens;
    }

    function _deployFunds(uint256 _amount) internal virtual override {
        rewardTokens.mint(_amount);
    }

    function _freeFunds(uint256 _amount) internal virtual override {
        rewardTokens.burn(_amount);
    }

    function deposit(uint _poolId, uint _tokenAmount) external onlyOwner {
        _deployFunds(_tokenAmount);
        poolTokens[_poolId] = _tokenAmount;
    }

    function withdraw(uint _poolId, uint tokenAmount) external onlyOwner {
        _freeFunds(tokenAmount);
        poolTokens[_poolId] = 0;
    }

    function _harvestAndReport()
        internal
        virtual
        override
        returns (uint256 _totalAssets)
    {}
}
