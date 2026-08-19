from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict():
    payload = {
        "carpet_area_sqft": 1000,
        "floor_num": 3,
        "bathroom": 2,
        "balcony": 1,
        "location_grouped": "Other",
        "Furnishing": "Semi-Furnished",
        "Transaction": "New_Property",
        "Ownership": "Freehold",
        "facing": "North"
    }

    response = client.post("/predict", json=payload)

    assert response.status_code == 200
    assert "predicted_price" in response.json()
    assert isinstance(response.json()["predicted_price"], float)