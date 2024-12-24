import React, { useState } from "react";
import axios from "axios";
import Tiff from "tiff.js"; // Import tiff.js

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.name.endsWith(".tif")) {
          const tiff = new Tiff({ buffer: reader.result });
          const canvas = tiff.toCanvas();
          setPreview(canvas.toDataURL());
        } else {
          setPreview(reader.result);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    setResults(["Nothing here..."]); 

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(response.data.result);
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error during prediction. Please try again.");
      setResults(["Anything make some problems, please check again !!!."]); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="title">Rabid Dog Detection</h1>
      <div className="mainContent">
        <div className="upload-section">
        <div className="image-preview">
            <h2>Uploaded Image</h2>
            {preview ? (
              <img style={{width: '300px', height: '300px'}} src={preview} alt="Uploaded preview" />
            ) : (
              <div className="empty-preview">No image selected</div>
            )}
          </div>
          <label htmlFor="file-input" className="custom-file-input">
            <i className="icon-image" />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Processing..." : "Upload and Detect"}
          </button>

         
        </div>

        <div className="results">
          <h2>Detection Results</h2>
          <ul>
            {results.length > 0
              ? results.map((res, index) => (
                  typeof res === "string" ? (
                    <li key={index}>{res}</li>
                  ) : (
                    <li style={{listStyle: 'none'}} key={index} className="result-item">
                      <strong>Expresion:</strong> {res.name} <br />
                      <strong>Confidence:</strong>{" "}
                      <span className="confidence">
                        {parseFloat(res.confidence * 100).toFixed(2)}%
                      </span>{" "}
                      <br />
                      {(res.name === "Mat_do" || res.name === "Chay_dai" || res.name === "Nhe_nanh") && (
  <p>It is a rabid dog. Please keep spacing with it.</p>
)}

                    </li>
                  )
                ))
              : <li style={{ textDecoration: 'none', listStyle: 'none' }}>Nothing here</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
