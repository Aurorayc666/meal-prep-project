import pandas as pd
import json
import os

# 1. Setup paths - we are aiming for the 'data' folder in the Root
data_path = "./raw_data/"
output_path = "./data/"

# Create the folder if it doesn't exist
os.makedirs(output_path, exist_ok=True)

# 2. Load your files
try:
    df_schedule = pd.read_csv(data_path + "weekly_meal_prep_plan.csv")
    df_recipes = pd.read_csv(data_path + "cooking_list_by_dish.csv")
    print("✅ CSV files found!")
except Exception as e:
    print(f"❌ Error: {e}. Check if files are in raw_data folder!")
    exit()

# 3. Simple conversion
# 
dishes = {}
for _, row in df_recipes.iterrows():
    name = str(row['name']).strip()
    dishes[name] = {
        "name": name,
        "ingredients": [i.strip() for i in str(row['ingredients']).split('、')],
        "recipe_steps": "Standard meal prep steps: 1. Clean ingredients. 2. Prep containers.",
        "image": f"/images/{name}.jpg"
    }

calendar = []
for _, row in df_schedule.iterrows():
    calendar.append({
        "week": row['Week'],
        "monday_big_pot_1": [d.strip() for d in str(row['Monday_big_pot_1']).split('、')],
        "monday_big_pot_2": [d.strip() for d in str(row['Monday_big_pot_2']).split('、')],
        "thursday": [d.strip() for d in str(row['Thursday']).split('、')]
    })

master_data = {
    "all_dishes": dishes,
    "calendar": calendar
}

# 4. Save
with open(output_path + 'meals.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f, ensure_ascii=False, indent=4)

print("🎉 Success! Check your data folder for meals.json")