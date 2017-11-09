import WitnessContract from '../../../build/contracts/Witness.json';
import store from '../../store';
import IPFS  from 'ipfs-mini';

const contract = require('truffle-contract');

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

export const LOADING_FEED = 'LOADING_FEED'
function loadingFeed() {
  return {
    type: LOADING_FEED,
  }
}

export const LOAD_FEED_SUCCESS = 'LOAD_FEED_SUCCESS'
function feedSuccessfullyLoaded(feed) {
  console.log("this is supposed to come second")
  return {
    type: LOAD_FEED_SUCCESS,
    payload: feed,
  }
}


// Problem is that the async calls are out of order. Dispatch is being called before
// async posts are successfully resolved.
export function loadFeed() {
  let web3 = store.getState().web3.web3Instance;
  if (typeof web3 !== 'undefined') {
    return (dispatch) => {

      dispatch(loadingFeed());

      const cont = contract(WitnessContract);
      cont.setProvider(web3.currentProvider);

      cont.deployed().then(async (instance) => {
        const lastPostId = await instance.lastPostId();
        let posts = [];

        // Can be optimized for parallel calls
        for (let i = lastPostId.c[0] - 1; i >= 0; i--) {
          const rawPost = await instance.returnPost(i);
          const postAuthor = rawPost[0];
          const postIpfsHash = rawPost[1];
          const postTimestamp = rawPost[2];

          ipfs.cat(postIpfsHash, (err, data) => {
            if (err) {
              return console.log(err);
            }

            const postInfo = {
              username: postAuthor,
              body: data,
              timestamp: postTimestamp
            };

            posts.push(postInfo);
          });
        }

        dispatch(feedSuccessfullyLoaded(posts));
      })
      .catch(err => {
        console.error(err);
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
