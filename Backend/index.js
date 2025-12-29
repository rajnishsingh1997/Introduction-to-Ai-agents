import express from "express";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.route.js";
import globalErrorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const portNumber = process.env.PORT;
app.use(express.json());

app.use("/api/v1", chatRouter);
app.use(globalErrorHandler)

app.listen(portNumber, () => {
  console.log(`server running on ${portNumber}`);
});
