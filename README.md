# MakanPlan SG (Happy Chef)

A Singapore-focused weekly meal planning web application designed for HDB home cooks, working couples, and families. Features authentic local recipes, wet market and supermarket ingredient breakdowns, and live serverless API connectivity.

---

## Features

- **7-Day Visual Meal Planner**: Breakfast, lunch, and dinner scheduling with servings multiplier (1 to 6 pax) and preset blueprints (*Classic SG Family*, *20-Min Busy Executive*, *Halal Comfort*, *HPB Healthier Choice*).
- **Consolidated Smart Groceries**: Aggregated shopping list with live price comparison across **NTUC FairPrice**, **Sheng Siong**, and **Tekka / Chinatown Wet Markets**.
- **1-Click WhatsApp Export**: Formats the weekly grocery cart with categories and checkboxes, ready to paste into family chat groups.
- **Pantry & Fridge Rescue**: Select leftover items in your kitchen to immediately find compatible Singapore recipes.
- **Serverless API Connection (TheMealDB)**: Live proxy routes (`/api/recipes/external?i=chicken_breast`) pulling recipes from TheMealDB.
- **Wet Market & Cooking Secrets**: Authentic local advice on rempah batch freezing, fish steaming rules, and clear bone broth blanching.

---

## Getting Started

### Development
```bash
npm install
npm run dev
```

The application runs on `http://localhost:3000`.

### Build & Production
```bash
npm run build
npm start
```

---

## Documentation

- Full prompt log: [PROMPTS.md](./PROMPTS.md)
