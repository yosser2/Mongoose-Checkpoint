// const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.createConnection(
  "mongodb+srv://mortadhaksontini:dadakson@cluster0.pxwc8bt.mongodb.net/"
);

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

module.exports = connection;
