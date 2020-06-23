import actions from 'src/redux/likes/types';

export default (state = {data: [], error: false, firstTime: true}, action) => {
  const newState = {...state};
  switch (action.type) {
    case actions.SET_LIKE:
      const index = newState.data.findIndex(f => f.id === action.payload.id);
      if (index === -1) {
        newState.data.push(action.payload);
        newState.error = false;
      }
      return newState;
    case actions.REMOVE_LIKE:
      const newList = newState.data.filter(f => f.id !== action.payload);
      newState.data = newList;
      return newState;
    case actions.CLEAN_LIKES:
      newState.data = [];
      newState.error = false;
      return newState;
    case actions.SET_FIRST_TIME:
      newState.firstTime = false;
      return newState;
    default:
      return state;
  }
};
