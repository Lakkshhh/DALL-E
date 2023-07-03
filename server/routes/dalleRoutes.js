import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const airesponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = airesponse.data?.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;