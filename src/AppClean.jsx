/*global chrome*/
import React, { useEffect, useState } from "react";
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
  const [factData, setFactData] = useState(null);
  const [loading, setLoading] = useState(true);

  const analyze = async (url) => {
    const id = extractTweetId(url);
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


  useEffect(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          analyze(tabs[0].url);
          // You can then use this URL in your React component's state or props
        }
      });
  }, [])

  return (
    <div className="app-container">
      <h2 className="app-title">FactLens</h2>
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
