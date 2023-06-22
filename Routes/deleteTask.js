const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = require("../model/Task");

router.delete("/taskdelete", async (req, res) => {
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
      console.log(userRecord);
      const id = req.query.id;

      const docFind = await Task.findById(id);

      

      if (docFind.email === userRecord.payload.email) {
        await Task.findByIdAndRemove({
          _id: id,
        });
        return res
          .status(200)
          .send({ success: true, message: "Task is deleted" });
      } else {
        return res
          .status(401)
          .send({
            success: false,
            message: "UnAuthorized request to delete a task",
          });
      }

      //   check id doc and userrecord payload email is same or not
    } else {
      return res.status(404).send({
        success: false,
        message: "UnAuthorized request",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Something Went Wrong" });
  }
});
module.exports = router;
