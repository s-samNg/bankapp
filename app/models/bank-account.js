const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user field is required."],
  },
  bankName: {
    type: String,
    required: [true, "The bankName field is required."],
  },
  customName: {
    type: String,
    maxlength: [50, "The custom name can't exceed 50 characters, got {VALUE}."],
    required: [true, "The customName field is required."],
  },
  lastUpdated: {
    type: Date,
  },
});

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
