import { ArrowDown, MoreHorizontal, ShoppingCart, Trash2, CloudSun, WandSparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import DaySection from './DaySection';
import { useTheme } from '../../hooks/useTheme';

// ✅ helper: lấy Monday của tuần hiện tại
const getStartOfWeek = () => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sun) → 6 (Sat)
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // về Monday
  return new Date(now.setDate(diff));
};

// ✅ format label: Monday · 16 March
const formatLabel = (date) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `${dayName} · ${day} ${month}`;
};

// ✅ tạo 7 ngày của tuần hiện tại
const generateFullWeek = () => {
  const start = getStartOfWeek();
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    return {
      id: Date.now() + i,
      label: formatLabel(d),
      meals: []
    };
  });
};

// ✅ INITIAL: giữ 2 ngày mẫu nhưng update date tuần hiện tại
const getInitialData = () => {
  const week = generateFullWeek();

  return [
    {
      ...week[0],
      meals: [
        { id: 1, name: "Healthy Avocado Toast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200" },
        { id: 2, name: "Grilled Chicken Salad", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200" },
      ]
    },
    {
      ...week[1],
      meals: [
        { id: 3, name: "Beef Steak with Potatoes", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200" },
      ]
    }
  ];
};

export default function MealPlan() {
  const { isDark, setIsDark } = useTheme();

  const [mealData, setMealData] = useState(getInitialData);
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

  // ✅ Thêm các ngày chưa có trong tuần hiện tại
  const generateWeek = () => {
    const existingLabels = mealData.map(d => d.label);
    const fullWeek = generateFullWeek();
    const newDays = fullWeek.filter(day => !existingLabels.includes(day.label));

    if (newDays.length === 0) {
      alert("All days for this week are already generated!");
      return;
    }

    setMealData(prev => [...prev, ...newDays]);
  };

  const clearWeek = () => setMealData([]);

  // ✅ Lấy weather thực tế từ OpenWeatherMap
  const fetchWeather = async () => {
    try {
      const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // điền API của bạn
      const lat = 21.0278; // Hà Nội ví dụ
      const lon = 105.8342;

      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const data = await res.json();

      alert(`🌤 ${data.weather[0].description}, ${data.main.temp}°C`);
    } catch (err) {
      console.error(err);
      alert("Cannot fetch weather 😢");
    }
  };

  return (
    <div className="min-h-full pb-28 bg-[var(--color-bg)] transition-colors duration-300">

      {/* APPBAR */}
      <div className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-6 pt-14 pb-4 flex justify-between items-center">
        
        <h1 className="text-[34px] font-extrabold text-[var(--color-text)] tracking-tight">
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
              rounded-2xl shadow-lg overflow-hidden z-50">

                <MenuItem icon={<ShoppingCart size={18} />} label="Add to Groceries" />
                <MenuItem onClick={generateWeek} icon={<WandSparkles size={18} />} label="Generate Plan for Week" />
                <MenuItem onClick={clearWeek} icon={<Trash2 size={18} />} label="Clear Current Week" destructive />

                <div className="h-px bg-[var(--color-border)] my-1" />

                <MenuItem onClick={fetchWeather} icon={<CloudSun size={18} />} label="Show Weather" />
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
            key={day.id}
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