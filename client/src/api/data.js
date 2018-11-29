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

  getSoilMoisture() {
    return service
      .get("/data-earthchip/getSoilMoisture")
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        if (res.status === 200) {
          JSON.stringify(res.data);
        }
        return res;
      })
      .catch(errHandler);
  }
};