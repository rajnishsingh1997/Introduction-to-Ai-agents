import OpenAI from "openai";
import systemPrompt from "../utils/systemPrompt.js";
import getAqiDetails from "../tool/getAqiDetails.js";
import getWeatherDetails from "../tool/getWeatherTool.js";

const client = new OpenAI();

const toolMap = {
  getWeatherDetails,
  getAQIDetails,
};

const weatherAgent = async (userMessage) => {
  const message = [
    {
      role: "system",
      content: systemPrompt,
    },
  ];
  if (userMessage) {
    message.push({
      role: "user",
      content: userMessage,
    });
  }
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: message,
  });

  console.log(completion.choices);
  console.log("running inside agent");
};

export default weatherAgent;
