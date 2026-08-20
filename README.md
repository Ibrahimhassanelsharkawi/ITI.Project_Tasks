###### \# 🏠 House Price Prediction API

###### 

###### A Machine Learning project for predicting house prices using a Random Forest Regression model, deployed as a REST API using FastAPI and Vercel.

###### 

###### \## 📌 Project Overview

###### 

###### This project predicts house prices based on several property features such as:

###### 

###### \- Carpet Area

###### \- Floor Number

###### \- Number of Bathrooms

###### \- Number of Balconies

###### \- Location

###### \- Furnishing Status

###### \- Transaction Type

###### \- Ownership

###### \- Facing

###### 

###### The trained machine learning model is exposed through a FastAPI REST API and deployed on Vercel.

###### 

###### \## 🤖 Machine Learning

###### 

###### Two regression models were evaluated:

###### 

###### 1\. Linear Regression

###### 2\. Random Forest Regressor

###### 

###### \### Model Performance

###### 

###### | Model | MAE | RMSE | R² |

###### |---|---:|---:|---:|

###### | Linear Regression | 4,499,950 | 7,724,447 | 0.641 |

###### | Random Forest | 1,234,836 | 4,855,832 | 0.858 |

###### 

###### Random Forest achieved the best performance.

###### 

###### \### Final Model

###### 

###### To make the model suitable for serverless deployment, a smaller Random Forest model was used with:

###### 

###### \- `n\_estimators = 20`

###### \- `max\_depth = 15`

###### \- `min\_samples\_leaf = 2`

###### \- `random\_state = 42`

###### 

###### The optimized model size is approximately \*\*5.47 MB\*\*, compared with approximately \*\*334 MB\*\* for the original model.

###### 

###### \## 🧠 Features

###### 

###### \### Numerical Features

###### 

###### \- `carpet\_area\_sqft`

###### \- `floor\_num`

###### \- `bathroom`

###### \- `balcony`

###### 

###### \### Categorical Features

###### 

###### \- `location\_grouped`

###### \- `Furnishing`

###### \- `Transaction`

###### \- `Ownership`

###### \- `facing`

###### 

###### Categorical features are encoded using `OneHotEncoder(handle\_unknown="ignore")`.

###### 

###### \## 🛠️ Technologies

###### 

###### \- Python

###### \- Pandas

###### \- NumPy

###### \- Scikit-learn

###### \- Joblib

###### \- FastAPI

###### \- Uvicorn

###### \- Hugging Face

###### \- Vercel

###### 

###### \## 📁 Project Structure

###### 

###### ```text

###### house-price-project/

###### │

###### ├── backend/

###### │   ├── app/

###### │   │   ├── main.py

###### │   │   └── schemas.py

###### │   │

###### │   ├── requirements.txt

###### │   └── vercel.json

###### │

###### ├── README.md

###### └── ...



🚀 API Deployment



The API is deployed using Vercel.



API URL



https://iti-project-tasks.vercel.app



Swagger Documentation



https://iti-project-tasks.vercel.app/docs



❤️ Health Check



Endpoint:



&#x20;       GET /health



Response: 



&#x20;          {

&#x20;             "status": "ok"

&#x20;          }



🔮 Prediction



Endpoint:



&#x20;             POST /predict



Request:

&#x20;

&#x20;{

&#x20; "carpet\_area\_sqft": 1,

&#x20; "floor\_num": 0,

&#x20; "bathroom": 1,

&#x20; "balcony": 0,

&#x20; "location\_grouped": "string",

&#x20; "Furnishing": "string",

&#x20; "Transaction": "string",

&#x20; "Ownership": "string",

&#x20; "facing": "string"

}



Response: 

&#x20;

{

&#x20; "predicted\_price": 2202089.653118587

}



☁️ Model Hosting



The trained model is hosted on Hugging Face and downloaded by the API when required.



The model is loaded using Joblib and used for prediction



🔄 Deployment Flow:



User Request

&#x20;    ↓

FastAPI

&#x20;    ↓

Vercel Serverless Function

&#x20;    ↓

Download / Load ML Model

&#x20;    ↓

Random Forest Pipeline

&#x20;    ↓

Predicted House Price

&#x20;    ↓

JSON Response





📊 Evaluation 



The models were evaluated using:



Mean Absolute Error (MAE)

Root Mean Squared Error (RMSE)

R² Score



Random Forest performed significantly better than Linear Regression on the test dataset



👨‍💻 Author 



&#x20; Ibrahim Hassan El-sharkawi

