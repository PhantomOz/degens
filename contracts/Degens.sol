// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Degen is ERC20, Ownable {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _amount
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        _mint(msg.sender, _amount);
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }

    function getStoreItems() external pure returns (string memory) {
        return
            "The following items are available for purchase:\nSelection 1. Official Degen NFT\nSelection 2. Official Degen NFT\nSelection 3. Official Degen NFT";
    }

    function redeemItems(uint8 _choice) external returns (bool) {
        if (_choice == 1) {
            require(
                balanceOf(msg.sender) >= 100,
                "You do not have enough Degen Tokens"
            );
            transfer(owner(), 100);
            return true;
        } else if (_choice == 2) {
            require(
                balanceOf(msg.sender) >= 75,
                "You do not have enough Degen Tokens"
            );
            transfer(owner(), 75);
            return true;
        } else if (_choice == 3) {
            require(
                balanceOf(msg.sender) >= 50,
                "You do not have enough Degen Tokens"
            );
            transfer(owner(), 50);
            return true;
        }
        return false;
    }
}
