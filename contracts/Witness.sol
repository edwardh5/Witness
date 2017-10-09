pragma solidity^0.4.15;

contract Witness {
  address public owner;

  /*struct Post {
    bytes32 body;
  }*/

  struct User {
    address userAddress;
    bytes32 username;
    bytes32[] posts;
  }

  mapping (address => User) public users;

  function Witness() {
    owner = msg.sender;
  }

//  modifier ensureNewUser(bytes32 _username) {
//    if (users[msg.sender] == '0x') {
//      /*there's already a user associated with this address*/
//    }
//    else if (/* check if username is already taken */) {
//      /*Username is already in use, please try a different username*/
//    }
//  }

  function getUser(address _userAddress) constant returns(bytes32) {
    return users[_userAddress].username;
  }

  function getPostsForUser(address _userAddress) constant returns(bytes32[]) {
    return users[_userAddress].posts;
  }

  function createNewUser(bytes32 _username) returns(bool) {
    bytes32[] memory newPosts;

    User memory newUser = User({
      userAddress: msg.sender,
      username: _username,
      posts: newPosts
    });

    users[msg.sender] = newUser;
    return true;
  }

  function createNewPost(bytes32 _body) returns(bool) {
    /*bytes32 memory newPost = _body;*/

    users[msg.sender].posts.push(_body);
    returns true;
  }
}
