import { combineReducers } from "redux";
import earthieListReducer from "./earthieListReducer";
import earthieHistoricDataReducer from "./earthieHistoricDataReducer";
import getOneEarthieReducer from "./getOneEarthieReducer";
export default combineReducers({
  earthieList: earthieListReducer,
  earthieHistoricData: earthieHistoricDataReducer,
  getOneEarthie: getOneEarthieReducer
});
