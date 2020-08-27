const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

// @desc    get all transactions
// @route   GET /transactions
// @access  public
(exports.getTransactions = auth),
  async (request, response, next) => {
    try {
      const transactions = await Transaction.find({
        user: request.user.id,
      });

      console.log(transactions);

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
(exports.addTransaction = auth),
  async (request, response, next) => {
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

// @desc    update a transaction
// @route   POST /transactions/:id
// @access  public
(exports.updateTransaction = auth),
  async (request, response) => {
    try {
      const transaction = {
        text: request.body.text,
        amount: request.body.amount,
      };

      const updatedTransaction = await Transaction.updateOne(
        { _id: request.params.id },
        transaction
      );

      if (!updatedTransaction) {
        return response.status(404).json({
          success: false,
          error: "No transaction found.",
        });
      }

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

// @desc    delete a transaction
// @route   DELETE /transactions/:id
// @access  public
(exports.deleteTransaction = auth),
  async (request, response, next) => {
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
