import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  if (err.response && err.response.data) {
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  getEarthies() {
    return service
      .get("/list-earthies")
      .then(res => {
        return res;
      })
      .catch(errHandler);
  },

  getOneEarthie(macAddress) {
    return service
      .get(`/get-earthie/${macAddress}`)
      .then(res => {
        return res;
      })
      .catch(errHandler);
  },

  getHistoricData(macAddress) {
    return service
      .get(`/list-earthies/get-historic-data/${macAddress}`)
      .then(res => {
        if (res.status === 200) {
          JSON.stringify(res.data);
        }
        return res;
      })
      .catch(errHandler);
  },

  editEarthie(macAddress, data) {
    return service
      .patch(`/edit-earthie/${macAddress}`, data)
      .then(res => {
        if (res.status === 200) {
          JSON.stringify(res.data);
        }
        return res;
      })
      .catch(errHandler);
  },

  deleteEarthie(macAddress) {
    return service
      .delete(`/delete/${macAddress}`)
      .then(res => {
        if (res.status === 200) {
          JSON.stringify(res.data);
        }
        return res;
      })
      .catch(errHandler);
  }
};
