//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IOracle.sol";

contract DEX {
    IOracle public oracle;

    constructor(address _oracle) {
        oracle = IOracle(_oracle);
    }

    function trade() external {
        bytes32 key = keccak256(abi.encodePacked("BTC/USD"));
        (bool result, uint timestamp, uint data) = oracle.getData(key);
        //do something with data
    }
}