import WitnessContract from '../../../build/contracts/Witness.json'
import { loginUser } from '../LoginButton/LoginButtonActions'
import store from '../../store'

const contract = require('truffle-contract')

export function signUpUser(name) {
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
          window.inst = instance;
          authenticationInstance = instance
          // Attempt to sign up user.
          authenticationInstance.createUser(name, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            return dispatch(loginUser())
          })
          .catch(function(result) {
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
