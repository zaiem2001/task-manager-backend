const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connect");
const { PORT } = require("./environment");
const { notFound, errorMiddleware, authMiddleWare } = require("./middlewares");
const { listRouter, userRouter, taskRouter } = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/list", authMiddleWare, listRouter);
app.use("/api/tasks", authMiddleWare, taskRouter);

// Middlewares
app.use(notFound);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on PORT -> ", PORT);
});
