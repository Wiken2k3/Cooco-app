import { useState } from "react";
import { Plus, Sparkles, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal";
import SuggestedFeedsModal from "./SuggestedFeedsModal";

export default function Discover() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestedOpen, setIsSuggestedOpen] = useState(false);
  const [addedIds, setAddedIds] = useState([]);
  const [feeds, setFeeds] = useState([]); // Khởi tạo mảng rỗng để hiện Empty State

  // Logic thêm bài viết khi Follow Creator
  const handleAddFeed = (creator) => {
    setAddedIds(prev => [...prev, creator.id]);
    
    // Giả lập thêm bài viết của creator đó vào Feed
    const newRecipe = { 
      id: Date.now(), 
      title: creator.id === '3' ? "Peanut Butter Chocolate Dates" : `${creator.name}'s Signature Recipe`, 
      author: creator.name, 
      time: "Just now", 
      img: creator.id === '3' 
        ? "https://www.twospoons.ca/wp-content/uploads/2021/06/chocolate-covered-stuffed-dates-with-peanut-butter-recipe-twospoons-16.jpg"
        : "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
      avatar: creator.avatar,
      color: creator.color
    };
    setFeeds(prev => [newRecipe, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] relative">
      {/* HEADER STICKY IOS STYLE */}
      <div className="sticky top-0 z-20 bg-[#F2F2F7]/85 backdrop-blur-xl px-6 pt-14 pb-4 flex justify-between items-end border-b border-[#C6C6C8]/30">
        <h1 className="text-[34px] font-[900] text-black tracking-tight leading-none">Discover</h1>
        <button 
          onClick={() => setIsSuggestedOpen(true)}
          className="text-[#0095FF] text-[17px] font-semibold active:opacity-50 transition-opacity"
        >
          Suggested
        </button>
      </div>

      <div className="p-4 pb-32">
        {feeds.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center pt-24 px-8 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-white rounded-[28px] flex items-center justify-center mb-6 shadow-sm">
              <Sparkles size={44} className="text-[#D1D1D6]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[22px] font-bold text-black mb-2 tracking-tight">Discover</h2>
            <p className="text-[#8E8E93] text-[15px] leading-relaxed mb-8">
              Add Feeds to discover new recipes
            </p>
            <button 
              onClick={() => setIsSuggestedOpen(true)}
              className="bg-[#0095FF] text-white px-8 py-3.5 rounded-full font-bold text-[17px] shadow-[0_8px_20px_rgba(0,149,255,0.3)] active:scale-95 transition-all"
            >
              Suggested Feeds
            </button>
          </div>
        ) : (
          /* FEED LIST */
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {feeds.map(item => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/app/discover/${item.id}`)}
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-[0.98] transition-all duration-200"
              >
                {/* Header Card */}
                <div className="flex items-center gap-3 p-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color || 'from-[#D1E9FF] to-[#0095FF]'} rounded-full flex items-center justify-center text-white font-black text-sm`}>
                    {item.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[15px] text-black">{item.author}</h4>
                    <p className="text-[13px] text-[#8E8E93] font-medium">{item.time}</p>
                  </div>
                  <ChevronRight size={20} className="text-[#C7C7CC]" />
                </div>

                {/* Recipe Image */}
                <div className="px-4 pb-4">
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden group">
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-5">
                      <h3 className="text-white text-[24px] font-[900] leading-[1.15] tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    {/* Nút cộng nhỏ góc phải ảnh */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#0095FF] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Plus size={24} strokeWidth={2.5}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-[60px] h-[60px] bg-[#0095FF] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(0,149,255,0.4)] z-30 active:scale-90 transition-transform"
      >
        <Plus size={32} strokeWidth={2.5} />
      </button>

      {/* Render Modals */}
      {isModalOpen && <AddRecipeModal onClose={() => setIsModalOpen(false)} />}
      
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