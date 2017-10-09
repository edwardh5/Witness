pragma solidity^0.4.15;

contract Witness {
  address public owner;

  /*struct Post {
    bytes32 body;
  }*/

  struct User {
    bytes32 username;
    bytes32[] posts;
    address[] following;
    bool exists;
  }

  mapping (address => User) private users;
  mapping (bytes32 => bool) private usernames;

  function Witness() {
    owner = msg.sender;
  }

  modifier ensureNewUser(bytes32 _username) {
    require(
      users[msg.sender].exists != true &&
      usernames[_username] != true
    );
    _;
  }

  /* Does this ensure what it's supposed to ensure? */
  modifier userExists(address _userAddress) {
    require(users[_userAddress].exists == true);
    _;
  }

  modifier notSelf(address _userAddress) {
    require(_userAddress != msg.sender);
    _;
  }

  function getUser(address _userAddress) constant returns(bytes32, bytes32[], address[]) {
    return (
      users[_userAddress].username,
      users[_userAddress].posts,
      users[_userAddress].following
    );
  }

  function createNewUser(bytes32 _username) ensureNewUser(_username) returns(bool) {
    bytes32[] memory _posts;
    address[] memory _following;

    User memory newUser = User({
      username: _username,
      posts: _posts,
      following: _following,
      exists: true
    });

    /*There's probably a better/less expensive way way to check for existence of a username*/
    usernames[_username] = true;

    users[msg.sender] = newUser;
    return true;
  }

  function createNewPost(bytes32 _body) userExists(msg.sender) returns(bool) {
    require(_body.length > 0);
    users[msg.sender].posts.push(_body);
    return true;
  }

  function followUser(address _userAddress)
  userExists(msg.sender)
  userExists(_userAddress)
  notSelf(address _userAddress)
  notSelf {
    users[msg.sender].following.push(_userAddress);
  }
}
