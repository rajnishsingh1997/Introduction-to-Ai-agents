import weatherAgent from "../services/agent.js";

const chatController = (req, res, next) => {
  const { message } = req.body;
  const response = weatherAgent("hello");
 
  res.status(200).json({
    success: true,
    message: response,
  });
};

export default chatController;
