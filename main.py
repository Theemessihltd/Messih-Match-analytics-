from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Messih Match Analytics AI", version="0.1.0")

class MatchFeatures(BaseModel):
    home_elo: float
    away_elo: float
    home_form: float
    away_form: float
    home_goals_avg: float
    away_goals_avg: float

@app.get("/health")
def health():
    return {"status": "ok", "service": "mma-ai", "model": "scaffold"}

@app.post("/predict")
def predict(features: MatchFeatures):
    # Placeholder only. Replace with a trained, back-tested model.
    strength = (features.home_elo - features.away_elo) / 400
    home = min(max(0.50 + strength * 0.10, 0.05), 0.90)
    draw = 0.25
    away = max(1 - home - draw, 0.05)
    total = home + draw + away
    return {
        "home_win": round(home / total, 4),
        "draw": round(draw / total, 4),
        "away_win": round(away / total, 4),
        "model_status": "demo_scaffold"
    }