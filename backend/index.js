const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();
const { PythonShell } = require("python-shell");
const app = express();

const { connectDB } = require("./config/connectDB");

// middlewares
const logger = require("./middlewares/logger.js");
const { error } = require("./middlewares/error.js");

// mongodb connection
connectDB();

// Middleware to parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// Route handlers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes")


app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/report", reportRoutes);

app.post("/predict", (req, res) => {
  const data = req.body;

  //   Invoke the Python script
  PythonShell.run(
    "psychological_model.pkl",
    { args: JSON.stringify(data) },
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        const prediction = results[0];
        res.json({ prediction });
      }
    }
  );

  res.status(201).json(data);
});

// main route
app.get("/", function (req, res) {
  res.send("Server is running!");
});

// error middleware
app.use(error);

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
