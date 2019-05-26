export default (state = [], action) => {
  switch (action.type) {
    case "GET_ONE_EARTHIE":
      return action.payload;

    default:
      return state;
  }
};
