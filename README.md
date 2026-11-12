# 🛒 SuperMarktRadar DE — Live Supermarket Price Tracker & Basket Optimizer

**SuperMarktRadar DE** is a real-time grocery price comparison web application built for the German supermarket ecosystem. It tracks, standardizes, and compares prices across Germany's **7 major supermarket and discount chains**:

- 🔵 **EDEKA**
- 🔴 **REWE**
- 🔷 **ALDI** (Süd & Nord)
- 🟡 **LIDL**
- 🟡 **Netto Marken-Discount**
- 🔴 **Kaufland**
- 🔴 **PENNY**

The application solves two big challenges for grocery shopping in Germany:
1. **Regional Pricing:** Allows filtering by postal code (**PLZ**, e.g., `10115` Berlin, `80331` München, `50667` Köln) because supermarket prices and flyer specials vary by region.
2. **Basket & Cart Optimization:** Calculates whether shopping at a single supermarket or splitting items across multiple stores yields the maximum savings.

---

## ⚡ Key Features

- 🔍 **Live Realtime Search:** Instant search for over 19,400+ German grocery items and brands (*Nutella*, *Linsen*, *Barilla*, *Kerrygold*, *Hafermilch*, *Kaffee*, etc.).
- 🌐 **Bilingual (DE / EN):** One-click language switcher in the header between German and English.
- 📍 **PLZ (Postal Code) Selector:** Live queries tailored to local store branches and circular deals.
- 🏷️ **Store Price Matrix:** Side-by-side comparison with unit prices (Grundpreis in €/kg, €/L) and discount tags (`%`).
- 🛒 **Smart Shopping List & Split Optimizer:**
  - Calculates the total basket cost for all 7 chains.
  - Highlights the **best single store**.
  - Computes the **optimal split purchase** (buying each item where it is absolute cheapest) and calculates exact savings.
- ⚡ **Zero-CORS Live Backend:** Built-in Node.js Express proxy with real aggregator APIs and an embedded ~19,400-product German grocery database.

---

## 🏗️ Architecture

```
supermarket-radar/
├── server.js                      # Node.js Express live aggregator backend (port 3001)
├── supermarket_catalog.csv        # Comprehensive German grocery database (19,400+ items)
├── package.json                   # Root orchestrator scripts (concurrently runner)
└── supermarket-radar/             # React + Vite frontend (port 5173)
    ├── src/
    │   ├── App.jsx                # Main responsive React UI
    │   ├── i18n.js                # Full German / English translations dictionary
    │   └── index.css              # Tailwind CSS styles
    ├── vite.config.js             # Vite config with /api reverse proxy
    └── tailwind.config.js         # Tailwind configuration
```

---

## 🚀 Quick Start Guide (Live Real-Time Mode)

Follow these steps to run the software locally with **live real-time data** and zero mock data:

### Prerequisites
- **Node.js** (v18.0.0 or newer recommended)
- **npm** (comes with Node.js)

### Step 1: Clone or Navigate to the Project Folder
Open your terminal (PowerShell, Command Prompt, or bash) and enter the project directory:
```bash
cd "Price Tracker of 7 Shops 2026"
```

### Step 2: Install Dependencies
Run the installation in the root folder and in the frontend subfolder:

```bash
# 1. Install root dependencies (Express, CORS, Concurrently)
npm install

# 2. Install frontend dependencies (React, Vite, Tailwind, Lucide)
cd supermarket-radar
npm install
cd ..
```

### Step 3: Start the Application (Single Command)
Run the following command in the **root directory**:

```bash
npm run dev
```

This starts:
- 🟢 **Live Backend Proxy API** on `http://localhost:3001`
- 🔵 **Vite React Frontend** on `http://localhost:5173`

### Step 4: Open in Your Browser
Navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 💡 How the Live Data Pipeline Works

1. **Active Flyer Deals:** When you search a product with a ZIP code (e.g. `10115`), `server.js` contacts real-time retail aggregator APIs to query active weekly leaflet discounts (*Prospekte*) for your specific region.
2. **Full Product Catalog Integration:** For everyday staples not featured in flyers this week (e.g., dry *Linsen*, *Reis*, *Mehl*), the backend matches against `supermarket_catalog.csv` (~19,400 real German supermarket items with EANs, grammages, and prices) and computes real-time pricing matrices across all 7 chains.
3. **Bypassing Browser CORS:** Modern supermarket web APIs block direct browser fetch requests. The local Node.js proxy securely fetches and standardizes the payloads before forwarding them to the React frontend.

---

## 🛠️ Available NPM Scripts

From the root directory:
- `npm run dev`: Starts both the Live Proxy server and the Vite React frontend concurrently.
- `npm run server`: Starts only the live backend proxy (`http://localhost:3001`).
- `npm run client`: Starts only the frontend Vite development server (`http://localhost:5173`).
- `npm run build`: Builds an optimized production bundle of the React app into `supermarket-radar/dist`.

---

## 🇩🇪 / 🇬🇧 Language Support

The application features full internationalization:
- Click the **`DE`** button in the top navigation bar to display German labels, metrics, and German grocery terminology.
- Click the **`EN`** button to switch all UI components, buttons, basket optimizer summaries, and savings tips to English.

---

## 🔒 Privacy & Local Execution Notice

This application is configured for **local personal use**. All queries are processed locally through your Node.js proxy. No user tracking or private data is uploaded or transmitted to third-party advertising networks.
