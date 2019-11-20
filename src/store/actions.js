export const addOrder = ingredients => dispatch => {
  dispatch({ type: 'ADD_ORDER', ingredients });
};
