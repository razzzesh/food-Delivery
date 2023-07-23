const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
//import mongoose from "mongoose";

const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const app = express();
const MONGO_URL =
  "mongodb+srv://razzesh23:rajesh2002@cluster0.rbkmi05.mongodb.net/?retryWrites=true&w=majority";

// connect our db
//mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// routes & middlewares
// those two middlewares make req.body accessible, otherwise it would be undefined!!!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));
app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController);

// start our server
app.listen(process.env.PORT, () =>
  console.log("Server has been started successfully")
);

// server is on port 5000, client is on port 3000,
// we are going to get a cors ERROR!!, but cors() removes that's error
