const express = require("express");
const app = express();
const AppRouter = require("./routes/AppRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

// enable cors
app.use(cors());

// enable post data or body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add routes
app.use("/api", AppRouter);

const PORT = 4040;

const MONGO_DB_URI = "mongodb://127.0.0.1:27017/batch02april";
mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("db connected successfully");
    app.listen(PORT, () => {
      console.log("server is running on port", PORT);
    });
  })
  .catch(() => {
    console.log(error);
  });
