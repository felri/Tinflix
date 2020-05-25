import actions from 'src/redux/likes/types';

export default (state = {data: [], error: false}, action) => {
  const newState = {...state};
  switch (action.type) {
    case actions.SET_LIKE:
      newState.data.push(action.payload);
      newState.error = false;
      return newState;
    // case actions.REMOVE_LIKE:
    //   newState.error = true;
    //   return newState;
    case actions.CLEAN_LIKES:
      newState.data = [];
      newState.error = false;
      return newState;
    default:
      return state;
  }
};
