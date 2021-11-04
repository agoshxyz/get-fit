const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //Cors will allow us do requests from different devices without compromising  our requests
const app = express();
const UserController = require("./controllers/UserController");

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());
app.use(express.json()); //It returns the middleware that passed JSON as a response, It kinda help us to have a JSON response

app.get("/", (req, res) => {
  res.send("Hello from Nodejs NodeMon");
});

app.post("/register", UserController.store);

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected successfully");
} catch (error) {}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
