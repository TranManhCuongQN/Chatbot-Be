import { Configuration, OpenAIApi } from "openai";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req, res) => {
  try {
    const { prompt } = req.body;

    const answer = await openai.createCompletion({
      model: "gpt-3.5-turbo-16k-0613",
      prompt,
      temperature: 0,
      maxTokens: 3000,
    });

    const text = answer.data.choices[0].text;

    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
