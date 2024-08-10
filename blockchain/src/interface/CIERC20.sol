// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface CIERC20 {
    function withdraw(uint amount) external;

    function deposit() external payable;

    function approve(address guy, uint wad) external;
}
