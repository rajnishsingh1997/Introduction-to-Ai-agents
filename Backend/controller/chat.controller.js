import weatherAgent from "../services/agent.js";

const chatController = async (req, res, next) => {
  const { message } = req.body;
  const responseFromAgent = await weatherAgent(message);
  res.json(responseFromAgent);
};

export default chatController;
