import weatherAgent from "../services/agent.js";

const chatController = async (req, res, next) => {
  const { message } = req.body;
  const responseFromAgent = await weatherAgent(message);

 
};

export default chatController;
