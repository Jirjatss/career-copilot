import { GoogleGenAI } from "@google/genai";
import prompts from "../prompts/index.js";
import "dotenv/config";

const fileToBase64 = (file) => {
  return file.buffer.toString("base64");
};

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

export const generateAIResponse = async ({
  message,
  mode = "career",
  file,
}) => {
  const contents = [];

  // system instruction
  contents.push({
    text: prompts[mode] || prompts.career,
  });

  // user message
  if (message) {
    contents.push({ text: message });
  }

  // file optional
  if (file) {
    const base64 = fileToBase64(file);
    contents.push({
      inlineData: {
        data: base64,
        mimeType: file.mimetype,
      },
    });
  }

  const res = await ai.models.generateContent({
    model,
    contents,
  });

  return res.text;
};
