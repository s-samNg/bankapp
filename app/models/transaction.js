const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankAccount",
    required: [true, 'The account field is required.'],
  },
  label: {
    type: String,
    minlength: [2, "The label must be at least 2 characters long."],
    maxlength: [50, "The label cannot exceed 50 characters."],
    required: [true, 'The label field is required.'],
  },
  action: {
    type: String,
    enum: {
      values: ["credit", "debit"],
      message: 'Invalid value for action. Must be either "credit" or "debit".',
    },
    required: [true, 'The action field is required.'],
  },
  amount: {
    type: Number,
    required: [true, 'The amount field is required.'],
  },
  paymentDate: {
    type: Date,
    required: [true, 'The paymentDate field is required.'],
  },
  paymentMethod: {
    type: String,
    enum: {
      values: [
        "Cheque",
        "Withdrawal",
        "Credit Card",
        "Debit Card",
        "Bank Transfer",
        "Cash",
      ],
      message: "Invalid value for payment method.",
    },
    required: [true, 'The paymentMethod field is required.'],
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, 'The category field is required.'],
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
