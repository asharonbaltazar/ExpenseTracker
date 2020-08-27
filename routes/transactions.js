const express = require("express");
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const { validationResult } = require("express-validator");
const router = express.Router();

// @desc    get all transactions
// @route   GET /transactions
// @access  private
router.get("/", auth, async (request, response) => {
  try {
    const transactions = await Transaction.find({ user: request.user.id }).sort(
      {
        date: -1,
      }
    );

    return response.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    add a transactions
// @route   POST /transactions
// @access  private
router.post("/", auth, async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const { text, amount } = request.body;

  try {
    const transaction = await Transaction.create({
      text,
      amount,
      user: request.user.id,
    });

    return response.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );

      response.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log(error);
      return response.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
});

// @desc    update a transaction
// @route   POST /transactions/:id
// @access  private
router.put("/:id", auth, async (request, response) => {
  try {
    const incomingData = {
      text: request.body.text,
      amount: request.body.amount,
    };
    // Find the requested transaction
    const transaction = await Transaction.findById({
      _id: request.params.id,
    });

    // If transaction's not found, then respond:
    if (!transaction) {
      return response.status(404).json({
        success: false,
        error: "No transaction found.",
      });
    }

    // Ensure user owns transaction
    if (transaction.user.toString() !== request.user.id) {
      return response.status(401).json({ msg: "Not authorized." });
    }

    await Transaction.findByIdAndUpdate(
      request.params.id,
      {
        $set: incomingData,
      },
      { new: true }
    );

    return response.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @desc    delete a transaction
// @route   DELETE /transactions/:id
// @access  private
router.delete("/:id", auth, async (request, response) => {
  try {
    const transaction = await Transaction.findById(request.params.id);

    if (!transaction) {
      return response.status(404).json({
        success: false,
        error: "No transaction found.",
      });
    }

    await transaction.remove();

    return response.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;
