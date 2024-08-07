// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoInvestToken is ERC20 {
    address public owner;
    constructor() ERC20("CoInvestToken", "CIT") {
        owner = msg.sender;
    }

    function mint(address _user, uint amount) external {
        require(msg.sender == owner, "Owner Permissioned");
        _mint(_user, amount);
    }

    function burn(address _user, uint amount) external {
        require(msg.sender == owner, "Owner Permissioned");
        _burn(_user, amount);
    }

    receive() external payable {}
}
