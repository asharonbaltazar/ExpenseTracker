const mongoose = require("mongoose");
const moment = require("moment");

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add a name."],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
