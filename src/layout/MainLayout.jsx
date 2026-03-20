import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { navItems } from "../config/navigation";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen max-w-[430px] mx-auto bg-[var(--color-bg)] shadow-2xl overflow-hidden transition-colors duration-300">
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Tab Bar */}
      <div className="flex justify-around items-center bg-[var(--color-card)] border-t border-[var(--color-border)] px-2 pt-2.5 pb-[calc(14px+env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`
                flex-1 flex flex-col items-center gap-1
                transition-all duration-200
                ${isActive 
                  ? "text-[var(--color-main)] scale-105" 
                  : "text-[#9CA3AF]"
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.8 : 2.2}
                className={isActive ? "scale-110" : ""}
              />
              <span className="text-[10.5px] font-bold uppercase">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}