from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    carpet_area_sqft: float = Field(gt=0)
    floor_num: int = Field(ge=0)
    bathroom: int = Field(ge=1)
    balcony: int = Field(ge=0)

    location_grouped: str = Field(min_length=1)
    Furnishing: str = Field(min_length=1)
    Transaction: str = Field(min_length=1)
    Ownership: str = Field(min_length=1)
    facing: str = Field(min_length=1)


class PredictionResponse(BaseModel):
    predicted_price: float