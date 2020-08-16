import {
  UPDATE_PHOTOS,
} from '../constants/actionTypes';

const defaultState = 
  { photos:[] };


export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return {
        ...state,
        photos: action.photos,                   
      };
    default:
      return state;
  }
};
