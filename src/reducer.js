//import userDetails from './reducers/userDetails';
import photos from './reducers/photos';
import userList from './reducers/userList';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  photos,
  userList,
  router: routerReducer
});
