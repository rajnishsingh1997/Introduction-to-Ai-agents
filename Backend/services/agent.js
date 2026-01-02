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

  try {
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
      if (!parsedResponse.finalAnswer) {
        throw new Error("Final Answer is missing");
      }
      return parsedResponse.finalAnswer;
    }

    if (!parsedResponse.action || typeof parsedResponse.action !== "object") {
      throw new Error("Invalid action structure in LLM response");
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
    let finalCompletion;
    try {
      finalCompletion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
      });
    } catch (error) {
      console.log(error.message);
    }

    const finalResponseContent = finalCompletion.choices[0].message.content;

    let finalParsedResponse;
    try {
      finalParsedResponse = JSON.parse(finalResponseContent);
    } catch (error) {
      throw new Error("Final LLM response is not valid JSON");
    }
    return finalParsedResponse.finalAnswer;
  } catch (error) {
    console.log(error.message);
  }
};

export default weatherAgent;
