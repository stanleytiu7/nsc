pragma solidity ^0.4.2;

contract CodeWars {

    FullstackAccount[] public fullstackAccount;

    struct FullstackAccount {
        uint points;
    }

    function addPoints() returns (bool success) {
        FullstackAccount memory addHundred;
        addHundred.points = 100;
        fullstackAccount.push(addHundred);
        return true;    
    }

    function getTotalPoints() constant returns (uint[] accountPoints) {
        uint length = fullstackAccount.length;
        uint[] memory points = new uint[](length);
        for (uint i = 0; i < length; i++) {
        points[i] = fullstackAccount[i].points;
        }
        return points;
  }


}