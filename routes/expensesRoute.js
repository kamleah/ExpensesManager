const verifyBearerToken = require('../middleware/authMiddleware');
const router = require("express").Router();
const expensesController = require("../controllers/expensesController");

router.get("/welcome", verifyBearerToken, expensesController.welcome);
router.post("/add-expenses", verifyBearerToken, expensesController.addExpense);
router.post("/filter-expenses", verifyBearerToken, expensesController.getExpensesByDate);
router.post("/filter-expenses-by-month", verifyBearerToken, expensesController.getExpensesByMonth);
router.post("/filter-expenses-by-date-range", verifyBearerToken, expensesController.getExpnsesBeetweenDateRange);

module.exports = router;