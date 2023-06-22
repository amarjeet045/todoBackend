const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000
app.use(cors());
app.use(express.json());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
require("dotenv").config();



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const registeration = require("./Routes/registeration");
const login = require("./Routes/login");
const addTask = require("./Routes/addTask");
const tasks = require("./Routes/tasks");
const deleteTask = require("./Routes/deleteTask");
const updateTask = require("./Routes/updateTask");
app.use("/api", cors(corsOptions), registeration);
app.use("/api", cors(corsOptions), login);
app.use("/api", addTask);
app.use("/api", tasks);
app.use("/api", deleteTask);
app.use("/api", updateTask);



connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})