const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = require("../model/Task");
router.post("/task", async (req, res) => {
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

      const newTask = new Task({
        task: req.body.task,
        status: "PENDING",
        timestamp: Date.now(),
        email: userRecord.payload.email,
        createTimestamp: Date.now(),
      });
      await newTask.save();
      return res.status(200).send({ success: true, message: "Task is added" });
    } else {
      return res.status(404).send({
        success: false,
        message: "UnAuthorized request",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something Went Wrong" });
  }
});
module.exports = router;
