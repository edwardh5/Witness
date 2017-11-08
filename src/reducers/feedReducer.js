const initialState = {
  feed: null,
  loadingFeed: false,
}

const feedReducer = (state = initialState, action) => {
  if (action.type === 'LOADING_FEED') {
    return Object.assign({}, state, {
      loadingFeed: true,
    });
  } else if (action.type === 'LOAD_FEED_SUCCESS') {
    return Object.assign({}, state, {
      feed: action.payload,
      loadingFeed: false,
    });
  }

  // if (action.type === 'LOADING_FEED')
  // {
  //   return Object.assign({}, state, {
  //     data: null
  //   })
  // }

  return state;
}

export default feedReducer;
