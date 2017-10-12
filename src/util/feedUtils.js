// Async function that takes a feed length and the contract instance.
// Fetches feed by batches then returns the merging of them.
function loadFeedByBatch(feedLength, contractInst) {
  const promises = [];
  for (let i = feedLength; i > 0; i -= 2) {
    if (i - 2 >= 1 || i - 2 === 0) {
      promises.push(contractInst.getTwoPostsFromNthIdx(i - 1));
    } else {
      promises.push(contractInst.getSinglePostFromNthIdx(i - 1));
    }
  }

  let posts = [];
  let addresses = [];
  return Promise.all(promises).then(batchedPosts => {
    batchedPosts.forEach(batch => {
      posts = posts.concat(batch[0]);
      addresses = addresses.concat(batch[1]);
    });
    return [posts, addresses];
  });
}

export default loadFeedByBatch;
