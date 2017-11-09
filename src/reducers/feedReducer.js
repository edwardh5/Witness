const initialState = {
  feed: [],
  loadingFeed: false,
}

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_FEED':
      return Object.assign({}, state, {
        feed: action.payload,
        loadingFeed: true,
      });
    case 'LOAD_FEED_SUCCESS':
      return Object.assign({}, state, {
        feed: action.payload,
        loadingFeed: false,
      });
    default:
      return state;
  }
}

export default feedReducer;
