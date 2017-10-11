import WitnessContract from '../../../build/contracts/Witness.json'
import store from '../../store'

const contract = require('truffle-contract')

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
          let estimatedGas = instance.createNewPost.estimateGas(body);

          // Attempt to create new post.
          authenticationInstance.createNewPost(body, {
            from: coinbase,
            gas: (estimatedGas * 1.5)
          })
          .then(function(result) {
            console.log("attempting to create post!");
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