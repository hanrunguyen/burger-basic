import { orderActionTypes } from './actionTypes';

export const addOrder = (ingredients, totalPrice) => ({
  type: orderActionTypes.ADD_ORDER,
  payload: {
    ingredients,
    totalPrice
  }
});
