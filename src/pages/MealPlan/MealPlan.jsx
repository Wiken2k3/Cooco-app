import { ArrowDown, MoreHorizontal, ShoppingCart, Trash2, CloudSun, WandSparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import DaySection from './DaySection';
import { useTheme } from '../../hooks/useTheme';

const initialData = [
  {
    id: 1,
    label: "Monday · 12 June",
    meals: [
      { id: 1, name: "Healthy Avocado Toast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200" },
      { id: 2, name: "Grilled Chicken Salad", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200" },
    ]
  },
  {
    id: 2,
    label: "Tuesday · 13 June",
    meals: [
      { id: 3, name: "Beef Steak with Potatoes", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200" },
    ]
  }
];

export default function MealPlan() {
  const { isDark, setIsDark } = useTheme();

  const [mealData, setMealData] = useState(initialData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const generateWeek = () => {
    const newDay = {
      id: Date.now(),
      label: "Generated · New Day",
      meals: [
        {
          id: Date.now() + 1,
          name: "Generated Meal",
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200"
        }
      ]
    };
    setMealData(prev => [...prev, newDay]);
  };

  const clearWeek = () => setMealData([]);

  const showWeather = () => alert("🌤 Sunny 30°C");

  return (
    <div className="min-h-full pb-28 bg-[var(--color-bg)] transition-colors duration-300">

      {/* APPBAR */}
      <div className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-[32px] font-extrabold text-[var(--color-text)]">
          Meal Plan
        </h1>

        <div className="flex items-center gap-2.5">
          
          <button className="w-9 h-9 flex items-center justify-center rounded-full 
          bg-[var(--color-button-bg)] 
          hover:bg-[var(--color-button-hover)] 
          text-[var(--color-button-color)] 
          transition">
            <ArrowDown size={20} />
          </button>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsMenuOpen(v => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-full 
              bg-[var(--color-button-bg)] 
              hover:bg-[var(--color-button-hover)] 
              text-[var(--color-button-color)] 
              transition"
            >
              <MoreHorizontal size={20} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 
              bg-[var(--color-card)] 
              border border-[var(--color-border)] 
              rounded-2xl shadow-lg overflow-hidden z-50 animate-fadeIn">

                <MenuItem icon={<ShoppingCart size={18} />} label="Add to Groceries" />
                <MenuItem onClick={generateWeek} icon={<WandSparkles size={18} />} label="Generate Plan for Week" />
                <MenuItem onClick={clearWeek} icon={<Trash2 size={18} />} label="Clear Current Week" destructive />

                <div className="h-px bg-[var(--color-border)] my-1" />

                <MenuItem onClick={showWeather} icon={<CloudSun size={18} />} label="Show Weather" />
              </div>
            )}
          </div>

          {/* TOGGLE */}
          <div 
            onClick={() => setIsDark(!isDark)}
            className={`w-[50px] h-[26px] ml-1 rounded-full relative cursor-pointer transition 
            ${isDark ? 'bg-[#18baf8]' : 'bg-[#e5e7eb]'}`}
          >
            <div className={`w-[22px] h-[22px] bg-white rounded-full absolute top-[2px] left-[2px] transition-transform 
            ${isDark ? 'translate-x-[24px]' : ''}`} />
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col px-5 pt-6 gap-5">
        {mealData.map((day, idx) => (
          <DaySection 
            key={day.id}   // ✅ FIX QUAN TRỌNG
            day={day}
            setMealData={setMealData}
            isLast={idx === mealData.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ label, icon, destructive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 text-sm
        transition
        hover:bg-black/5 dark:hover:bg-white/10
        ${destructive ? 'text-red-500' : 'text-[var(--color-text)]'}
      `}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}