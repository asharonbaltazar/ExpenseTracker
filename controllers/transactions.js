const Transaction = require("../models/Transaction");

// @desc    get all transactions
// @route   GET /transactions
// @access  public
exports.getTransactions = async (request, response, next) => {
  try {
    const transactions = await Transaction.find();

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
};

// @desc    add a transactions
// @route   POST /transactions
// @access  public
exports.addTransaction = async (request, response, next) => {
  try {
    const transaction = await Transaction.create(request.body);

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
};

// @desc    delete a transaction
// @route   DELETE /transactions/:id
// @access  public
exports.deleteTransaction = async (request, response, next) => {
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
};
