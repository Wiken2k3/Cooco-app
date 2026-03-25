import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Plus, MoreVertical, 
  FolderIcon, Heart, Clock, Star, 
  ChevronRight 
} from "lucide-react";

export default function RecipeFolders() {
  const navigate = useNavigate();

  // Dữ liệu mẫu cho các Bộ sưu tập
  const collections = [
    { id: "fav", title: "Favorites", count: 12, icon: <Heart size={22} className="text-red-500" fill="currentColor" />, color: "bg-red-50" },
    { id: "recent", title: "Recently Added", count: 45, icon: <Clock size={22} className="text-blue-500" />, color: "bg-blue-50" },
    { id: "best", title: "Best Rated", count: 8, icon: <Star size={22} className="text-yellow-500" fill="currentColor" />, color: "bg-yellow-50" },
  ];

  const customFolders = [
    { id: "1", title: "Healthy Breakfast", count: 15, image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400" },
    { id: "2", title: "Italian Dinner", count: 24, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" },
    { id: "3", title: "Quick Desserts", count: 9, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400" },
    { id: "4", title: "Meal Prep 2024", count: 31, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-32">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl px-6 pt-14 pb-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/app/recipes')}
          className="flex items-center gap-1 text-[var(--color-main)] font-bold transition active:scale-95"
        >
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
        <h1 className="text-[17px] font-black text-[var(--color-text)] absolute left-1/2 -translate-x-1/2">
          Collections
        </h1>
        <button className="w-10 h-10 rounded-full bg-[var(--color-button-bg)] flex items-center justify-center text-[var(--color-main)] active:scale-90 transition">
          <Plus size={22} strokeWidth={3} />
        </button>
      </header>

      <main className="px-6 mt-4">
        {/* SMART COLLECTIONS */}
        <section className="space-y-3 mb-10">
          {collections.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[22px] active:scale-[0.98] transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} dark:bg-white/5 rounded-2xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-[17px] text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-[13px] font-medium text-[var(--color-text-muted)]">{item.count} recipes</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
        </section>

        {/* CUSTOM FOLDERS GRID */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[22px] font-[900] text-[var(--color-text)]">My Folders</h2>
            <button className="text-[var(--color-main)] font-bold text-sm">Edit</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {customFolders.map((folder) => (
              <div key={folder.id} className="group cursor-pointer" onClick={() => navigate(`/app/recipes`)}>
                <div className="aspect-square relative rounded-[28px] overflow-hidden mb-3 shadow-sm border border-[var(--color-border)]">
                  <img 
                    src={folder.image} 
                    alt={folder.title} 
                    className="w-full h-full object-cover group-active:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-active:bg-black/20" />
                  
                  {/* Folder Icon Overlay */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-text)]">
                    <FolderIcon size={14} fill="currentColor" />
                  </div>
                </div>
                <h3 className="font-black text-[15px] text-[var(--color-text)] px-1 leading-tight">{folder.title}</h3>
                <p className="text-[12px] font-bold text-[var(--color-text-muted)] px-1 uppercase tracking-wider">{folder.count} Items</p>
              </div>
            ))}

            {/* CREATE NEW FOLDER CARD */}
            <div className="aspect-square border-2 border-dashed border-[var(--color-border)] rounded-[28px] flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)] active:bg-gray-50 dark:active:bg-white/5 transition">
              <Plus size={32} strokeWidth={1} />
              <span className="text-[13px] font-bold uppercase tracking-tight">New Folder</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}