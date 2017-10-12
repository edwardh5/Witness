import WitnessContract from '../../../build/contracts/Witness.json';
import store from '../../store';
import loadFeedByBatch from '../../util/feedUtils';

const contract = require('truffle-contract');

// export const LOADING_FEED = 'LOADING_FEED'
// function loadingFeed() {
//   return {
//     type: LOADING_FEED
//   }
// }

export const LOAD_FEED_SUCCESS = 'LOAD_FEED_SUCCESS'
function feedSuccessfullyLoaded(feed) {
  return {
    type: LOAD_FEED_SUCCESS,
    payload: feed,
  }
}

export function loadFeed() {
  let web3 = store.getState().web3.web3Instance;

  if (typeof web3 !== 'undefined') {

    return (dispatch) => {
      const cont = contract(WitnessContract);
      cont.setProvider(web3.currentProvider);

      cont.deployed().then(instance => {

        instance.getPostsLength().then(postLength => {
          // Get post length
          loadFeedByBatch(postLength, instance).then(res => {
            dispatch(feedSuccessfullyLoaded(res));
          });

        })
        .catch(err => {
          console.error(err);
        })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
