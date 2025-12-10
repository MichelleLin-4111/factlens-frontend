// Simple API client that returns mock data by default.
// Switch to real backend by setting VITE_USE_MOCKS=false and VITE_API_BASE_URL.

const defaultMock = (tweetId) => {
  // Example mock matching the shape you were given (confidence as 0-100)
  return {
    confidenceScores: 82,
    reasoning:
      "Most available evidence leans toward the claim being accurate, though some contextual nuances remain unclear.",
    sources: [
      {
        title: "Community Note #1421",
        ratingStance: "Mostly Support",
        snippet:
          "Multiple users referenced historical data showing the event occurred as described.",
      },
      {
        title: "Community Note #889",
        ratingStance: "Partially Support",
        snippet:
          "Provides supporting details but also indicates missing supporting citations.",
      },
    ],
  };
};

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchFact(tweetId) {
  const base = import.meta.env.VITE_API_BASEz_URL || "http://localhost:8000";
  const url = `${base.replace(/\/$/, "")}/facts/${tweetId}`;

  const resp = await fetch(url, { method: "GET" });
  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(`API error ${resp.status}: ${txt}`);
  }

  const json = await resp.json();
  // normalize: if backend returns confidence in 0..1, convert to 0..100
  if (typeof json.confidenceScores === "number" && json.confidenceScores <= 1) {
    json.confidenceScores = Math.round(json.confidenceScores * 100);
  }
  return json;
}

export default { fetchFact };
