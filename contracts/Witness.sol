pragma solidity^0.4.17;
/*pragma experimental ABIDecoderV2;*/

import "./zeppelin/ownership/Ownable.sol";

contract Witness is Ownable {

// ============================== Declarations =================================
  bytes32[] public posts;
  address[] public posters;

  struct User {
    bytes32 username;
    /*address[] following;*/
  }

  mapping (address => User) public users;
  mapping (bytes32 => bool) private usernames;


// ================================ Modifiers ==================================

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
    view
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

  function getUser(address _userAddress) view returns(bytes32) {
    return (
      users[_userAddress].username
      /*users[_userAddress].following*/
    );
  }

  function getPostsLength() view returns(uint) {
    return posts.length;
  }

  function getSinglePostFromNth(uint n) view returns(bytes32, address) {
    return (posts[n], posters[n]);
  }

  function getTwoPostsFromNth(uint n) view returns(bytes32[2], address[2]) {
    bytes32[2] memory resPosts;
    address[2] memory resPosters;
    for (uint idx = 0; idx < 2; idx++) {
      if (posts[idx] == 0x0) {
        resPosts[idx] = 0x0;
        resPosters[idx] = 0x0;
      } else {
        resPosts[idx] = posts[n - idx];
        resPosters[idx] = posters[n - idx];
      }
    }
    return (resPosts, resPosters);
  }

  function getAllPosts() view returns(bytes32[]) {
    bytes32[] memory allposts;
    for (uint postIdx = 0; postIdx < posts.length; postIdx++) {
      allposts[postIdx] = posts[postIdx];
    }
    return allposts;
  }

  function createNewPost(bytes32 _body)
    userExists(msg.sender)
  {
    require(_body.length > 0);
    posts.push(_body);
    posters.push(msg.sender);
  }

  /*function followUser(address _userAddress)
    userExists(msg.sender)
    userExists(_userAddress)
    notSelf(_userAddress)
  {
    users[msg.sender].following.push(_userAddress);
  }*/

  function loadFeedOfFollowing(address _userAddress) {

  }
}
