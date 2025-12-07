# FactLens — Chrome Extension for Tweet Fact-Checking

A responsive Chrome extension that analyzes tweets for factual accuracy using a backend API and mock data.

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server (hot-reload on changes)
npm run dev
```

Visit `http://localhost:5173` to see the UI in action (with mock data by default).

### Build for Chrome Extension

```bash
# Build the extension
npm run build

# Load in Chrome:
# 1. Open chrome://extensions
# 2. Enable "Developer mode" (top right)
# 3. Click "Load unpacked"
# 4. Select the `dist/` folder
# 5. Click the extension icon, then "Options" to open the app
```

## Configuration

Copy `.env.example` to `.env` and adjust settings:

```bash
cp .env.example .env
```

**Environment variables:**
- `VITE_USE_MOCKS` — Use mock data (true) or call real backend (false)
- `VITE_API_BASE_URL` — Backend API URL (default: `http://localhost:8000`)

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
  - Mobile (360px): Compact layout
  - Tablet (768px+): Expanded spacing
  - Desktop (1200px+): Maximum width container
- **Component Architecture**: Clean separation of concerns
  - `AppClean.jsx` — Main container and logic
  - `ConfidenceScore.jsx` — Confidence visualization
  - `Reasoning.jsx` — Explanation text
  - `SourcesList.jsx` + `SourceCard.jsx` — Source citations
- **Mock Data**: Built-in mock responses for testing without backend
- **Chrome Extension**: Manifest V3 compliant with options page

## Project Structure

```
src/
├── AppClean.jsx              # Main app component
├── AppClean.css              # Responsive styles
├── api.js                    # API client (mocks + real)
├── components/
│   ├── ConfidenceScore.jsx   # Confidence bar
│   ├── ConfidenceScore.css
│   ├── Reasoning.jsx         # Reasoning section
│   ├── Reasoning.css
│   ├── SourcesList.jsx       # Sources container
│   ├── SourcesList.css
│   ├── SourceCard.jsx        # Individual source
│   └── SourceCard.css
public/
├── manifest.json             # Chrome extension manifest (MV3)
└── index.html                # Built by Vite
```

## Notes

- Mock data is enabled by default; set `VITE_USE_MOCKS=false` in `.env` to use the real backend
- The extension loads `index.html` as an options page
- All styles use mobile-first approach with media queries for larger screens

