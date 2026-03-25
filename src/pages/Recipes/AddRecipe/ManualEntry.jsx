import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, Plus, Trash2, Clock, Users } from "lucide-react";

export default function ManualEntry() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20">
      <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl px-6 pt-14 pb-4 flex justify-between items-center border-b border-[var(--color-border)]">
        <button onClick={() => navigate(-1)} className="text-[var(--color-main)] font-bold">Cancel</button>
        <h1 className="text-[17px] font-black">New Recipe</h1>
        <button className="text-[var(--color-main)] font-black">Save</button>
      </header>

      <main className="p-6 space-y-8">
        {/* Photo Upload Area */}
        <div className="aspect-video bg-gray-100 dark:bg-zinc-800 rounded-[32px] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)]">
          <Camera size={40} strokeWidth={1} />
          <span className="font-bold text-sm">Add Food Photo</span>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <input type="text" placeholder="Recipe Title" className="w-full text-3xl font-[900] bg-transparent outline-none placeholder:opacity-30" />
          <div className="flex gap-4">
            <div className="flex-1 bg-[var(--color-card)] p-4 rounded-2xl flex items-center gap-3 border border-[var(--color-border)]">
              <Clock size={20} className="text-[var(--color-main)]" />
              <input type="text" placeholder="30m" className="bg-transparent w-full font-bold outline-none" />
            </div>
            <div className="flex-1 bg-[var(--color-card)] p-4 rounded-2xl flex items-center gap-3 border border-[var(--color-border)]">
              <Users size={20} className="text-[var(--color-main)]" />
              <input type="number" placeholder="4" className="bg-transparent w-full font-bold outline-none" />
            </div>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="space-y-4">
          <h2 className="text-xl font-black">Ingredients</h2>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-left-2">
              <input 
                type="text" placeholder="Qty" 
                className="w-20 p-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl font-bold text-center outline-none" 
              />
              <input 
                type="text" placeholder="Ingredient name..." 
                className="flex-1 p-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl font-bold outline-none" 
              />
            </div>
          ))}
          <button 
            onClick={() => setIngredients([...ingredients, { name: "", amount: "" }])}
            className="w-full py-4 border-2 border-dashed border-[var(--color-border)] rounded-2xl text-[var(--color-main)] font-black flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <Plus size={20} /> Add Ingredient
          </button>
        </div>
      </main>
    </div>
  );
}