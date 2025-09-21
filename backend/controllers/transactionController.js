const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
};

exports.addTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.status(201).json(newTransaction);
};

exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transaction deleted' });
};
