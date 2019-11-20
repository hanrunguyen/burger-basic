const intialState = {
  ingredients: null
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: action.totalPrice
      };
    default:
      break;
  }
};

export default reducer;
