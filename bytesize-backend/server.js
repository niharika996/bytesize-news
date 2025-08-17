import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true })); // later restrict to your GitHub Pages URL

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

// Health check
app.get("/", (req, res) => {
  res.send("ByteSize backend is alive 🚀");
});

// News endpoint
app.get("/news", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Summarize endpoint
app.post("/summarize", async (req, res) => {
  try {
    const articleText = req.body.text || "";
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: articleText }),
      }
    );
    const data = await response.json();

    const summary =
      Array.isArray(data) && data[0]?.summary_text
        ? data[0].summary_text
        : "No summary available.";

    res.json({ summary_text: summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
