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

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  signup(userInfo) {
    return service
      .post("/auth/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res;
      })
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post("/auth/login", {
        email,
        password
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res;
      })
      .catch(errHandler);
  },

  changePassword(oldPassword, newPassword) {
    return service
      .post("auth/change-password", {
        oldPassword,
        newPassword
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
        }
        return res;
      })
      .catch(errHandler);
  },
  changeEmail(oldEmail, newEmail) {
    return service
      .post("auth/change-email", {
        oldEmail,
        newEmail
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
        }
        return res;
      })
      .catch(errHandler);
  },

  logout() {
    window.localStorage.clear();

    return service.get("/auth/logout");
  }
};
