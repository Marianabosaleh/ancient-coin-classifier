import { useState } from "react";
import axios from "axios";
import "./style.css";
import { ImageGallery } from "./ImageGallery";
import React from "react";

interface Prediction {
  emperor: string;
  confidence: number;
  color: string;
}

const API_URL =
  "https://coin-classifier-backend-130485216686.us-central1.run.app"; // ✅ Update API URL

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    // Show image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle image upload & classification
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("⚠️ Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setError("");
      setPredictions([]); // Clear previous results

      console.log("📡 Sending request to API...");

      const response = await axios.post<{ predictions: Prediction[] }>(
        "https://coin-classifier-backend-130485216686.us-central1.run.app/predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ API Response:", response.data);

      // Check if there is a prediction with confidence ≥ 90%
      const highConfidencePrediction = response.data.predictions.find(
        (pred) => pred.confidence >= 90
      );

      // If a high-confidence prediction exists, only show that one
      if (highConfidencePrediction) {
        setPredictions([highConfidencePrediction]);
      } else {
        setPredictions(response.data.predictions);
      }
    } catch (err) {
      console.error("❌ Error uploading:", err);
      setError("❌ Failed to classify the coin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      {/* 🔹 Modern Project Banner */}
      <div className="project-banner">
        <h1 className="project-title">Roman Emperos coins Classifier</h1>
        <img
          src="/images/pic1.jpeg"
          alt="Ancient Coins"
          className="banner-image"
        />
      </div>

      <div className="upload-box">
        {/* Image Preview */}
        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}

        {/* File Upload Input */}
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          id="upload"
          hidden
        />
         {selectedFile && (
          <p className="selected-file">Selected: {selectedFile.name}</p>
        )}
        <label htmlFor="upload" className="file-label">
          {selectedFile ? "Change Image" : "Select Image"}
        </label>
       

        {/* Upload & Classify Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="upload-button"
        >
          {loading ? "Classifying..." : "Classify"}
        </button>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Classification Results */}
        {predictions.length > 0 && (
          <div className="predictions-container">
            {predictions.map((pred, index) => (
              <div
                key={index}
                className="prediction-box"
                style={{
                  borderColor: pred.color,
                  borderWidth: "3px",
                  borderStyle: "solid",
                  padding: "10px",
                  margin: "5px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <strong>{pred.emperor}</strong> <br />
                Confidence: {pred.confidence}%
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coin Image Gallery */}
      <ImageGallery />

      {/* 🔹 Enhanced Project Information Section */}
      <div className="project-info">
        <h2>About the Project</h2>
        <p>
          This project is an advanced Roman Coin Classification System that
          identifies Roman emperors based on coin images. Using deep learning,
          the model can analyze historical coins and determine which emperor
          issued them. It provides a confidence score to indicate how certain it
          is about each classification.
        </p>

        <h2>How It Works</h2>
        <p>
          Our model processes the engraved details, inscriptions, and artistic
          style of the coins to classify them into the correct emperor. It has
          been trained on thousands of images to distinguish between 52
          different emperors with high accuracy.
        </p>

        <img src="/images/rollers.jpeg" />

        <h2>Training Data</h2>
        <ul>
          <li>
            <strong>Number of emperors classified:</strong> 52
          </li>
          <li>
            <strong>Total number of images in dataset:</strong> 83,588
          </li>
          <li>
            <strong>Training & Testing Split:</strong> 70% training, 30% testing
          </li>
        </ul>

        <h2>Credits & Data Sources</h2>
<p>
  Our model was trained using the dataset that we built using publicly available datasets from reputable numismatic sources. 
  We acknowledge the following resources for their invaluable data:
</p>
<ul className="data-sources">
  <li>
    <a href="https://numismatics.org/ocre/search" target="_blank" rel="noopener noreferrer" color="#ccc">
      Online Coins of the Roman Empire (OCRE)
    </a>
  </li>
  <li>
    <a href="https://www.coinarchives.com/a/" target="_blank" rel="noopener noreferrer">
      CoinArchives - Historical Coin Auctions
    </a>
  </li>
  <li>
    <a href="https://www.cngcoins.com/Coins_sold.aspx" target="_blank" rel="noopener noreferrer">
      Classical Numismatic Group (CNG) - Coins Sold
    </a>
  </li>
  <li>
    <a href="https://www.britishmuseum.org/collection" target="_blank" rel="noopener noreferrer">
      British Museum - Collection Database
    </a>
  </li>
</ul>


        <h2>Model Features</h2>
        <ul>
          <li>
            Highly accurate classification using convolutional neural networks
            (CNNs)
          </li>
          <li>User uploads an image, and the model predicts the emperor</li>
          <li>
            Color-coded confidence levels:
            <ul>
              <li>
                <span className="green-label">Green (≥90%)</span> - Highly
                certain
              </li>
              <li>
                <span className="orange-label">Orange (60%-90%)</span> - Medium
                confidence
              </li>
              <li>
                <span className="red-label">Red (≤60%)</span> - Low confidence
              </li>
            </ul>
          </li>
        </ul>

        <h2>Developed By</h2>
        <p>
          This project was created by three computer science students at Ariel
          University.
        </p>
        <ul>
          <li>
            <strong>Marian Abosaleh</strong>
          </li>
          <li>
            <strong>Ronen Saad</strong>
          </li>
          <li>
            <strong>Sahar Ibraheem</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
