

import express from "express";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.route.js";


dotenv.config();

const app = express();
const portNumber = process.env.PORT;
app.use(express.json());

app.use("/api/v1", chatRouter);

app.listen(portNumber, () => {
  console.log(`server running on ${portNumber}`);
});
