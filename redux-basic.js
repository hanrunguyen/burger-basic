const redux = require('redux');
const createStore = redux.createStore;

const intializeState = {
  counter: 0
};

// Reducer
const rootReducer = (state = intializeState, action) => {
  switch (action.type) {
    case 'INC_COUNTER':
      return {
        ...state,
        counter: state.counter + 1
      };
    case 'ADD_COUNTER':
      return {
        ...state,
        counter: state.counter + action.value
      };

    default:
      break;
  }
  return state;
};

// Store
const store = createStore(rootReducer);

// Subcription
store.subscribe(() => {
  console.log('Subscription', store.getState());
});

// Dispatching actions
store.dispatch({ type: 'INC_COUNTER' });
console.log(store.getState(), 'store.getState()');
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
console.log(store.getState(), 'store.getState()');
