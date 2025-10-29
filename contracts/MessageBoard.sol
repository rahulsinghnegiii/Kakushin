// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MessageBoard
 * @dev A simple smart contract that stores and updates a message on the blockchain
 * @notice This contract allows users to read and write a public message
 */
contract MessageBoard {
    /// @notice The current message stored on the blockchain
    string public message;

    /// @notice Event emitted when the message is updated
    /// @param sender The address that updated the message
    /// @param newMessage The new message content
    event MessageUpdated(address indexed sender, string newMessage);

    /**
     * @dev Constructor that initializes the contract with a default message
     */
    constructor() {
        message = "Hello Blockchain";
    }

    /**
     * @notice Updates the stored message
     * @dev Anyone can call this function to update the message
     * @param _msg The new message to store
     */
    function setMessage(string memory _msg) public {
        message = _msg;
        emit MessageUpdated(msg.sender, _msg);
    }

    /**
     * @notice Retrieves the current message
     * @dev This is a view function that doesn't modify state
     * @return The current message stored in the contract
     */
    function getMessage() public view returns (string memory) {
        return message;
    }
}
