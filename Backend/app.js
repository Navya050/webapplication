const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Posts = require("./models/post");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
require("dotenv").config();

const app = express();
//app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

//post the data to the database

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

// app.listen(3000, () => {
//     console.log('sever listening on port:3000');
// });
module.exports = app;
