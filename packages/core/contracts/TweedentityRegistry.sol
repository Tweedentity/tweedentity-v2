// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Twiptos
 * @version 2.0.0
 * @author Francesco Sullo <francesco@sullo.co>
 * @dev Twiptos Registry
 */

import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/ITweedentityRegistry.sol";

contract TweedentityRegistry is Ownable, ITweedentityRegistry {

    mapping(bytes32 => address) public registry;

    constructor(
        bytes32[] memory names_,
        address[] memory addresses_
    ) {
        for (uint i = 0; i < names_.length; i++) {
            setData(names_[i], addresses_[i]);
        }
    }

    function setData(
        bytes32 name_,
        address address_
    )
    public override
    onlyOwner
    {
        if (address_ != address(0)) {
            registry[name_] = address_;
        }
    }

    function updateData(
        bytes32 name_,
        address address_
    )
    external override
    onlyOwner
    {
        require(
            address_ != address(0),
            "Null address"
        );
        registry[name_] = address_;
        emit RegistryUpdated(name_, address_);

    }


}
