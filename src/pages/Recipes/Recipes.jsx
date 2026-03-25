import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, MoreHorizontal, ChevronLeft,
  Edit, Compass, QrCode, Camera, Image as ImageIcon, AlignLeft,
  Users, Clock
} from "lucide-react";

import { myRecipes } from "../../data/myRecipes";

export default function Recipes() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef(null);

  // ✅ click outside → close menu
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ filter search
  const filteredRecipes = myRecipes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full bg-[var(--color-bg)] pb-28 transition-colors">

      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-50 
        bg-[var(--color-bg)]/90 
        backdrop-blur-md 
        border-b border-[var(--color-border)] 
        px-6 pt-14 pb-4
      ">
        
        {/* TOP ROW */}
        <div className="flex justify-between items-center mb-4">
          
          {/* BACK */}
          <button
            onClick={() => navigate('/app/recipes/folders')}
            className="flex items-center gap-1 text-[var(--color-main)] text-[15px] font-semibold active:scale-95 transition"
          >
            <ChevronLeft size={20} />
            <span>Collections</span>
          </button>

          {/* ACTIONS */}
          <div className="flex items-center gap-2.5">
            
            {/* ADD + DROPDOWN */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setIsMenuOpen(v => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-full 
                bg-[var(--color-button-bg)] 
                hover:bg-[var(--color-button-hover)] 
                text-[var(--color-button-color)] 
                transition"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>

              {/* ✅ DROPDOWN */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 
                  bg-[var(--color-card)] 
                  border border-[var(--color-border)] 
                  rounded-2xl shadow-lg overflow-hidden z-50
                  animate-in fade-in slide-in-from-top-2 duration-200
                ">
                  
                  <MenuItem 
                    icon={<Edit size={18} />} 
                    label="Add Manually" 
                    onClick={() => navigate('add/manual')} 
                  />

                  <MenuItem 
                    icon={<Compass size={18} />} 
                    label="From Website..." 
                    onClick={() => navigate('add/website')} 
                  />

                  <MenuItem 
                    icon={<QrCode size={18} />} 
                    label="From Code..." 
                  />

                  <div className="h-px bg-[var(--color-border)] my-1" />

                  <MenuItem 
                    icon={<Camera size={18} />} 
                    label="From Camera..." 
                  />

                  <MenuItem 
                    icon={<ImageIcon size={18} />} 
                    label="From Image..." 
                  />

                  <MenuItem 
                    icon={<AlignLeft size={18} />} 
                    label="From Text..." 
                  />
                </div>
              )}
            </div>

            {/* MORE */}
            <button
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

        {/* TITLE */}
        <h1 className="text-[34px] font-[900] text-[var(--color-text)] tracking-tight mb-4">
          Recipes
        </h1>

        {/* SEARCH */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search size={18} className="text-[var(--color-text-muted)]" />
          </div>

          <input
            type="text"
            placeholder="Search your recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 
              bg-[var(--color-card)] 
              border border-[var(--color-border)] 
              rounded-2xl 
              pl-11 pr-4 
              text-[15px] font-medium 
              text-[var(--color-text)] 
              focus:outline-none 
              focus:border-[var(--color-main)] 
              transition-all
            "
          />
        </div>

      </div>

      {/* ================= GRID ================= */}
      <main className="px-6 mt-4 grid grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => navigate(`/app/recipes/${recipe.id}`)}
            className="group relative aspect-[4/3] rounded-[24px] overflow-hidden 
            cursor-pointer active:scale-[0.96] transition-all duration-300 
            shadow-sm border border-[var(--color-border)]"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover 
              transition-transform duration-500 group-hover:scale-110" 
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <p className="absolute bottom-10 left-3 right-3 
              text-white text-[14px] font-bold leading-tight line-clamp-2">
              {recipe.title}
            </p>

            <div className="absolute bottom-3 left-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-white/80">
                <Users size={12} strokeWidth={3} />
                <span className="text-[11px] font-black">{recipe.servings}</span>
              </div>

              <div className="flex items-center gap-1 text-white/80">
                <Clock size={12} strokeWidth={3} />
                <span className="text-[11px] font-black">{recipe.time}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

/* ================= MENU ITEM ================= */
function MenuItem({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center justify-between px-4 py-3 text-sm
        transition
        hover:bg-black/5 dark:hover:bg-white/10
        text-[var(--color-text)]
      "
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}