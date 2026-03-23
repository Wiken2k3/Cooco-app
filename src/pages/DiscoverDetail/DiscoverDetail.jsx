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

  // Đảm bảo tìm ID chính xác dù là String hay Number
  const feed = discoverFeeds.find(f => String(f.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!feed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F8F9FA] gap-4">
        <p className="text-gray-500 font-bold">Recipe not found</p>
        <button 
          onClick={() => navigate('/app/discover')} // Đã thêm /app
          className="px-6 py-2 bg-[#00A3FF] text-white rounded-full font-bold"
        >
          Back to Discover
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32 font-sans select-none">
      
      {/* HEADER NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 transition-all">
        <div 
          className="flex items-center gap-1 cursor-pointer active:opacity-50 transition" 
          onClick={() => navigate('/app/discover')} // Về trang danh sách chuẩn
        >
          <ChevronLeft size={28} className="text-[#00A3FF]" strokeWidth={2.5} />
          <span className="text-[18px] font-bold text-[#00A3FF]">Discover</span>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full active:scale-90 transition">
          <History size={26} className="text-[#00A3FF]" />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
            <h1 className="text-white text-[28px] font-[900] leading-tight mb-4 tracking-tight">
              {feed.title}
            </h1>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm w-fit px-3 py-1.5 rounded-full shadow-sm border border-white/20">
              <div className="w-6 h-6 bg-[#E31C2D] text-white rounded-full flex items-center justify-center text-[11px] font-black shadow-inner">
                F
              </div>
              <span className="text-[13px] font-bold text-gray-700 tracking-tight">budgetbytes.com</span>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="flex gap-3 h-14">
          <button 
            className="flex-1 bg-[#C8EFDB] hover:bg-[#bcead2] text-[#2D6A4F] rounded-[24px] flex items-center justify-center gap-2 font-[800] text-[18px] transition active:scale-95 shadow-sm"
            // FIX QUAN TRỌNG: Đường dẫn chuẩn để vào trang Steps
            onClick={() => navigate(`/app/discover/${feed.id}/steps`)}
          >
            <Play size={22} fill="currentColor" />
            <span>Start</span>
          </button>
          
          <CircleBtn icon={<Compass size={24} />} bgColor="bg-[#D1E5F8]" textColor="text-[#00A3FF]" />
          <CircleBtn icon={<ShoppingBasket size={24} />} bgColor="bg-[#FDEFD6]" textColor="text-[#F59E0B]" />
          <CircleBtn icon={<Send size={24} />} bgColor="bg-[#E9DFFC]" textColor="text-[#7C3AED]" />
        </div>

        {/* STATS GRID */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white p-4 rounded-[24px] flex items-center justify-center gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
            <Users size={24} className="text-gray-400" />
            <span className="text-[20px] font-black text-gray-800">{feed.servings || '10'}</span>
          </div>
          <div className="flex-[2] bg-white p-4 rounded-[24px] flex items-center justify-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-50">
            <Clock size={24} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Prep Time</span>
              <span className="text-[17px] font-black text-gray-800">{feed.duration || '1hr, 10min'}</span>
            </div>
          </div>
        </div>

        {/* INGREDIENTS SECTION */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[24px] font-[900] tracking-tight text-gray-900">Ingredients</h2>
            <div className="flex gap-2">
              <button className="bg-[#D1E5F8] hover:bg-[#c2def5] text-[#00A3FF] px-5 py-1.5 rounded-xl font-bold text-sm transition active:scale-90">Scale</button>
              <button className="bg-[#D1E5F8] hover:bg-[#c2def5] text-[#00A3FF] p-2 rounded-xl transition active:scale-90">
                <SlidersHorizontal size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-2 shadow-sm border border-gray-50 divide-y divide-gray-50">
            {feed.ingredients.map((item, i) => (
              <IngredientItem key={i} text={item} />
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING SAVE BUTTON */}
      <div className="fixed bottom-10 left-0 right-0 px-6 flex justify-center z-40 pointer-events-none">
        <button 
          onClick={() => setShowSave(true)}
          className="pointer-events-auto bg-[#00A3FF] text-white px-10 py-4 rounded-full flex items-center gap-2.5 font-black text-[17px] shadow-[0_10px_25px_rgba(0,163,255,0.4)] hover:brightness-105 active:scale-95 transition-all"
        >
          <Download size={22} strokeWidth={3} />
          <span>Save</span>
        </button>
      </div>

      {showSave && (
        <SaveModal
          feed={feed}
          onClose={() => setShowSave(false)}
        />
      )}
    </div>
  );
}

// Reusable Circular Action Button
function CircleBtn({ icon, bgColor, textColor }) {
  return (
    <button className={`${bgColor} ${textColor} w-14 h-14 rounded-full flex items-center justify-center transition active:scale-90 shadow-sm hover:brightness-105`}>
      {icon}
    </button>
  );
}

// Reusable Ingredient Row
function IngredientItem({ text }) {
  const parts = text.split(' ');
  const quantity = parts[0] + (parts[1] === 'cup' ? ' cup' : '');
  const name = text.replace(quantity, '');

  return (
    <div className="flex justify-between items-center p-4 hover:bg-gray-50/50 transition duration-200">
      <div className="flex items-center">
        <span className="text-[#00A3FF] font-black text-[17px] mr-2 whitespace-nowrap">{quantity}</span>
        <span className="text-gray-700 font-bold text-[16px] tracking-tight">{name}</span>
      </div>
      <span className="text-gray-300 font-bold text-[13px] ml-4">($0.01)</span>
    </div>
  );
}