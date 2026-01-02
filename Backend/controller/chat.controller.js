import weatherAgent from "../services/agent.js";
let history = [];
const chatController = async (req, res, next) => {
  const { message } = req.body;
  const responseFromAgent = await weatherAgent(message, history);
  history.push({ role: "user", content: message });
  history.push({ role: "assistant", content: responseFromAgent });
  res.json(responseFromAgent);
};

export default chatController;
