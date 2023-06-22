const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = require("../model/Task");
router.put("/task", async (req, res) => {
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

      const id = req.query.id;

      const docFind = await Task.findById(id);

      if (docFind.email === userRecord.payload.email) {
        await Task.findByIdAndUpdate(id, {
          timestamp: Date.now(),
          status: req.body.status,
          task: req.body.task,
        });
        return res
          .status(200)
          .send({ success: true, message: "Task is updated" });
      } else {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized request to update  task",
        });
      }
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
