import OpenAI from "openai";
import systemPrompt from "../utils/systemPrompt.js";
import getAqiDetails from "../tool/getAqiDetails.js";
import getWeatherDetails from "../tool/getWeatherTool.js";

const client = new OpenAI();

const toolMap = {
  getWeatherDetails,
  getAqiDetails,
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

  let LLMResponseContent = completion.choices[0].message.content;


  return completion.choices[0].message;
};

export default weatherAgent;
