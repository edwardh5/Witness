const initialState = {
  feed: null
}

const feedReducer = (state = initialState, action) => {
  if (action.type === 'LOAD_FEED_SUCCESS')
  {
    return Object.assign({}, state, {
      feed: action.payload
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
