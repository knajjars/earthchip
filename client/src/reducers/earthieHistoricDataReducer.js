export default (state = [], action) => {
  switch (action.type) {
    case "GET_HISTORIC_DATA":
      return action.payload;

    default:
      return state;
  }
};
