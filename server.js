const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connect");
const { PORT } = require("./environment");
const { notFound, errorMiddleware } = require("./middlewares");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
// app.use("/api/users");

// Middlewares
app.use(notFound);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on PORT -> ", PORT);
});
