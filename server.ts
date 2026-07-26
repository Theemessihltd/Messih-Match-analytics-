import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok", service: "mma-api", version: "0.1.0" }));

app.get("/api/predictions", (_req, res) => {
  res.json({
    generatedAt: new Date().toISOString(),
    model: "MMA-AI-v0.1",
    predictions: [
      { home: "Manchester City", away: "Arsenal", homeWin: 56, draw: 24, awayWin: 20, predictedScore: "2-1", confidence: 82 }
    ]
  });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`MMA API listening on ${port}`));