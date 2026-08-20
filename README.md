# 🏠 House Price Prediction

A Machine Learning project for predicting house prices using a Random Forest Regression model, with a React frontend and FastAPI REST API deployed on Vercel.

---

## 📌 Project Overview

This project predicts house prices based on several property features such as:

- Carpet Area
- Floor Number
- Number of Bathrooms
- Number of Balconies
- Location
- Furnishing Status
- Transaction Type
- Ownership
- Facing

The trained machine learning model is exposed through a FastAPI REST API, while a React frontend provides an interactive interface for users to enter property details and get price predictions.

---

## 🎨 Frontend

The project includes a React frontend that provides a simple interface for entering house property details and getting a predicted house price.

### 🌐 Live Demo

**House Price Predictor:**
https://iti-project-tasks-front-end.vercel.app/

### ✨ Features

- Enter property details through an interactive form.
- Select the property location from the available locations.
- Select furnishing, transaction type, ownership, and facing.
- Send the entered data to the FastAPI backend.
- Display the predicted house price directly in the interface.
- Reset the form and enter new property details.

### 🔗 Frontend → Backend

The frontend communicates with the deployed FastAPI backend through the `/predict` endpoint.

**Backend API:**
https://iti-project-tasks.vercel.app/

**Swagger Documentation:**
https://iti-project-tasks.vercel.app/docs

### 🔄 User Flow

User enters property details

↓

React Frontend

↓

FastAPI Backend

↓

Random Forest Model

↓

Predicted House Price

↓

Result displayed in the Frontend

---

## 🤖 Machine Learning

Two regression models were evaluated:

1. Linear Regression
2. Random Forest Regressor

### Model Performance

| Model             |       MAE |      RMSE |    R² |
| ----------------- | --------: | --------: | ----: |
| Linear Regression | 4,499,950 | 7,724,447 | 0.641 |
| Random Forest     | 1,234,836 | 4,855,832 | 0.858 |

Random Forest achieved the best performance.

### Final Model

To make the model suitable for serverless deployment, a smaller Random Forest model was used with:

- `n_estimators = 20`
- `max_depth = 15`
- `min_samples_leaf = 2`
- `random_state = 42`

The optimized model size is approximately **5.47 MB**, compared with approximately **334 MB** for the original model.

---

## 🧠 Features

### Numerical Features

- `carpet_area_sqft`
- `floor_num`
- `bathroom`
- `balcony`

### Categorical Features

- `location_grouped`
- `Furnishing`
- `Transaction`
- `Ownership`
- `facing`

Categorical features are encoded using:

`OneHotEncoder(handle_unknown="ignore")`

---

## 🛠️ Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- React
- Vite
- FastAPI
- Uvicorn
- Hugging Face
- Vercel

---

## 📁 Project Structure

```text
ITI.Project_Tasks/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── locations.json
│   │
│   ├── package.json
│   └── .env
│
├── notebooks/
│   └── data/
│       ├── house_price_model.ipynb
│       └── locations.json
│
├── Kaggle certificates/
│
├── README.md
│
└── ...
```

---

## 🚀 API Deployment

The API is deployed using Vercel.

### API URL

https://iti-project-tasks.vercel.app/

### Swagger Documentation

https://iti-project-tasks.vercel.app/docs

---

## ❤️ Health Check

### Endpoint

`GET /health`

### Response

```json
{
  "status": "ok"
}
```

---

## 🔮 Prediction

### Endpoint

`POST /predict`

### Request

```json
{
  "carpet_area_sqft": 1,
  "floor_num": 0,
  "bathroom": 1,
  "balcony": 0,
  "location_grouped": "string",
  "Furnishing": "string",
  "Transaction": "string",
  "Ownership": "string",
  "facing": "string"
}
```

### Response

```json
{
  "predicted_price": 2202089.653118587
}
```

---

## ☁️ Model Hosting

The trained model is hosted on Hugging Face and downloaded by the API when required.

The model is loaded using Joblib and used for prediction.

---

## 🔄 Deployment Flow

```text
User
  ↓
React Frontend
  ↓
Vercel
  ↓
FastAPI Backend
  ↓
Vercel Serverless Function
  ↓
Load ML Model from Hugging Face
  ↓
Random Forest Pipeline
  ↓
Predicted House Price
  ↓
JSON Response
  ↓
Frontend Result
```

---

## 📊 Evaluation

The models were evaluated using:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score

Random Forest performed significantly better than Linear Regression on the test dataset.

---

## 👨‍💻 Author

**Ibrahim Hassan El-sharkawi**
