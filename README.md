# Witness
### A decentralized social media platform inspired by Twitter/Instagram.

Except you have 32 characters to tell the world everything... and you have to pay for it in gas. So use them wisely :)

Built with Solidity, Truffle, and React. Will soon implement IPFS for image hosting. All CRUD operations are completed through blockchain.

## Features

+ Implements web3.js to connect to rpc.
+ Users signup using Ethereum wallet address.
+ Each wallet address is limited to one account and checked for uniqueness.
+ Auth/login verification with by checking wallet address.
+ Users can update profile name.
+ Can create and read posts.

## Features to be implemented

+ Allow for image posting and profile pictures.
+ Implement IPFS for image hosting.
+ Web hosting using IPFS for complete decentralization.
+ "Following" feature for users to follow each other.
+ "Like" feature to upvote a post.

## Instructions to run

+ Install latest version of node.js, truffle (`npm install -g truffle`), testrpc (`npm install -g ethereumjs-testrpc`)
+ Run `testrpc` in terminal
+ Run `truffle deploy && npm run start` in terminal
