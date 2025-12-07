import React, { useState } from "react";
import { fetchFact } from "./api";
import { ConfidenceScore } from "./components/ConfidenceScore";
import { Reasoning } from "./components/Reasoning";
import { SourcesList } from "./components/SourcesList";
import "./AppClean.css";

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

export default function AppClean() {
  const [tweetUrl, setTweetUrl] = useState("");
  const [factData, setFactData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    const id = extractTweetId(tweetUrl);
    if (!id) {
      alert("Invalid Tweet URL");
      return;
    }

    setLoading(true);
    setFactData(null);

    try {
      const data = await fetchFact(id);
      setFactData(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch fact-check data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2 className="app-title">FactLens</h2>

      <input
        type="text"
        placeholder="Paste Tweet URL"
        value={tweetUrl}
        onChange={(e) => setTweetUrl(e.target.value)}
        className="app-input"
      />

      <button className="app-button" onClick={analyze}>
        Analyze
      </button>

      {loading && <p className="app-loading">Loading...</p>}

      {factData && (
        <>
          <ConfidenceScore score={factData.confidenceScores} />
          <Reasoning text={factData.reasoning} />
          <SourcesList sources={factData.sources} />
        </>
      )}
    </div>
  );
}
