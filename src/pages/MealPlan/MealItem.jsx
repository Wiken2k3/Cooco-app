import { MoreHorizontal, ShoppingCart, Trash2, Eye } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import PortalDropdown from "../../components/PortalDropdown";

export default function MealItem({ meal, dayId, setMealData, isLast }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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
      left: Math.min(rect.right - 192, window.innerWidth - 200),
    });
    setIsMenuOpen(true);
  };

  const removeMeal = () => {
    setMealData(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, meals: day.meals.filter(m => m.id !== meal.id) }
          : day
      )
    );
  };

  return (
    <div className={`
      flex items-center gap-4 px-5 py-4
      ${!isLast ? "border-b border-[var(--color-border)]" : ""}
      hover:bg-black/5 dark:hover:bg-white/5
      transition
    `}>
      
      <img 
        src={meal.image} 
        className="w-14 h-14 rounded-[16px] object-cover" 
      />

      <span className="flex-1 truncate text-[16px] font-medium text-[var(--color-text)]">
        {meal.name}
      </span>

      <div ref={menuRef}>
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

      {isMenuOpen && (
        <PortalDropdown>
          <div
            ref={dropdownRef}
            className="fixed w-48 
            bg-[var(--color-card)] 
            border border-[var(--color-border)] 
            rounded-xl shadow-lg z-[9999]"
            style={{ top: position.top, left: position.left }}
          >
            <MenuItem icon={<Eye size={16} />} label="View Details" />
            <MenuItem icon={<ShoppingCart size={16} />} label="Add to Groceries" />
            <MenuItem 
              onClick={removeMeal} 
              icon={<Trash2 size={16} />} 
              label="Remove Meal" 
              destructive 
            />
          </div>
        </PortalDropdown>
      )}
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