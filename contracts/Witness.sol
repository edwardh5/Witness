pragma solidity^0.4.17;
/*pragma experimental ABIDecoderV2;*/

import "./zeppelin/ownership/Ownable.sol";
import "./strings.sol";


contract Witness is Ownable {
  using strings for *;

  struct Post {
    address author;
    string ipfsHash;
    uint timestamp;
  }

  struct User {
    bytes32 username;
  }

  mapping (address => User) public users;
  mapping (uint => Post) public posts;
  uint public lastPostId;
  uint public userCount;

  function Witness() {
    lastPostId = 0;
    userCount = 0;
  }

  function createUser(bytes32 _username) returns (bytes32) {
    require(users[msg.sender].username == 0x0);
    users[msg.sender].username = _username;
    userCount += 1;
    return users[msg.sender].username;
  }

  function returnUsername(address _address) view returns (bytes32) {
    return users[_address].username;
  }

  function login() view returns (bytes32) {
    require(users[msg.sender].username != 0x0);
    return users[msg.sender].username;
  }

  function update(bytes32 _username) {
    require(users[msg.sender].username != 0x0);
    users[msg.sender].username = _username;
  }

  function createPost(string _ipfsHash) public {
    require(_ipfsHash.toSlice().len() > 0);
    posts[lastPostId].author = msg.sender;
    posts[lastPostId].ipfsHash = _ipfsHash;
    posts[lastPostId].timestamp = block.timestamp;
    ++lastPostId;
  }

  function returnPost(uint _postIndex) public view returns (address, string, uint ) {
    return (posts[_postIndex].author, posts[_postIndex].ipfsHash, posts[_postIndex].timestamp);
  }

}
