// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {InvestmentPool} from "../src/InvestmentPool.sol";
import {MockToken} from "../src/MockToken.sol";
import {Test} from "forge-std/Test.sol";

contract Pool is Test {
    InvestmentPool public investmentPool;
    MockToken public mockToken;
    uint[] public percent;
    uint64[] public ccip;
    address[] public _tokens;

    function setUp() public {
        mockToken = new MockToken();
        investmentPool = new InvestmentPool(
            0xF694E193200268f9a4868e4Aa017A0118C9a8177,
            0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846
        );
    }

    function testInvestment() public {
        percent.push(100);
        ccip.push(0);
        _tokens.push(address(mockToken));
        investmentPool.createPool(1000, 100, _tokens, ccip, percent, 60);
        investmentPool.invest{value: 1000}(1);
        vm.warp(block.timestamp + 100);
        investmentPool.withdrawPool(1);
    }
}
