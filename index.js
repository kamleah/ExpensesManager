// const express = require("express");
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();

// dotenv.config();

// mongoose.connect(
//     process.env.DB_CONNECT,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");
// });
// app.use(bodyParser.json());

// const authRouter = require("./routes/auth");
// const expensesRouter = require("./routes/expensesRoute");

// app.use("/auth", authRouter);
// app.use("/expenses", expensesRouter);

// const port = 4000;
// const host = '192.168.0.114';
// app.listen(port, host, () => {
//     console.log(`Server ready at http://${host}:${port}`);
// });

const express = require("express");
const app = express();
const port = 9000;

app.use("/", (eq, res)=>{
    res.json({"message":"Hello from express app."});
})

app.listen(9000, ()=>{
    console.log(`Starting Server on Port ${port}`);
})