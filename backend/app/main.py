import os
import urllib.request

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PredictionRequest, PredictionResponse
import joblib
import pandas as pd


app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL_PATH = "/tmp/house_price.pkl"

if not os.path.exists(MODEL_PATH):
    model_url = (
        "https://huggingface.co/"
        "IbrahimHassan2oo5/house-price-model/"
        "resolve/main/house_price.pkl"
    )

    urllib.request.urlretrieve(model_url, MODEL_PATH)

model = joblib.load(MODEL_PATH)


# =========================
# Health Check
# =========================

@app.get("/health")
def health():
    return {
        "status": "ok"
    }


# =========================
# Prediction
# =========================

@app.post(
    "/predict",
    response_model=PredictionResponse
)
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