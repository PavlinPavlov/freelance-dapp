// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; // (1)
// (2)
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract PaymentChannel {
    // (3)
    using ECDSA for bytes32;

    // (4)
    struct Metadata {
        string title;
        string description;
    }

    // (5)
    event Created(address indexed owner, address indexed recipient);
    event Deposited(uint256 indexed amount);
    event Withdrawn(uint256 indexed amount, uint256 indexed totalAmount);
    event Closed(uint256 indexed timestamp, uint256 indexed amount);

    // (6)
    Metadata public metadata;
    address payable public owner;
    address payable public recipient;
    uint256 public balance;
    uint256 public claimedAmount;
    uint256 public claimedNonce;
    uint256 public deadline;

    // (7)
    constructor(
        address payable _recipient,
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) payable {
        owner = payable(msg.sender);
        recipient = _recipient;
        balance = msg.value;
        claimedAmount = 0;
        claimedNonce = 0;
        deadline = _deadline;

        metadata = Metadata({
            title: _title,
            description: _description
        });

        // (8)
        emit Created(owner, recipient);
        emit Deposited(msg.value);
    }

    // (9)
    function redeem(bytes memory signature, uint256 amount, uint256 nonce) external {

        uint256 amountToClaim = amount - claimedAmount;

        require(block.timestamp <= deadline, "Contract not opened!");
        require(msg.sender == recipient, "Sender is not contract receipient!");
        require(amount > claimedAmount, "Amount - claimed is no > than 0!");
        require(amountToClaim <= balance, "Insufficient balance!");
        require(nonce > claimedNonce, "Nonce already claimed!");

        bytes32 message = prefixed(keccak256(abi.encodePacked(address(this), amount, nonce)));

        require(recoverSigner(message, signature) == owner, "Signature not valued!");

        recipient.transfer(amountToClaim);
        balance -= amountToClaim;
        claimedAmount += amount;
        claimedNonce = nonce;

        emit Withdrawn(amountToClaim, amount);
    }

    // (10)
    function recoverSigner(bytes32 message, bytes memory sig)
        public
        pure
        returns (address)
    {
        return message.recover(sig);
    }

    // (11)
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    // (12)
    function claimTimeout() public {
        require(msg.sender == owner);

        uint256 currTime = block.timestamp;
        require(currTime > deadline, "Contract still opened!");

        uint256 leftBalance = address(this).balance;
        require(leftBalance > 0, "No funds available!");
        payable(msg.sender).transfer(leftBalance);
        balance = 0;

        emit Closed(currTime, leftBalance);
    }

}
