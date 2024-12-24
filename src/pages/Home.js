import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    setResults(["Processing..."]);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(response.data.result);
    } catch (error) {
      console.error("Error:", error);
      setResults(["An error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="title">Rabid Dog Detection</h1>
      <div className="mainContent">
        <div className="upload-section">
          <div
            className="image-preview"
            style={{
              width: "300px",
              height: "300px",
              border: "2px dashed #ccc",
              margin: "20px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div>No image selected</div>
            )}
          </div>

          <label
            htmlFor="file-input"
            className="custom-file-input"
            style={{
              display: "inline-block",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <i
              className="icon-image"
              style={{
                fontSize: "24px",
                color: "white",
              }}
            />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept="image/*,.tif,.tiff"
            style={{ display: "none" }}
          />
          <button
            onClick={handleUpload}
            disabled={loading || !selectedFile}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              cursor: loading || !selectedFile ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : " Detect"}
          </button>
        </div>

        <div className="results">
          <h2>Detection Results</h2>
          <ul>
            {results.map((res, index) =>
              typeof res === "string" ? (
                <li key={index}>{res}</li>
              ) : (
                <li
                  style={{ listStyle: "none" }}
                  key={index}
                  className="result-item"
                >
                  <strong>Expression:</strong> {res.name}
                  <br />
                  <strong>Confidence:</strong>{" "}
                  <span className="confidence">
                    {(res.confidence * 100).toFixed(2)}%
                  </span>
                  {(res.name === "Mat_do" ||
                    res.name === "Chay_dai" ||
                    res.name === "Nhe_nanh") && (
                    <p className="warning">
                      It is a rabid dog. Please keep spacing with it.
                    </p>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
