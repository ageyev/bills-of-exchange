// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BillsOfExchange is ERC20, ERC20Burnable, Ownable {

    constructor() ERC20("BillsOfExchange", "Bills") {
        //
    }

    // The default value of decimals is 18. To change this, you should override this function so it returns a different value.
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}