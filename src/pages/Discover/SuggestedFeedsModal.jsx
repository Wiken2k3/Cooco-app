import { useState } from "react";
import FeedDetailModal from "./FeedDetailModal";

export default function SuggestedFeedsModal({ onClose, onAdd, existingIds }) {
  const [selectedFeed, setSelectedFeed] = useState(null);

  // ✅ DANH SÁCH ĐÃ CHỈNH SỬA: Khớp hoàn toàn với ID và Branding của discoverFeeds.js
  const feeds = [
    { 
      id: "3", 
      name: "Budget Bytes", 
      source: "budgetbytes.com", 
      avatar: "BB", 
      color: "from-[#34C759] to-[#30D158]" 
    },
    { 
      id: "1", 
      name: "Minimalist Baker", 
      source: "minimalistbaker.com", 
      avatar: "MB", 
      color: "from-[#FF9500] to-[#FFCC00]" 
    },
    { 
      id: "2", 
      name: "NYT Cooking", 
      source: "nytimes.com", 
      avatar: "NY", 
      color: "from-[#333333] to-[#000000]" 
    },
    { 
      id: "4", 
      name: "Bon Appétit", 
      source: "bonappetit.com", 
      avatar: "BA", 
      color: "from-[#FF3B30] to-[#FF453A]" 
    }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Overlay: Nhấn ra ngoài để đóng */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="relative w-full h-[92%] bg-[var(--color-bg)] rounded-t-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out">
        
        {/* Grabber: Thanh kéo nhỏ phía trên cho giống cảm giác Mobile App */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[var(--color-border)] opacity-50 rounded-full z-30" />

        {/* Header: Sticky */}
        <div className="sticky top-0 z-20 bg-[var(--color-bg)]/95 backdrop-blur-md px-6 pt-10 pb-4 flex justify-between items-center border-b border-[var(--color-border)]">
          <h2 className="text-[32px] font-[900] tracking-tight text-[var(--color-text)]">
            Suggested
          </h2>

          <button
            onClick={onClose}
            className="text-[var(--color-main)] text-[17px] font-bold active:scale-90 transition-transform"
          >
            Done
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 overflow-y-auto h-full pb-32 pt-4">
          
          <p className="px-2 mb-4 text-[var(--color-text-muted)] text-[12px] font-[800] uppercase tracking-[0.05em]">
            Recommended for you
          </p>

          {/* List Container */}
          <div className="bg-[var(--color-card)] rounded-[24px] overflow-hidden border border-[var(--color-border)] shadow-sm">
            
            {feeds.map((f, i) => {
              // ✅ Tối ưu so sánh ID: Đảm bảo string vs string để tránh lỗi logic
              const isAdded = existingIds.some(id => String(id) === String(f.id));

              return (
                <div key={f.id}>
                  <div
                    onClick={() => setSelectedFeed(f)}
                    className="flex justify-between items-center p-4 hover:bg-black/[0.02] active:bg-black/[0.05] transition-colors cursor-pointer group"
                  >
                    {/* LEFT: Avatar & Info */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-full flex items-center justify-center text-white font-black text-[15px] shadow-sm transform group-active:scale-95 transition-transform`}>
                        {f.avatar}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-[var(--color-text)] leading-tight">
                          {f.name}
                        </span>
                        <span className="text-[13px] text-[var(--color-text-muted)] mt-0.5">
                          {f.source}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT: Add/Added Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        if (!isAdded) onAdd(f);
                      }}
                      className={`
                        h-9 px-5 rounded-full font-bold text-[14px] transition-all duration-200
                        ${isAdded
                          ? "bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-default"
                          : "bg-[#00A3FF] text-white active:scale-90 shadow-md"
                        }
                      `}
                    >
                      {isAdded ? "Added" : "Add"}
                    </button>
                  </div>

                  {/* Separator Line */}
                  {i !== feeds.length - 1 && (
                    <div className="ml-[76px] border-b border-[var(--color-border)] opacity-60" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 px-2 text-center">
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Discover professional recipe creators and follow <br/> them to stay inspired.
            </p>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL: Hiển thị khi click vào hàng */}
      {selectedFeed && (
        <FeedDetailModal
          feed={selectedFeed}
          onClose={() => setSelectedFeed(null)}
          onAdd={() => {
            onAdd(selectedFeed);
            // Optional: Close detail after adding
            // setSelectedFeed(null); 
          }}
          isAdded={existingIds.some(id => String(id) === String(selectedFeed.id))}
        />
      )}
    </div>
  );
}