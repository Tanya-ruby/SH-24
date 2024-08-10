// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Client} from "ccip/contracts/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "ccip/contracts/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {BaseFactory} from "../BaseFactory.sol";
import {CIERC20} from "../interface/CIERC20.sol";

contract Receiver is CCIPReceiver {
    struct Pool {
        uint poolId;
        address[] investmentTokens; // [Token A address, Token B address, ...]
        mapping(address => uint) tokenBalances;
    }

    struct CCIPDetails {
        address tokenAddress;
        bool toInvest;
        uint tokenAmount;
        uint poolId;
    }

    mapping(uint => Pool) public pools;
    uint public poolCount;

    BaseFactory[] public tokenVaults;
    mapping(address token => uint vaultID) public tokenVaultID;

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender // The address of the sender from the source chain.
    );

    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    string private s_lastReceivedText; // Store the last received text.

    constructor(address router) CCIPReceiver(router) {}

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        CCIPDetails memory ccipDetails = abi.decode(
            any2EvmMessage.data,
            (CCIPDetails)
        );
        if (ccipDetails.toInvest) {
            ccipInvest(ccipDetails);
        } else {
            withdraw(ccipDetails);
        }

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)) // abi-decoding of the sender address,
        );
    }

    function ccipInvest(CCIPDetails memory _ccipDetails) internal {
        CIERC20(_ccipDetails.tokenAddress).deposit{
            value: _ccipDetails.tokenAmount
        }();
        if (tokenVaultID[_ccipDetails.tokenAddress] == 0)
            addVault(_ccipDetails.tokenAddress);
        BaseFactory _vault = tokenVaults[
            tokenVaultID[_ccipDetails.tokenAddress] - 1
        ];
        CIERC20(_ccipDetails.tokenAddress).approve(
            address(_vault),
            _ccipDetails.tokenAmount
        );
        _vault.deposit(_ccipDetails.poolId, _ccipDetails.tokenAmount);
        Pool storage _pool = pools[_ccipDetails.poolId];
        _pool.investmentTokens.push(_ccipDetails.tokenAddress);
        _pool.tokenBalances[_ccipDetails.tokenAddress] = _ccipDetails
            .tokenAmount;
    }

    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, string memory text)
    {
        return (s_lastReceivedMessageId, s_lastReceivedText);
    }

    function addVault(address _token) internal {
        BaseFactory _vault = new BaseFactory(address(_token));
        tokenVaults.push(_vault);
        tokenVaultID[_token] = tokenVaults.length;
    }

    function withdraw(CCIPDetails memory _ccipDetails) internal {
        BaseFactory _vault = tokenVaults[
            tokenVaultID[_ccipDetails.tokenAddress] - 1
        ];

        _vault.withdraw(_ccipDetails.poolId, _ccipDetails.tokenAmount);
        CIERC20(_ccipDetails.tokenAddress).withdraw(_ccipDetails.tokenAmount);
    }

    receive() external payable {}
}
