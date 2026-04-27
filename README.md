# Product Analytics Dashboard

A full-stack dashboard built with ReactJS + Google Apps Script.

## Features

- **Pricing Analytics** — product prices, discounts, stock status
- **Sentiment Analysis** — review scores and sentiment scoring

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Frontend:** ReactJS
- **Backend:** Google Apps Script (Web App)
- **Data Source:** [DummyJSON Products API](https://dummyjson.com/products)

## API

The backend is hosted on Google Apps Script and accepts POST requests with:

```json
{
  "accessToken": "secret-token",
  "type": "pricing"
}
```

Use `"type": "reviews"` for sentiment analysis data.
