'use client';

import { useState } from 'react';
import mealsData from '../data/meals.json';

type WeekPlan = {
  week: string;
  monday_big_pot_1: string[];
  monday_big_pot_2: string[];
  thursday: string[];
};

export default function Home() {
  const { calendar, all_dishes } = mealsData;
  const [selectedWeek, setSelectedWeek] = useState<WeekPlan | null>(null);

  // --- NEW LOGIC START ---
  // This helper function creates our "Pivot Table"
  const getConsolidatedIngredients = (week: WeekPlan) => {
    const allIngredients = [
      ...week.monday_big_pot_1, 
      ...week.monday_big_pot_2, 
      ...week.thursday
    ].flatMap(dishName => all_dishes[dishName as keyof typeof all_dishes]?.ingredients || []);

    // Set() is a special JavaScript tool that automatically removes duplicates
    return Array.from(new Set(allIngredients));
  };
  // --- NEW LOGIC END ---

  const shoppingList = selectedWeek ? getConsolidatedIngredients(selectedWeek) : [];

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#f97316' }}>My Meal Prep Plan</h1>
      
      {/* 1. Week Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {calendar.map((wk, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedWeek(wk)}
            style={{ 
              padding: '10px 15px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              border: '2px solid #f97316',
              backgroundColor: selectedWeek?.week === wk.week ? '#f97316' : 'white',
              color: selectedWeek?.week === wk.week ? 'white' : '#f97316',
              fontWeight: 'bold'
            }}
          >
            {wk.week}
          </button>
        ))}
      </div>

      {selectedWeek && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>📅 Prep Schedule</h3>
            <p><strong>Monday (Big Pots):</strong></p>
            <ul>
              {selectedWeek.monday_big_pot_1.map((dish, i) => <li key={i}>{dish}</li>)}
              {selectedWeek.monday_big_pot_2.map((dish, i) => <li key={i + 100}>{dish}</li>)}
            </ul>
            <p><strong>Thursday:</strong></p>
            <ul>
              {selectedWeek.thursday.map((dish, i) => <li key={i}>{dish}</li>)}
            </ul>
          </div>

          <div style={{ backgroundColor: '#fff7ed', padding: '15px', borderRadius: '12px', border: '2px solid #f97316' }}>
            <h3>🛒 Master Shopping List</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {shoppingList.map((ing, i) => (
                <li key={i} style={{ marginBottom: '8px', borderBottom: '1px solid #fee2e2', paddingBottom: '4px' }}>
                  <input type="checkbox" style={{ marginRight: '10px' }} /> 
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}