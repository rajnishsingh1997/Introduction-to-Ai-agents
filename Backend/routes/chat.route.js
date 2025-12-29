import express from "express";
import userInputValidator from "../middleware/validator.js";
import chatController from "../controller/chat.controller.js";
const chatRouter = express.Router();

chatRouter.post("/ask", userInputValidator,chatController);

export default chatRouter;
