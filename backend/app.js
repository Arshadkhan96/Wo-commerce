const express = require('express');
// const errorMiddleware=require('./Middleware/error')
const app = express();
app.use(express.json())


const product = require("./routes/productRoute")
const user=require("./routes/userRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);
// console.log(google)

//errorMiddleware
// app.use(errorMiddleware)



//uncaught error
//exceptional error

module.exports = app;