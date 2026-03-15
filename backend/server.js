const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Task Manager API running");
});

app.get("/test", (req, res) => {
  res.send({ message: "API working" });
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();