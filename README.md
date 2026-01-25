# 🥗 My Meal Prep App (my_meal_prep_app)

A specialized meal planning application designed to transition recipe management from static documents to a dynamic, visual, and interactive prep system.

## 🚀 Current Status: Phase 1 Complete
We have successfully moved from raw data files (CSV/Word) to a functional React prototype with linked data structures.

### ✅ What's Working (The Wins):
- **Dynamic Data Core**: Integrated `meals.json` as a relational-style database.
- **Week Selection**: Users can toggle between different prep weeks (Week 1–4).
- **Relational Lookup (VLOOKUP Logic)**: Clicking a week successfully pulls dish details from the `all_dishes` master object.
- **Ingredient Aggregation**: Implemented a "Group By" logic using `flatMap` and `Set()` to generate a unique, consolidated shopping list.

### 🏗 Architecture Notes:
- **Framework**: Next.js (App Router)
- **Data Model**: 
  - `calendar`: Fact table containing weekly schedules.
  - `all_dishes`: Dimension table containing ingredients, steps, and image paths.
- **State Management**: Using React `useState` to track the active week and derive the shopping list in real-time.



---

## 📅 Work Log: Jan 24, 2024
**Session Goal:** Connect the meal plan to recipe data and build a shopping list.

- **Accomplishment:** Built the `getConsolidatedIngredients` helper function. This solved the "duplicate garlic" problem by filtering unique items from multiple dishes.
- **Observation:** Found a data naming mismatch in `meals.json` (e.g., "西葫芦炒蛋" vs "西葫芦炒鸡蛋"). Code is strict; names must match perfectly for the lookup to work.

---

## 🔜 Next Steps (Tomorrow's Backlog)
1.  **Data Cleaning**: Audit `meals.json` to ensure dish names in `calendar` match the keys in `all_dishes` exactly.
2.  **Visual UI (The "Gallery" Feature)**: 
    - Implement `next/image` to display dish photos.
    - Add a "Recipe Detail" modal to show cooking steps from the `recipe_steps` field.
3.  **Social Ordering (Phase 2)**: 
    - Design a "Friend Mode" where visitors can select from the prep list.

---

## 🛠 Tech Stack
- **Language**: TypeScript
- **Styling**: Inline CSS (Rapid Prototyping)
- **Data**: JSON / CSV