// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    // initial supply 20e18
    constructor(uint256 initialSupply) ERC20("EMic", "EM") {
        _mint(msg.sender, initialSupply);
    }
}
