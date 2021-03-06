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
  register(chipInfo) {
    return service
      .post("/register-chip", chipInfo)
      .then(res => {
        return res;
      })
      .catch(errHandler);
  }
};
