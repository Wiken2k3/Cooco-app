import { Plus, MoreHorizontal, ShoppingCart, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MealItem from "./MealItem";
import PortalDropdown from "../../components/PortalDropdown";

export default function DaySection({ day, date, meals = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

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

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[24px] overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-[var(--color-border)]">
        
        <h2 className="text-[14px] font-bold">
          {day}
          <span className="ml-1 text-[var(--color-text-muted)]">
            · {date}
          </span>
        </h2>

        <div className="flex gap-2 relative" ref={menuRef}>
          
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-button-bg)]">
            <Plus size={20} />
          </button>

          <button
            ref={buttonRef}
            onClick={openMenu}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-button-bg)]"
          >
            <MoreHorizontal size={20} />
          </button>

        </div>
      </div>

      {/* Dropdown */}
      {isMenuOpen && (
        <PortalDropdown>
          <div
            ref={dropdownRef}
            className="fixed w-52 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-lg z-[9999]"
            style={{ top: position.top, left: position.left }}
          >
            <MenuItem icon={<ShoppingCart size={16} />} label="Add to Groceries" />
            <MenuItem icon={<Trash2 size={16} />} label="Delete Day" destructive />
          </div>
        </PortalDropdown>
      )}

      {/* Meals */}
      <div>
        {meals.map((meal, idx) => (
          <MealItem key={idx} meal={meal} isLast={idx === meals.length - 1} />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ label, icon, destructive }) {
  return (
    <button className={`
      w-full flex justify-between px-4 py-3 text-sm
      hover:bg-black/5 dark:hover:bg-white/10
      ${destructive ? "text-red-500" : ""}
    `}>
      <span>{label}</span>
      {icon}
    </button>
  );
}