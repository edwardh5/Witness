import WitnessContract from '../../../build/contracts/Witness.json';
import { browserHistory } from 'react-router';
import { loadFeed } from '../../views/FeedView/FeedActions';
import store from '../../store';

const contract = require('truffle-contract');

export function createPost(body) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(WitnessContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to create new post.
          authenticationInstance.createPost(body, {
            from: coinbase,
            gas: 300000,
          })
          .then(async (result) => {
            // created post
            await dispatch(loadFeed())
            return browserHistory.push('/feed');
            // return dispatch()
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
