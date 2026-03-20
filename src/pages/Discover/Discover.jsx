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
  const [feeds, setFeeds] = useState([]);

  const handleAddFeed = (creator) => {
    setAddedIds(prev => [...prev, creator.id]);

    const newRecipe = { 
      id: Date.now(), 
      title: creator.id === '3' 
        ? "Peanut Butter Chocolate Dates" 
        : `${creator.name}'s Signature Recipe`,
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
    <div className="min-h-screen bg-[var(--color-bg)] transition-colors">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[var(--color-bg)]/85 backdrop-blur-xl px-6 pt-14 pb-4 flex justify-between items-end border-b border-[var(--color-border)]">
        <h1 className="text-[34px] font-[900] text-[var(--color-text)] tracking-tight">
          Discover
        </h1>

        <button 
          onClick={() => setIsSuggestedOpen(true)}
          className="text-[var(--color-main)] text-[17px] font-semibold active:opacity-50"
        >
          Suggested
        </button>
      </div>

      <div className="p-4 pb-32">

        {feeds.length === 0 ? (
          /* EMPTY */
          <div className="flex flex-col items-center justify-center pt-24 px-8 text-center">

            <div className="w-24 h-24 bg-[var(--color-card)] rounded-[28px] flex items-center justify-center mb-6 shadow-sm border border-[var(--color-border)]">
              <Sparkles size={44} className="text-[var(--color-text-muted)]" />
            </div>

            <h2 className="text-[22px] font-bold text-[var(--color-text)] mb-2">
              Discover
            </h2>

            <p className="text-[var(--color-text-muted)] text-[15px] mb-8">
              Add Feeds to discover new recipes
            </p>

            <button 
              onClick={() => setIsSuggestedOpen(true)}
              className="bg-[var(--color-main)] text-white px-8 py-3.5 rounded-full font-bold text-[17px] shadow-md active:scale-95"
            >
              Suggested Feeds
            </button>
          </div>
        ) : (

          /* FEED */
          <div className="space-y-5">
            {feeds.map(item => (
              <div 
                key={item.id}
                onClick={() => navigate(`/app/discover/${item.id}`)}
                className="bg-[var(--color-card)] rounded-[32px] overflow-hidden shadow-sm border border-[var(--color-border)] active:scale-[0.98] transition"
              >

                {/* HEADER */}
                <div className="flex items-center gap-3 p-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-black text-sm`}>
                    {item.avatar}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-[15px] text-[var(--color-text)]">
                      {item.author}
                    </h4>
                    <p className="text-[13px] text-[var(--color-text-muted)]">
                      {item.time}
                    </p>
                  </div>

                  <ChevronRight size={20} className="text-[var(--color-text-muted)]" />
                </div>

                {/* IMAGE */}
                <div className="px-4 pb-4">
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden group">
                    
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                      <h3 className="text-white text-[24px] font-[900]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-[var(--color-main)] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Plus size={24}/>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-[60px] h-[60px] bg-[var(--color-main)] text-white rounded-full flex items-center justify-center shadow-lg z-30 active:scale-90"
      >
        <Plus size={32} />
      </button>

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