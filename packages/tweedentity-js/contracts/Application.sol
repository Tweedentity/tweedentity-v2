// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IdentityStore
 * @version 1.0.0
 * @author Francesco Sullo <francesco@sullo.co>
 * @dev Key/value store for identities
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Application is Ownable {

    event AppAdded(
        uint indexed id,
        bytes32 indexed nickname
    );

    uint constant public maxNumberOfApps = 100;

    uint public lastAppId;
    mapping(uint => bytes32) public apps;

    constructor() {
        // tweedentity
        apps[0] = 0x7477656564656e74697479000000000000000000000000000000000000000000;
    }

    function addApp(
        bytes32 _nickname
    ) public
    onlyOwner
    {
        require(
            _nickname > 0,
            "Empty nickname"
        );
        require(
            lastAppId < maxNumberOfApps - 1,
            "Limit reached. New apps not allowed"
        );

        lastAppId++;
        apps[lastAppId] = _nickname;
        emit AppAdded(lastAppId, _nickname);
    }

}
