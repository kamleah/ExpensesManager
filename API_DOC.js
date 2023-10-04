
// Login Api
// http://192.168.0.114:4000/auth/login
// {
//   "mobile_no": 9637199927,
//     "password": "screened",
// }


// Registration API

// http://192.168.0.114:4000/auth/register
// {
//   "mobile_no":9637199927,
//   "password":"screened"
// }

// Refresh Token
// http://192.168.0.114:4000/auth/refresh
// {
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhOGE2NjYzNmQ3MGE3MTNjYmRkZDkiLCJpYXQiOjE2OTYyNDQ2OTMsImV4cCI6MTcwMjI5MjY5M30.7B06353ew1mWCHYxDVnofc3ndkq5OkR0T9wNz1ZoWcM"
// }


// Add Expenses
// http://192.168.0.114:4000/expenses/add-expenses
// {
//   "spend_for":"Flower",
//   "spend_amount":120,
//   "user_id":"651a8994b7c9eb8d9b52331a"
// }

// Filter Expneses based on date and user
// http://192.168.0.114:4000/expenses/filter-expenses
// {
//   "user_id": "651a8994b7c9eb8d9b52331a",
//   "date":"2023-10-05"
// }

// Filter Expenses based on year and month
// http://192.168.0.114:4000/expenses/filter-expenses-by-month
// {
//   "user_id":"651a8994b7c9eb8d9b52331a",
//   "year":2023,
//   "month":10
// }

// Filter Expenses by date range
// http://192.168.0.114:4000/expenses/filter-expenses-by-date-range
// {
//   "user_id": "651a8994b7c9eb8d9b52331a",
//   "startDate":"2023-10-01",
//   "endDate":"2023-10-08"
// }