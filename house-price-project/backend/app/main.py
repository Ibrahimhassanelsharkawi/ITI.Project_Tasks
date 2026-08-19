from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PredictionRequest, PredictionResponse
import joblib
import pandas as pd
from pathlib import Path


app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained model
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "house_price.pkl"

model = joblib.load(MODEL_PATH)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict(data: PredictionRequest):

    input_data = pd.DataFrame([{
        "carpet_area_sqft": data.carpet_area_sqft,
        "floor_num": data.floor_num,
        "bathroom": data.bathroom,
        "balcony": data.balcony,
        "location_grouped": data.location_grouped,
        "Furnishing": data.Furnishing,
        "Transaction": data.Transaction,
        "Ownership": data.Ownership,
        "facing": data.facing
    }])

    prediction = model.predict(input_data)[0]

    return {
        "predicted_price": float(prediction)
    }