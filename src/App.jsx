import React, { useState } from "react";

function extractTweetId(url) {
  try {
    const parts = url.split("/status/");
    if (parts.length > 1) {
      return parts[1].split(/[/?]/)[0];
    }
    return null;
  } catch {
    return null;
  }
}

function App() {
  const [tweetUrl, setTweetUrl] = useState("");
  const [factData, setFactData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        width: "360px",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "12px" }}>FactLens</h2>

      {/* TEMP INPUT */}
      <input
        type="text"
        placeholder="Paste Tweet URL"
        value={tweetUrl}
        onChange={(e) => setTweetUrl(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <button
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
        onClick={async () => {
          const id = extractTweetId(tweetUrl);
          if (!id) {
            alert("Invalid tweet URL");
            return;
          }

          setLoading(true);
          setFactData(null);

          try {
            const res = await fetch(`http://localhost:8000/facts/${id}`);
            const data = await res.json();
            setFactData(data);
          } catch (err) {
            console.error(err);
            alert("Error fetching fact-check data");
          }

          setLoading(false);
        }}
      >
        Analyze
      </button>

      {loading && <p>Loading...</p>}

      {/* ⭐ Render fact-check results only when factData exists */}
      {factData && (
        <>
          {/* Confidence Score */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "6px" }}>Confidence Score</h3>
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#eee",
                borderRadius: "5px",
                overflow: "hidden",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: `${factData.confidenceScores}%`,
                  height: "100%",
                  background:
                    factData.confidenceScores > 70 ? "#4caf50" : "#f4a261",
                }}
              ></div>
            </div>
            <p style={{ fontSize: "14px", color: "#444" }}>
              {factData.confidenceScores}% confidence in the accuracy of this
              claim.
            </p>
          </div>

          {/* Reasoning */}
          <div
            style={{
              background: "#fafafa",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #eee",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>Reasoning</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.4" }}>
              {factData.reasoning}
            </p>
          </div>

          {/* Sources */}
          <h3 style={{ marginBottom: "8px" }}>Sources</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {factData.sources.map((src, i) => (
              <div
                key={i}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <strong>{src.title}</strong>
                  <span
                    style={{
                      padding: "2px 6px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      background:
                        src.ratingStance === "Mostly Support"
                          ? "#d4f7d4"
                          : src.ratingStance === "Opposite"
                          ? "#ffd4d4"
                          : "#ffe6b3",
                    }}
                  >
                    {src.ratingStance}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: "14px" }}>{src.snippet}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
