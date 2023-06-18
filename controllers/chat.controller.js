import axios from "axios";

export const chatCompletion = async (req, res) => {
  try {
    const { prompt } = req.body;

    const answer = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-16k-0613",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const text = answer.data.choices[0].message.content;

    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const chatCreateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const answer = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const image = answer.data.data[0].url;

    res.status(200).json({ image });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
