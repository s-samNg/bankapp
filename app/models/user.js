const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required."],
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: "Please filled a valid e-mail address",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],
    validate: {
      validator: function (value) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
          value
        );
      },
      message:
        "The password must contain at least 8 characters, including at least 1 number and 1 special character.",
    },
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
