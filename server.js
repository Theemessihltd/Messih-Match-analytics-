const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Messih Match Analytics API is running",
    status: "success"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Messih Match Analytics API"
  });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
