const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profiles = require("../model/users");
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const userFind = await Profiles.findOne({ email: req.body.email });
   
    if (Object.keys(userFind).length > 0) {
      const passowrdCompare = await bcrypt.compare(
        req.body.password,
        userFind.password
      );

      if (passowrdCompare) {
        const token = jwt.sign({ email: req.body.email }, "verySecretValue", {
          expiresIn: "1h",
        });
        return res.status(200).send({
          success: true,
          message: "User Logged In",
          token: token,
          user: {
            email: userFind.email,
            name: userFind.name,
          },
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Password doesn't matched",
        });
      }
    } else {
      return res
        .status(404)
        .send({ success: false, message: "User not Found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something Went Wrong" });
  }
});
module.exports = router;
