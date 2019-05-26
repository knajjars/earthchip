require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const nocache = require("nocache");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("passport");
require("./configs/database");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(nocache());

// Set "Access-Control-Allow-Origin" header
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../client/build")));

// Enable authentication using session + passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
require("./routes/passport")(app);

app.use("/api", require("./routes/index"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/register-chip", require("./routes/earthies/register-earthie"));
app.use("/api/data-earthchip", require("./routes/earthies/data-earthie"));
app.use("/api/list-earthies", require("./routes/earthies/list-earthies"));
app.use("/api/get-earthie", require("./routes/earthies/get-earthie"));
app.use("/api/edit-earthie", require("./routes/earthies/edit-earthie"));
app.use("/api/delete", require("./routes/earthies/delete-earthie"));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// For any other routes, redirect to the index.html file of React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

module.exports = app;
