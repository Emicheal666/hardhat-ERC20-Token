// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract ManualToken {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance; //function transferFrom

    // transfer tokens
    // subtract from address amount and add to address

    function transfer(
        address from,
        address to,
        uint256 amount
    ) public {
        balanceOf[from] = balanceOf[from] - amount;
        balanceOf[to] = balanceOf[to] + amount;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // allows people to use our token like depositing into a protocol
        require(_value <= allowance[_from][msg.sender]); // making sure the value is not greater than the balance of the address
        allowance[_from][msg.sender] -= _value;
        transfer(_from, _to, _value);
        return true;
    }
}
