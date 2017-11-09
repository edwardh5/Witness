# Witness
### A decentralized social media platform inspired by Twitter/Instagram.

MVP built with Solidity, Truffle, and React. CRUD operations are completed through
the blockchain and this project implements IPFS for creating and loading posts.
Will incorporate image hosting soon.

## Features

+ Implements web3.js.
+ Users signup using Ethereum wallet address.
+ Each wallet address is limited to one account.
+ Auth/login verification with by checking wallet address.
+ Users can update profile name.
+ Can create and read posts which is stored via IPFS.

## Features to be implemented

+ Allow for image posting and profile pictures.
+ Implement IPFS for image hosting.
+ "Following" feature for users to follow each other.
+ "Like" feature to upvote a post.

## Instructions to run

+ Ensure that MetaMask is installed on Chrome Browser.
+ Install latest version of node.js, truffle (`npm install -g truffle`)
+ Run `truffle develop` in terminal
+ Run `compile` then `migrate` in the truffle console.
+ Change MetaMask to run on custom RPC on http://localhost:9545 and is logged in using
the seed phrase provided in the truffle console
+ You should be good to go!
