import os

# Vercel filesystem is read-only except /tmp
os.environ["HOME"] = "/tmp"
os.environ["HF_HOME"] = "/tmp/huggingface"
os.environ["HF_HUB_CACHE"] = "/tmp/huggingface/hub"
os.environ["HF_XET_CACHE"] = "/tmp/huggingface/xet"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PredictionRequest, PredictionResponse
from huggingface_hub import hf_hub_download
import joblib
import pandas as pd

app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Download trained model from Hugging Face
# =========================

MODEL_PATH = hf_hub_download(
    repo_id="IbrahimHassan2oo5/house-price-model",
    filename="house_price.pkl",
    cache_dir="/tmp/huggingface"
)

# Load trained model
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