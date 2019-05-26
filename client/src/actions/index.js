import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

export const getEarthies = () => async dispatch => {
  const res = await service.get("/list-earthies");
  dispatch({ type: "GET_EARTHIES", payload: res.data });
};

export const getHistoricData = macAddress => async dispatch => {
  const res = await service.get(
    `/list-earthies/get-historic-data/${macAddress}`
  );
  dispatch({ type: "GET_HISTORIC_DATA", payload: res.data });
};

export const getOneEarthie = macAddress => async dispatch => {
  const res = await service.get(`/get-earthie/${macAddress}`);
  dispatch({ type: "GET_ONE_EARTHIE", payload: res.data });
};
