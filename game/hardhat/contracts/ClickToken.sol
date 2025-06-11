// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClickToken is ERC20, Ownable {
    constructor() ERC20("ClickToken", "CLK") Ownable(msg.sender) {}

    function mintToken() public {
        _mint(msg.sender, 10 * 10 ** decimals()); // 10 tokens per click
    }
}
