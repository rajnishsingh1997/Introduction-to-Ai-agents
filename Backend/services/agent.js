import OpenAI from "openai";
import systemPrompt from "../utils/systemPrompt.js";
import getAqiDetails from "../tool/getAqiDetails.js";
import getWeatherDetails from "../tool/getWeatherTool.js";

const client = new OpenAI();

const toolMap = {
  getWeatherDetails,
  getAqiDetails,
};

const weatherAgent = async (userMessage, history) => {
  console.log(history);
  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...history,
    {
      role: "user",
      content: userMessage,
    },
  ];

  const firstCompletion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  const firstResponseContent = firstCompletion.choices[0].message.content;
  console.log("firstResponseContent", firstResponseContent);

  let parsedResponse;
  try {
    parsedResponse = JSON.parse(firstResponseContent);
  } catch (error) {
    return firstResponseContent;
  }

  if (parsedResponse.action === null) {
    return parsedResponse.finalAnswer;
  }

  const toolName = parsedResponse.action.tool;
  const toolInput = parsedResponse.action.input;

  if (!toolMap[toolName]) {
    throw new Error(`Tool "${toolName}" is not allowed`);
  }

  const observation = await toolMap[toolName](toolInput.city);

  messages.push({
    role: "assistant",
    content: firstResponseContent,
  });
  messages.push({
    role: "system",
    content: `Observation:\n${JSON.stringify(observation)}`,
  });

  const finalCompletion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  const finalResponseContent = finalCompletion.choices[0].message.content;

  let finalParsedResponse;
  try {
    finalParsedResponse = JSON.parse(finalResponseContent);
  } catch (error) {
    throw new Error("Final LLM response is not valid JSON");
  }
  return finalParsedResponse.finalAnswer;
};

export default weatherAgent;
