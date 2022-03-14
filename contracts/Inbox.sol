// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Define a new contract that will have some number of methods and variables
contract Inbox {
    // Declare all instance variables and their types that will exist in the contract
    string public message;
    
    // Constructor function (old)
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
