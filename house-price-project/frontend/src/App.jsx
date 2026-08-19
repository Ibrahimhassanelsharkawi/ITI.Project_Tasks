import { useState } from "react";
import "./App.css";
import locations from "./locations.json";

function App() {
  const [formData, setFormData] = useState({
    carpet_area_sqft: "",
    floor_num: "",
    bathroom: "",
    balcony: "",
    location_grouped: "",
    Furnishing: "",
    Transaction: "",
    Ownership: "",
    facing: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError("");
    setError("");
  };

  const handleReset = () => {
    setFormData({
      carpet_area_sqft: "",
      floor_num: "",
      bathroom: "",
      balcony: "",
      location_grouped: "",
      Furnishing: "",
      Transaction: "",
      Ownership: "",
      facing: "",
    });

    setPrediction(null);
    setError("");
    setValidationError("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationError("");
    setError("");
    setPrediction(null);

    const requiredFields = [
      formData.carpet_area_sqft,
      formData.floor_num,
      formData.bathroom,
      formData.balcony,
      formData.location_grouped,
      formData.Furnishing,
      formData.Transaction,
      formData.Ownership,
      formData.facing,
    ];

    if (requiredFields.some((field) => field === "")) {
      setValidationError("Please fill in all fields before predicting.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carpet_area_sqft: Number(formData.carpet_area_sqft),
          floor_num: Number(formData.floor_num),
          bathroom: Number(formData.bathroom),
          balcony: Number(formData.balcony),
          location_grouped: formData.location_grouped,
          Furnishing: formData.Furnishing,
          Transaction: formData.Transaction,
          Ownership: formData.Ownership,
          facing: formData.facing,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Unable to predict the house price.");
      }

      setPrediction(data.predicted_price);
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>House Price Predictor</h1>

        <p className="subtitle">
          Enter the property details to estimate its price
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Carpet Area (sqft)</label>
              <input
                type="number"
                name="carpet_area_sqft"
                value={formData.carpet_area_sqft}
                onChange={handleChange}
                placeholder="e.g. 500"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Floor Number</label>
              <input
                type="number"
                name="floor_num"
                value={formData.floor_num}
                onChange={handleChange}
                placeholder="e.g. 10"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Bathroom</label>
              <input
                type="number"
                name="bathroom"
                value={formData.bathroom}
                onChange={handleChange}
                placeholder="e.g. 2"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Balcony</label>
              <input
                type="number"
                name="balcony"
                value={formData.balcony}
                onChange={handleChange}
                placeholder="e.g. 1"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <select
                name="location_grouped"
                value={formData.location_grouped}
                onChange={handleChange}
              >
                <option value="">Select Location</option>

                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Furnishing</label>
              <select
                name="Furnishing"
                value={formData.Furnishing}
                onChange={handleChange}
              >
                <option value="">Select Furnishing</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="form-group">
              <label>Transaction</label>
              <select
                name="Transaction"
                value={formData.Transaction}
                onChange={handleChange}
              >
                <option value="">Select Transaction</option>
                <option value="Resale">Resale</option>
                <option value="New Property">New Property</option>
                <option value="Other">Other</option>
                <option value="Rent/Lease">Rent/Lease</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ownership</label>
              <select
                name="Ownership"
                value={formData.Ownership}
                onChange={handleChange}
              >
                <option value="">Select Ownership</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="Co-operative Society">
                  Co-operative Society
                </option>
                <option value="Power Of Attorney">Power Of Attorney</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="form-group">
              <label>Facing</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
              >
                <option value="">Select Facing</option>
                <option value="East">East</option>
                <option value="North - East">North - East</option>
                <option value="North">North</option>
                <option value="West">West</option>
                <option value="South">South</option>
                <option value="North - West">North - West</option>
                <option value="South - East">South - East</option>
                <option value="South -West">South -West</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Price"}
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
            disabled={loading}
          >
            Reset Form
          </button>

          {validationError && (
            <div className="validation-error">{validationError}</div>
          )}

          {error && <div className="error-message">{error}</div>}

          {prediction !== null && (
            <div className="prediction-result">
              <p>Estimated House Price</p>
              <h2>₹{prediction.toLocaleString("en-IN")}</h2>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
