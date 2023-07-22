// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Puzzle is ERC1155, Ownable {
    uint256 public immutable PIECE_NUMBER;
    uint256 public pieceReward;
    uint256 public finalPuzzleReward;

    constructor(string memory uri, uint256 _PIECE_NUMBER, uint256 _pieceReward, uint256 _finalPuzzleReward)
        ERC1155(uri)
    {
        PIECE_NUMBER = _PIECE_NUMBER;
        pieceReward = _pieceReward;
        finalPuzzleReward = _finalPuzzleReward;
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id) external payable onlyOwner {
        require(msg.value == pieceReward, "incorrect amount");
        require(id < PIECE_NUMBER, "Exceed number of pieces");
        require(balanceOf(account, id) == 0, "token already in possession");
        _mint(account, id, 1, "");

        (bool ok,) = payable(address(this)).call{value: pieceReward}("");
        require(ok, "call failed");
    }

    function claimProofOfLearn(address account) external {
        uint256 id = PIECE_NUMBER + 1;
        require(balanceOf(account, id) == 0, "token already in possession");

        for (uint256 i = 0; i < PIECE_NUMBER; ++i) {
            require(balanceOf(account, i) == 1, "not all pieces in possession");
        }

        _mint(account, id, 1, "");
    }

    function experienceCompleted(address account) external view returns (bool) {
        return balanceOf(account, PIECE_NUMBER + 1) == 1;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
