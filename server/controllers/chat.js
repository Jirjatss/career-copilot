import { generateAIResponse } from "../services/service.js";

export const chatHandler = async (req, res) => {
  try {
    const { message, mode } = req.body;
    const file = req.file;

    const reply = await generateAIResponse({
      message,
      mode,
      file,
    });

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
};
