import {
  UPDATE_USER_LIST,
} from '../constants/actionTypes';

const defaultState = 
  { isLoading: true, dataSource:[] };
;

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_USER_LIST:
      return {
        ...state,
        dataSource: action.dataSource,        
        isLoading: action.isLoading,        
      };
    default:
      return state;
  }
};
