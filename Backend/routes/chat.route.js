import express from 'express';



const chatRouter = express.Router();

chatRouter.post("/ask", (req, res) => {
  res.send("POST route working");
});

export default chatRouter;
