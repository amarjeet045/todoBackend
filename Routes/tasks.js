const express = require("express");
const Task = require("../model/Task");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.get("/tasks", async (req, res) => {
  try {
    if (
      req.headers.hasOwnProperty("authorization") &&
      req.headers.authorization !== "" &&
      req.headers.authorization !== undefined
    ) {
      const bearerToken = req.headers.authorization.split(" ")[1];
      const userRecord = jwt.decode(bearerToken, {
        complete: true,
      });

      const tasks = await Task.find({
        email: userRecord.payload.email,
        status: "PENDING",
      });

      return res.json({
        tasks,
        message: "Success",
        success: true,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "UnAuthorized request",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

module.exports =  router