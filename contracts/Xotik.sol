pragma solidity ^0.4.2;

contract Xotik {
    //Name
    string public name = "Xotik";
    //Symbol
    string public symbol = "XOT";
    string public standard = "Xotik v1.0";
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    function Xotik(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    //Transfer
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        //Exception of account doesn't have enough
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        Transfer(msg.sender, _to, _value);

        return true;
        // Return a Boolean
        // Transfer Event
    }
}
