// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InvestTokens is ERC20 {
    address public owner;

    constructor() ERC20("CoInvestToken", "CIT") {
        owner = msg.sender;
    }

    function mint(uint amount) external {
        require(msg.sender == owner, "Owner Permissioned");
        _mint(msg.sender, amount);
    }

    function burn(uint amount) external {
        require(msg.sender == owner, "Owner Permissioned");
        _burn(msg.sender, amount);
    }

    receive() external payable {}
}
