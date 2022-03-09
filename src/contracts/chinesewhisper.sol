// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Chinese Whisper
 * @dev Send your whisper to the next owner of the contract
 */
contract ChineseWhisper {

    address private owner;
    string whisper;
    
    // event for logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner and set whisper to default value
     */
    constructor() {
        owner = msg.sender;
        whisper = "Let the game begin";
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Changes owner and sets sent message as new whisper
     * @param newOwner address of new owner
     * @param message message for setting the whisper
     */
    function changeOwner(address newOwner, string memory message) public isOwner {
        emit OwnerSet(owner, newOwner);
        whisper = message;
        owner = newOwner;
    }

    /**
    * @dev Return current whisper
    * @return whisper of last owner
    */
    function getWhisper() public isOwner returns (string memory) {
        return whisper;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }
}