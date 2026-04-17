import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  History, 
  Play, 
  Compass, 
  ShoppingBasket, 
  Send, 
  Users, 
  Clock, 
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { discoverFeeds } from '../../data/discoverFeeds';
import SaveModal from './SaveModal';

export default function DiscoverDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSave, setShowSave] = useState(false);

  const feed = discoverFeeds.find(f => String(f.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!feed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-bg)] transition-colors gap-4">
        <p className="text-[var(--color-text-muted)] font-bold">Recipe not found</p>
        <button 
          onClick={() => navigate('/app/discover')}
          className="px-6 py-2 bg-[var(--color-main)] text-white rounded-full font-bold"
        >
          Back to Discover
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] transition-colors pb-32 font-sans select-none">
      
      {/* HEADER NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-[var(--color-border)] transition-all">
        <div 
          className="flex items-center gap-1 cursor-pointer active:opacity-50 transition" 
          onClick={() => navigate('/app/discover')}
        >
          <ChevronLeft size={28} className="text-[var(--color-main)]" strokeWidth={2.5} />
          <span className="text-[18px] font-bold text-[var(--color-main)]">Discover</span>
        </div>
        <button className="p-2 hover:bg-[var(--color-button-hover)] rounded-full active:scale-90 transition">
          <History size={26} className="text-[var(--color-main)]" />
        </button>
      </nav>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        
        {/* HERO IMAGE SECTION */}
        <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-lg group">
          <img 
            src={feed.image} 
            alt={feed.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-white text-[28px] font-[900] leading-tight mb-4 tracking-tight drop-shadow-md">
              {feed.title}
            </h1>
            <div className="flex items-center gap-2 bg-[var(--color-card)]/90 backdrop-blur-md w-fit px-3 py-1.5 rounded-full shadow-sm border border-[var(--color-border)]">
              <div className="w-6 h-6 bg-[#E31C2D] text-white rounded-full flex items-center justify-center text-[11px] font-black shadow-inner">
                {feed.author ? feed.author.charAt(0).toUpperCase() : 'C'}
              </div>
              <span className="text-[13px] font-bold text-[var(--color-text)] tracking-tight">
                {feed.source || 'cooco.app'}
              </span>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="flex gap-3 h-14">
          <button 
            className="flex-1 bg-[#C8EFDB] dark:bg-[#2D6A4F] hover:brightness-105 text-[#2D6A4F] dark:text-[#C8EFDB] rounded-[24px] flex items-center justify-center gap-2 font-[800] text-[18px] transition active:scale-95 shadow-sm"
            onClick={() => navigate(`/app/discover/${feed.id}/steps`)}
          >
            <Play size={22} fill="currentColor" />
            <span>Start</span>
          </button>
          
          <CircleBtn icon={<Compass size={24} />} bgColor="bg-[#D1E5F8] dark:bg-[#1A3A5A]" textColor="text-[var(--color-main)]" />
          <CircleBtn icon={<ShoppingBasket size={24} />} bgColor="bg-[#FDEFD6] dark:bg-[#5A3A1A]" textColor="text-[#F59E0B]" />
          <CircleBtn icon={<Send size={24} />} bgColor="bg-[#E9DFFC] dark:bg-[#3A1A5A]" textColor="text-[#7C3AED]" />
        </div>

        {/* STATS GRID */}
        <div className="flex gap-3">
          <div className="flex-1 bg-[var(--color-card)] p-4 rounded-[24px] flex items-center justify-center gap-3 shadow-sm border border-[var(--color-border)] transition-colors">
            <Users size={24} className="text-[var(--color-text-muted)]" />
            <span className="text-[20px] font-black text-[var(--color-text)]">{feed.servings || '2'}</span>
          </div>
          <div className="flex-[2] bg-[var(--color-card)] p-4 rounded-[24px] flex items-center justify-center gap-4 shadow-sm border border-[var(--color-border)] transition-colors">
            <Clock size={24} className="text-[var(--color-text-muted)]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-[var(--color-text-muted)] tracking-widest leading-none mb-1">Prep Time</span>
              <span className="text-[17px] font-black text-[var(--color-text)]">{feed.duration || '30 min'}</span>
            </div>
          </div>
        </div>

        {/* INGREDIENTS SECTION */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[24px] font-[900] tracking-tight text-[var(--color-text)]">Ingredients</h2>
            <div className="flex gap-2">
              <button className="bg-[var(--color-button-bg)] text-[var(--color-main)] px-5 py-1.5 rounded-xl font-bold text-sm transition active:scale-90">Scale</button>
              <button className="bg-[var(--color-button-bg)] text-[var(--color-main)] p-2 rounded-xl transition active:scale-90">
                <SlidersHorizontal size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="bg-[var(--color-card)] rounded-[28px] p-2 shadow-sm border border-[var(--color-border)] divide-y divide-[var(--color-border)] transition-colors">
            {feed.ingredients?.map((item, i) => (
              <IngredientItem key={i} text={item} />
            )) || <p className="p-4 text-[var(--color-text-muted)] text-center">No ingredients listed.</p>}
          </div>
        </div>
      </div>

      {/* FLOATING SAVE BUTTON */}
      <div className="fixed bottom-10 left-0 right-0 px-6 flex justify-center z-40 pointer-events-none">
        <button 
          onClick={() => setShowSave(true)}
          className="pointer-events-auto bg-[var(--color-main)] text-white px-10 py-4 rounded-full flex items-center gap-2.5 font-black text-[17px] shadow-[0_10px_25px_rgba(var(--color-main-rgb),0.4)] hover:brightness-105 active:scale-95 transition-all"
        >
          <Download size={22} strokeWidth={3} />
          <span>Save</span>
        </button>
      </div>

      {showSave && (
        <SaveModal feed={feed} onClose={() => setShowSave(false)} />
      )}
    </div>
  );
}

function CircleBtn({ icon, bgColor, textColor }) {
  return (
    <button className={`${bgColor} ${textColor} w-14 h-14 rounded-full flex items-center justify-center transition active:scale-90 shadow-sm hover:brightness-105`}>
      {icon}
    </button>
  );
}

function IngredientItem({ text }) {
  const parts = text.split(' ');
  const quantity = parts[0] + (parts[1] === 'cup' ? ' cup' : '');
  const name = text.replace(quantity, '');

  return (
    <div className="flex justify-between items-center p-4 hover:bg-[var(--color-button-bg)] transition duration-200">
      <div className="flex items-center">
        <span className="text-[var(--color-main)] font-black text-[17px] mr-2 whitespace-nowrap">{quantity}</span>
        <span className="text-[var(--color-text)] font-bold text-[16px] tracking-tight">{name}</span>
      </div>
      <span className="text-[var(--color-text-muted)] opacity-50 font-bold text-[13px] ml-4">($0.01)</span>
    </div>
  );
}