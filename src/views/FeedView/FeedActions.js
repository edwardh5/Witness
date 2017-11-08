import WitnessContract from '../../../build/contracts/Witness.json';
import store from '../../store';
// import loadFeedByBatch from '../../util/feedUtils';

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

      cont.deployed().then(async (instance) => {
        const lastPostId = await instance.lastPostId();
        let res = [];

        for (let i = lastPostId.c[0] - 1; i >= 0; i--) {
          const post = await instance.returnPost(i);
          const username = await instance.returnUsername(post[0]);
          res.push({username, body: post[1], timestamp: post[2]});
        }
        dispatch(feedSuccessfullyLoaded(res));

        // instance.getPostsLength().then(postLength => {
        //   // Get post length
        //   loadFeedByBatch(postLength, instance).then(res => {
        //     dispatch(feedSuccessfullyLoaded(res));
        //   });

        })
        .catch(err => {
          console.error(err);
        })

      // })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

// export loadFeed;
