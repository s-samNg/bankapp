const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../helpers/crypto.js");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    user.email = await decrypt(user.email);

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while creating user.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const emailEncrypted = await encrypt(req.body.email);
    const user = await User.findOne({ email: emailEncrypted });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = await jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: Number(process.env.JWTExpiration),
      });

      user.email = await decrypt(user.email);

      res.status(200).json({
        accessToken: token,
        user: user,
      });
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    // logger.error(err)
    res.status(500).json({
      error:
        err.message ||
        `Some error occurred while retrieving user with email "${req.body.email}"`,
    });
  }
};
