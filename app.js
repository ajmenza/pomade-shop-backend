require("dotenv").config();
const express = require("express");
const app = express();

const morgan = require("morgan");

// database
const connectDB = require("./db/connect");

app.use(morgan('tiny'));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

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
