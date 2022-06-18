require("dotenv").config();

// async errors
require('express-async-errors');

const express = require("express");
const app = express();

const connectDB = require("./db/connect")

const productsRouter = require("./routes/products")

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware =  require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) =>{
    res.send("<h1>Store API</h1> <a href='/api/v1/products'>Products</a>")
})

app.use("/api/v1/products", productsRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI, console.log(" ::Database connection Successfull ::"))
        app.listen(port, console.log(` ::: server listen  to port ${port} ::: `))
    } catch (error) {
        console.log(error.message)
    }
}

start();