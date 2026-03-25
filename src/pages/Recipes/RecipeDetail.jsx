import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, ShoppingBasket, Play, MoreHorizontal, 
  Users, Clock, Edit3, Share2, Trash2, FolderHeart, SlidersHorizontal 
} from 'lucide-react';
// --- IMPORT DỮ LIỆU DÙNG CHUNG ---
import { myRecipes } from "../../data/myRecipes"; 

export default function RecipeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showOptions, setShowOptions] = useState(false);

  // LẤY DỮ LIỆU THẬT TỪ DATABASE DỰA TRÊN ID TRÊN URL
  const recipe = myRecipes.find((item) => String(item.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Xử lý trường hợp không tìm thấy công thức
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe not found!</h2>
        <button onClick={() => navigate('/app/recipes')} className="text-[var(--color-main)] font-bold">
          Go back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-32 font-sans select-none">
      
      {/* HEADER NAVBAR */}
      <div className="fixed top-0 left-0 right-0 pt-12 px-5 flex justify-between items-center z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/90 backdrop-blur-md dark:bg-black/50 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition"
        >
          <ChevronLeft size={24} className="text-black dark:text-white -ml-0.5" strokeWidth={3} />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="w-10 h-10 bg-white/90 backdrop-blur-md dark:bg-black/50 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition"
          >
            <MoreHorizontal size={20} className="text-black dark:text-white" strokeWidth={3} />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] p-2 z-50 animate-in fade-in zoom-in duration-200">
              <OptionItem icon={<Edit3 size={18} />} label="Edit Recipe" />
              <OptionItem icon={<FolderHeart size={18} />} label="Move Folder" />
              <OptionItem icon={<Share2 size={18} />} label="Share" />
              <div className="h-px bg-[var(--color-border)] my-1" />
              <OptionItem icon={<Trash2 size={18} />} label="Delete" color="text-red-500" />
            </div>
          )}
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="h-[45vh] relative overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/10 to-transparent" />
      </div>

      {/* CONTENT AREA */}
      <div className="px-6 pt-6 -mt-10 bg-[var(--color-bg)] rounded-t-[40px] relative z-10 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-[var(--color-main)] w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black uppercase">
            {recipe.source?.charAt(0) || 'R'}
          </div>
          <span className="text-[13px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
            {recipe.source}
          </span>
        </div>

        <h1 className="text-[32px] font-[900] leading-[1.1] text-[var(--color-text)] tracking-tight mb-6">
          {recipe.title}
        </h1>

        {/* STATS */}
        <div className="flex gap-3 mb-8">
          <StatBox icon={<Users size={20} />} value={recipe.servings} label="Servings" />
          <StatBox icon={<Clock size={20} />} value={recipe.time} label="Total Time" isWide />
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="flex gap-3 mb-10 h-16">
          <button 
            onClick={() => navigate(`/app/recipes/${id}/steps`)}
            className="flex-[3] bg-[var(--color-main)] text-white rounded-[24px] flex items-center justify-center gap-3 font-black text-[18px] shadow-lg shadow-blue-500/30 active:scale-95 transition"
          >
            <Play size={22} fill="currentColor" />
            <span>Start Cooking</span>
          </button>
          <button className="flex-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-[24px] flex items-center justify-center active:scale-90 transition">
            <ShoppingBasket size={26} />
          </button>
        </div>

        {/* INGREDIENTS SECTION */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] font-[900] text-[var(--color-text)] tracking-tight">Ingredients</h2>
            <button className="p-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)]">
              <SlidersHorizontal size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="space-y-2">
            {recipe.ingredients.map((ing, idx) => (
              <IngredientRow key={idx} amount={ing.amount} name={ing.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components nội bộ để code sạch hơn
function StatBox({ icon, value, label, isWide = false }) {
  return (
    <div className={`${isWide ? 'flex-[1.5]' : 'flex-1'} bg-[var(--color-card)] border border-[var(--color-border)] p-4 rounded-[24px] flex items-center justify-center gap-3`}>
      <span className="text-[var(--color-main)]">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[9px] uppercase font-black text-[var(--color-text-muted)]">{label}</span>
        <span className="text-[18px] font-black text-[var(--color-text)] leading-none">{value}</span>
      </div>
    </div>
  );
}

function IngredientRow({ amount, name }) {
  const [checked, setChecked] = useState(false);
  return (
    <div 
      onClick={() => setChecked(!checked)}
      className={`flex items-center p-4 rounded-2xl transition-all border ${checked ? 'bg-transparent border-transparent opacity-50' : 'bg-[var(--color-card)] border-[var(--color-border)] shadow-sm'} active:scale-[0.98] cursor-pointer`}
    >
      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition ${checked ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
        {checked && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <p className={`text-[17px] font-bold ${checked ? 'text-[var(--color-text-muted)] line-through' : 'text-[var(--color-text)]'}`}>
        <span className="text-[var(--color-main)] mr-1">{amount}</span> {name}
      </p>
    </div>
  );
}

function OptionItem({ icon, label, color = "text-[var(--color-text)]", onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition ${color}`}
    >
      <span className="text-[15px] font-bold">{label}</span>
      {icon}
    </button>
  );
}