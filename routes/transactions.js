const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactions");

router.route("/").get(getTransactions);

router.route("/").post(addTransaction);

router.route("/:id").put(updateTransaction);

router.route("/:id").delete(deleteTransaction);

module.exports = router;
