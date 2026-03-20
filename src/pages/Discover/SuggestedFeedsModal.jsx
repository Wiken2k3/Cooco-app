import { useState } from "react";
import FeedDetailModal from "./FeedDetailModal";

export default function SuggestedFeedsModal({ onClose, onAdd, existingIds }) {
  const [selectedFeed, setSelectedFeed] = useState(null);

  const feeds = [
    { id: '1', name: "Minimalist Baker", source: "minimalistbaker.com", avatar: "MB", color: "from-[#FF9500] to-[#FFCC00]" },
    { id: '2', name: "NYT Cooking", source: "nytimes.com", avatar: "NY", color: "from-[#333333] to-[#000000]" },
    { id: '3', name: "Budget Bytes", source: "budgetbytes.com", avatar: "BB", color: "from-[#34C759] to-[#30D158]" },
    { id: '4', name: "Bon Appétit", source: "bonappetit.com", avatar: "BA", color: "from-[#FF3B30] to-[#FF453A]" }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm">

      {/* overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="relative w-full h-[92%] bg-[#F2F2F7] rounded-t-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">

        {/* grabber */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[#D1D1D6] rounded-full" />

        {/* header */}
        <div className="sticky top-0 z-20 bg-[#F2F2F7]/90 backdrop-blur-md px-6 pt-10 pb-4 flex justify-between items-center">
          <h2 className="text-[34px] font-[800] text-black tracking-tight">
            Suggested
          </h2>

          <button
            onClick={onClose}
            className="text-[#0095FF] text-[17px] font-bold active:opacity-40"
          >
            Done
          </button>
        </div>

        {/* content */}
        <div className="px-4 overflow-y-auto pb-20">

          <p className="px-2 mb-3 text-[#8E8E93] text-[13px] font-bold uppercase tracking-wider">
            Recommended for you
          </p>

          <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-black/5">

            {feeds.map((f, i) => {
              const isAdded = existingIds.includes(f.id);

              return (
                <div key={f.id}>

                  <div
                    onClick={() => setSelectedFeed(f)}
                    className="flex justify-between items-center p-4 active:bg-gray-100 transition-colors cursor-pointer"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-full flex items-center justify-center text-white font-black text-lg shadow-sm`}>
                        {f.avatar}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-black">
                          {f.name}
                        </span>
                        <span className="text-[14px] text-[#8E8E93]">
                          {f.source}
                        </span>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // ❗ tránh mở modal
                        onAdd(f); // 🔥 toggle giống bản cũ
                      }}
                      className={`h-8 px-5 rounded-full font-bold text-sm transition-all flex items-center justify-center ${
                        isAdded
                          ? "bg-[#E5E5EA] text-[#8E8E93]"
                          : "bg-[#0095FF] text-white active:scale-90 shadow-md shadow-blue-500/20"
                      }`}
                    >
                      {isAdded ? "Added" : "Add"}
                    </button>

                  </div>

                  {i !== feeds.length - 1 && (
                    <div className="ml-20 border-b border-[#C6C6C8]/40" />
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* DETAIL MODAL */}
      {selectedFeed && (
        <FeedDetailModal
          feed={selectedFeed}
          onClose={() => setSelectedFeed(null)}
          onAdd={() => {
            onAdd(selectedFeed); // 🔥 vẫn toggle
          }}
          isAdded={existingIds.includes(selectedFeed.id)}
        />
      )}

    </div>
  );
}