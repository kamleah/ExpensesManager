const Expense = require('../models/Expenses.js');
const mongoose = require('mongoose');

const welcome = async (req, res) => {
    try {
        res.json({ "users": "succeess" });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.json({ "users": "succeess" });
    }
};

const addExpense = async (req, res) => {
    try {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const newExpense = new Expense({
            spend_for: req.body.spend_for,
            spend_amount: req.body.spend_amount,
            date_time: currentDate,
            user_id: req.body.user_id,
        });
        await newExpense.save();
        res.status(201).json({ status: "success", message: "Expense added successfully" });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ status: "failed", error: "An error occurred while adding the expense" });
    }
};

const getExpensesByDate = async (req, res) => {
    const user_id = req.body.user_id;
    const date = new Date(req.body.date);

    const query = {
        $and: [
            { user_id: user_id },
            { date_time: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) } },
        ],
    };

    Expense.find(query)
        .then((expenses) => {
            const totalSpendAmount = expenses.reduce((total, expense) => {
                return total + expense.spend_amount;
            }, 0);
            res.json({ status: "success", expenses: expenses, totalSpendAmount: totalSpendAmount });
        })
        .catch((error) => {
            res.status(500).json({ status: "failed", error: 'An error occurred while querying expenses' });
        });
};

const getExpensesByMonth = async (req, res) => {
    const user_id = req.body.user_id;
    const filterYear = req.body.year;
    const filterMonth = req.body.month;
  
    const pipeline = [
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(user_id),
          date_time: {
            $gte: new Date(filterYear, filterMonth - 1, 1),
            $lt: new Date(filterYear, filterMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date_time' },
            month: { $month: '$date_time' },
          },
          totalAmount: { $sum: '$spend_amount' },
          expenses: {
            $push: {
              spend_for: '$spend_for',
              spend_amount: '$spend_amount',
              date_time: '$date_time',
            },
          },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
      {
        $unwind: '$expenses',
      },
      {
        $sort: {
          'expenses.date_time': 1,
        },
      },
      {
        $group: {
          _id: {
            year: '$_id.year',
            month: '$_id.month',
          },
          totalAmount: { $first: '$totalAmount' },
          expenses: { $push: '$expenses' },
        },
      },
    ];
  
    Expense.aggregate(pipeline)
      .then((result) => {
        const payload = {
          expenses: result,
        };
        res.json({ status: "success", expenses: payload });
      })
      .catch((error) => {
        res.status(500).json({ status: "failed", error: 'An error occurred while aggregating expenses by month' });
      });
  };
  

const getExpnsesBeetweenDateRange = async (req, res) => {
    const user_id = req.body.user_id;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const query = {
        $and: [
            { user_id: user_id },
            { date_time: { $gte: startDate, $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000), $lte: endDate, $lt: new Date(endDate.getTime() + 24 * 60 * 60 * 1000) } },
        ],
    };
    Expense.find(query)
        .sort({ date_time: 1 })
        .then((expenses) => {
            const totalSpendAmount = expenses.reduce((total, expense) => {
                return total + expense.spend_amount;
            }, 0);
            res.json({ status: "success", expenses: expenses, totalSpendAmount: totalSpendAmount });
        })
        .catch((error) => {
            res.json({ status: "failed", error: error });
        });
};

module.exports = {
    welcome,
    addExpense,
    getExpensesByDate,
    getExpensesByMonth,
    getExpnsesBeetweenDateRange
};