pragma solidity^0.4.15;

import "./zeppelin/ownership/Ownable.sol";

contract Witness is Ownable {
  /*struct Post {
    bytes32 body;
  }*/

  struct User {
    bytes32 username;
    bytes32[] posts;
    address[] following;
  }

  mapping (address => User) private users;
  mapping (bytes32 => bool) private usernames;

// =============================== Modifiers ==================================

  modifier ensureUsernameUnused(bytes32 _username) {
    require(usernames[_username] != true);
    _;
  }

  modifier userExists(address _userAddress) {
    require(users[_userAddress].username != 0x0);
    _;
  }

  modifier notSelf(address _userAddress) {
    require(_userAddress != msg.sender);
    _;
  }

  modifier ensureIsNonZero(bytes32 name) {
    require(name != 0x0);
    _;
  }

// ============================= Auth functions ================================

  function login()
    ensureIsNonZero(users[msg.sender].username)
    constant
    returns(bytes32)
  {
    return (users[msg.sender].username);
  }

  function signup(bytes32 _username)
    ensureIsNonZero(_username)
    payable
    returns(bytes32)
  {
    if (users[msg.sender].username == 0x0) {
      users[msg.sender].username = _username;

      /*usernames[_username] = true;*/
    }
    return (users[msg.sender].username);
  }

  function update(bytes32 _username)
    ensureIsNonZero(_username)
    payable
    returns(bytes32)
  {
    if (users[msg.sender].username != 0x0) {
      users[msg.sender].username = _username;
      return (users[msg.sender].username);
    }
    revert();
  }

// ============================ Contract functions =============================

  function getUser(address _userAddress) constant returns(bytes32, bytes32[], address[]) {
    return (
      users[_userAddress].username,
      users[_userAddress].posts,
      users[_userAddress].following
    );
  }

  function createNewPost(bytes32 _body)
    userExists(msg.sender)
    returns(bool)
  {
    require(_body.length > 0);
    users[msg.sender].posts.push(_body);
    return true;
  }

  function followUser(address _userAddress)
    userExists(msg.sender)
    userExists(_userAddress)
    notSelf(_userAddress)
  {
    users[msg.sender].following.push(_userAddress);
  }

  function loadFeedOfFollowing(address _userAddress) {

  }
}
