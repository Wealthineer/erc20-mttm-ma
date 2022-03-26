//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";


contract MttmMaTokenProxy{
    function mint(address to, uint256 amount) public {}
}

contract MultiMinter is AccessControl{

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor(){
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    address mttmma_addr= 0x5FbDB2315678afecb367f032d93F642f64180aa3;


    function multiMint(address[] memory _addresses, uint256[] memory _amounts ) external onlyRole(MINTER_ROLE) {
        require(_addresses.length == _amounts.length, "Number of adresses and amounts need to have the same number of entries");
        MttmMaTokenProxy mttmMaToken = MttmMaTokenProxy(mttmma_addr);
        for (uint i = 0; i < _addresses.length; i++) {
            mttmMaToken.mint(_addresses[i], _amounts[i]);
        }
    }


    function setMttmMaAddr(address _addr) public onlyRole(ADMIN_ROLE) {
        mttmma_addr = _addr;
    }

    function grantMinter(address _grantTo) public onlyRole(ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, _grantTo);
    }

    function revokeMinter(address _revokeFrom) public onlyRole(ADMIN_ROLE) {
        _revokeRole(MINTER_ROLE, _revokeFrom);
    }

    function grantAdmin(address _grantTo) public onlyRole(ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, _grantTo);
    }

    function revokeAdmin(address _revokeFrom) public onlyRole(ADMIN_ROLE) {
        _revokeRole(ADMIN_ROLE, _revokeFrom);
    }

}

