export default (state = [], action) => {
  switch (action.type) {
    case "GET_EARTHIES":
      return action.payload;

    default:
      return state;
  }
};
