require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const morgan = require("morgan");

// For image uploads
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// database
const connectDB = require("./db/connect");

// routers
const productRouter = require("./routes/productRoutes");

// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan('tiny'));
app.use(express.json());

// parameters are to set up cloudinary, will create tmp folder and store files there on the server
app.use(fileUpload({ useTempFiles: true }));


// Router Middleware
app.use("/api/v1/products", productRouter);

// 404 error is not an actual error in express so is handled differently. Needs to be placed before errorHandler because errorHandler is only invoked if you actually hit an existing route and there is an error
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
