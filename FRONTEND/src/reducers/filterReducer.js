// Action creators
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: { filter }
  };
};

// Reducer
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter;
    default:
      return state;
  }
};

export default filterReducer;
