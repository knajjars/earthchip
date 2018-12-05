import axios from "axios";

const service = axios.create({
  baseURL: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "application/json"
  }
});

const errHandler = err => {
  if (err.response && err.response.data) {
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,
  getJoke() {
    return service
      .get("/")
      .then(res => {
        return res;
      })
      .catch(errHandler);
  }
};
