const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
  spend_for: {
    type: String,
    required: true,
  },
  spend_amount: {
    type: Number,
    required: true,
  },
  date_time: {
    type: Date,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true,
  },
});

module.exports = mongoose.model('Expenses', ExpensesSchema);