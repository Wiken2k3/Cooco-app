import { useState, useRef, useEffect } from "react";
import { Plus, Sparkles, ChevronRight, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal";
import SuggestedFeedsModal from "./SuggestedFeedsModal";

// 1. Import dữ liệu gốc từ file bạn vừa tạo
import { discoverFeeds } from "../../data/discoverFeeds"; 

export default function Discover() {
  const navigate = useNavigate();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSuggestedOpen, setIsSuggestedOpen] = useState(false);
  const [addedIds, setAddedIds] = useState([]);
  const [feeds, setFeeds] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const openMenu = () => setIsMenuOpen(prev => !prev);

  // ================= LOAD DATA =================
  useEffect(() => {
    const safeLoad = (key, setter) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw || raw === "undefined") return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setter(parsed);
      } catch (err) {
        console.error(`❌ Error parsing ${key}:`, err);
      }
    };
    safeLoad("feeds", setFeeds);
    safeLoad("addedIds", setAddedIds);
  }, []);

  // ================= SAVE DATA =================
  useEffect(() => { 
    localStorage.setItem("feeds", JSON.stringify(feeds)); 
    localStorage.setItem("addedIds", JSON.stringify(addedIds));
  }, [feeds, addedIds]);

  // ================= HANDLE ADD FEED (Đã chỉnh sửa) =================
  const handleAddFeed = (creator) => {
    if (addedIds.includes(creator.id)) return;

    // Tìm dữ liệu chi tiết trong discoverFeeds dựa trên ID của creator
    const sourceData = discoverFeeds.find(item => item.id === creator.id);

    if (sourceData) {
      const newRecipe = { 
        ...sourceData,        // Lấy tất cả thuộc tính từ database (id, title, image, avatar...)
        time: "Just now",    // Ghi đè thời gian hiển thị
        displayImg: sourceData.image // Đảm bảo đồng bộ tên biến ảnh
      };

      setAddedIds(prev => [...prev, creator.id]);
      setFeeds(prev => [newRecipe, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] transition-colors">

      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-6 pt-14 pb-4 flex justify-between items-end">
        <h1 className="text-[34px] font-[900] text-[var(--color-text)] tracking-tight">Discover</h1>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-color)] transition active:scale-95"
          >
            <Plus size={20} />
          </button>

          <div className="relative">
            <button
              ref={buttonRef}
              onClick={openMenu}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-color)] transition active:scale-95"
            >
              <MoreHorizontal size={20} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden z-50">
                <button
                  onClick={() => { setIsSuggestedOpen(true); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-black/5 transition"
                >
                  Suggested Feeds
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-black/5 transition text-red-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 pb-32">
        {feeds.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 px-8 text-center">
            <Sparkles size={48} strokeWidth={1.5} className="mb-6 text-[var(--color-text-muted)] opacity-30" />
            <h2 className="text-[22px] font-bold text-[var(--color-text)] mb-2">Discover</h2>
            <p className="text-[var(--color-text-muted)] text-[15px] mb-8">Add Feeds to discover new recipes</p>

            <button 
              onClick={() => setIsSuggestedOpen(true)}
              className="px-8 py-3 rounded-full text-white font-semibold text-[17px] shadow-md active:scale-95"
              style={{ background: "linear-gradient(90deg,#d1b3ff,#b366ff)" }}
            >
              Suggested Feeds
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {feeds.map(item => (
              <div 
                key={item.id}
                onClick={() => navigate(`/app/discover/${item.id}`)}
                className="bg-[var(--color-card)] rounded-[28px] p-4 shadow-sm border border-[var(--color-border)] hover:shadow-md transition cursor-pointer"
              >
                {/* HEADER CARD */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-[10px] font-black text-white`}>
                    {item.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[var(--color-text)]">{item.author}</span>
                    <span className="text-[12px] text-[var(--color-text-muted)]">{item.time}</span>
                  </div>
                  <ChevronRight size={18} className="ml-auto text-[var(--color-text-muted)]" />
                </div>

                {/* IMAGE CARD */}
                <div className="relative rounded-[24px] overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-[240px] object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* TITLE: Top left */}
                  <div className="absolute top-4 left-4 text-white">
                    <h3 className="text-[20px] font-bold leading-tight drop-shadow-md">{item.title}</h3>
                  </div>

                  {/* QUICK ADD BUTTON: Bottom right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsAddOpen(true); }}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-color)] flex items-center justify-center active:scale-90 transition"
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODALS */}
      {isAddOpen && <AddRecipeModal onClose={() => setIsAddOpen(false)} />}
      {isSuggestedOpen && (
        <SuggestedFeedsModal 
          onClose={() => setIsSuggestedOpen(false)} 
          onAdd={handleAddFeed} 
          existingIds={addedIds} 
        />
      )}
    </div>
  );
}