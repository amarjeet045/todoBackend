const Profiles = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const userFind = await Profiles.find({ email: req.body.email });
    
    if (userFind.length === 0) {
      const encryptPassword = await bcrypt.hash(req.body.password, 10);

      const user = new Profiles({
        name: req.body.name,
        email: req.body.email,
        password: encryptPassword,
      });
      await user.save();
      const token = jwt.sign({ email: req.body.email }, "verySecretValue", {
        expiresIn: "1h",
      });

      return res.status(200).send({
        message: "User is added successfully",
        success: true,
        token: token,
      });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something Went Wrong" });
  }
};

module.exports = { register };
