pragma solidity^0.4.17;
/*pragma experimental ABIDecoderV2;*/

import "./zeppelin/ownership/Ownable.sol";

contract Witness is Ownable {

// ============================== Declarations =================================
  Post[] public posts;
  uint public numPosts = 0;

  struct Post {
    address creatorAddress;
    bytes32 body;
  }

  struct User {
    bytes32 username;
    address[] following;
  }

  mapping (address => User) private users;
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

  function getUser(address _userAddress) view returns(bytes32, address[]) {
    return (
      users[_userAddress].username,
      users[_userAddress].following
    );
  }

  function getAllPosts() view returns(Post[]) {
    Post[numPosts] memory allposts;
    for (uint postIdx = 0; postIdx < numPosts; postIdx++) {
      allposts[postIdx].body = posts[postIdx].body;
      allposts[postIdx].body = posts[postIdx].body;
    }
    return allposts;
  }

  function createNewPost(bytes32 _body)
    userExists(msg.sender)
    returns(bool)
  {
    require(_body.length > 0);
    Post memory newPost;
    newPost.body = _body;
    newPost.creatorAddress = msg.sender;

    posts.push(newPost);
    numPosts++;
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
