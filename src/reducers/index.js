import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';
import web3Reducer from '../util/web3/web3Reducer';

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  feed: feedReducer,
  web3: web3Reducer
});

export default reducer;
