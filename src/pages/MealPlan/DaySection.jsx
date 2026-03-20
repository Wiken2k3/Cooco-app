import { Plus, MoreHorizontal, ShoppingCart, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MealItem from "./MealItem";
import PortalDropdown from "../../components/PortalDropdown";

export default function DaySection({ day, setMealData, isLast }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newMealName, setNewMealName] = useState("");
  const [newMealImage, setNewMealImage] = useState("");

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ✅ FIX: tách label thành day + date
  const [dayName, date] = (day.label || "").split(" · ");

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openMenu = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom,
      left: Math.min(rect.right - 208, window.innerWidth - 220),
    });
    setIsMenuOpen(true);
  };

  const deleteDay = () => {
    setMealData(prev => prev.filter(d => d.id !== day.id));
  };

  // ✅ ADD MEAL
  const addMeal = () => {
    if (!newMealName.trim()) return;

    const newMeal = {
      id: Date.now(),
      name: newMealName,
      image: newMealImage || "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200"
    };

    setMealData(prev =>
      prev.map(d =>
        d.id === day.id
          ? { ...d, meals: [...d.meals, newMeal] }
          : d
      )
    );

    setNewMealName("");
    setNewMealImage("");
    setIsAddOpen(false);
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[24px] overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-[var(--color-border)]">
        
        {/* ✅ FIX H2 */}
        <h2 className="text-[14px] font-bold text-[var(--color-text)]">
          {dayName}
          {date && (
            <span className="ml-1 text-[var(--color-text-muted)]">
              · {date}
            </span>
          )}
        </h2>

        <div className="flex gap-2 relative" ref={menuRef}>
          
          {/* PLUS */}
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full 
            bg-[var(--color-button-bg)] 
            hover:bg-[var(--color-button-hover)] 
            text-[var(--color-button-color)] 
            transition"
          >
            <Plus size={20} />
          </button>

          {/* MORE MENU */}
          <button
            ref={buttonRef}
            onClick={openMenu}
            className="w-9 h-9 flex items-center justify-center rounded-full 
            bg-[var(--color-button-bg)] 
            hover:bg-[var(--color-button-hover)] 
            text-[var(--color-button-color)] 
            transition"
          >
            <MoreHorizontal size={20} />
          </button>

        </div>
      </div>

      {/* MENU */}
      {isMenuOpen && (
        <PortalDropdown>
          <div
            ref={dropdownRef}
            className="fixed w-52 
            bg-[var(--color-card)] 
            border border-[var(--color-border)] 
            rounded-xl shadow-lg z-[9999]"
            style={{ top: position.top, left: position.left }}
          >
            <MenuItem icon={<ShoppingCart size={16} />} label="Add to Groceries" />
            <MenuItem onClick={deleteDay} icon={<Trash2 size={16} />} label="Delete Day" destructive />
          </div>
        </PortalDropdown>
      )}

      {/* ADD POPUP */}
      {isAddOpen && (
        <PortalDropdown>
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            
            <div className="w-[320px] bg-[var(--color-card)] p-5 rounded-2xl border border-[var(--color-border)] shadow-xl">

              <h3 className="text-lg font-bold mb-4 text-[var(--color-text)]">
                Add Meal
              </h3>

              <input
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                placeholder="Meal name"
                className="w-full mb-3 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)]"
              />

              <input
                value={newMealImage}
                onChange={(e) => setNewMealImage(e.target.value)}
                placeholder="Image URL (optional)"
                className="w-full mb-4 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)]"
              />

              <div className="flex justify-end gap-2">
                
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[var(--color-button-bg)]"
                >
                  Cancel
                </button>

                <button
                  onClick={addMeal}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                >
                  Add
                </button>

              </div>

            </div>

          </div>
        </PortalDropdown>
      )}

      {/* MEALS */}
      <div>
        {day.meals.map((meal, idx) => (
          <MealItem
            key={meal.id}
            meal={meal}
            dayId={day.id}
            setMealData={setMealData}
            isLast={idx === day.meals.length - 1}
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
        w-full flex justify-between px-4 py-3 text-sm
        transition
        hover:bg-black/5 dark:hover:bg-white/10
        ${destructive ? "text-red-500" : "text-[var(--color-text)]"}
      `}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}