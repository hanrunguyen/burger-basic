import { orderActionTypes } from './actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ADD_ORDER:
      return {
        ...state,
        payload: action.payload
      };
    default:
      break;
  }
};

export default reducer;
