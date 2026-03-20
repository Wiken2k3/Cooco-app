import { X } from "lucide-react";

export default function FeedDetailModal({ feed, onClose, onAdd, isAdded }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-[340px] bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Banner */}
        <div className={`h-36 bg-gradient-to-br ${feed.color} flex items-center justify-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-black/10 hover:bg-black/20 text-white rounded-full p-1.5 transition-colors"
          >
            <X size={20} strokeWidth={2.5}/>
          </button>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border-[3px] border-white/40 flex items-center justify-center text-white text-3xl font-[900] shadow-xl">
            {feed.avatar}
          </div>
        </div>

        <div className="p-8 text-center">
          <h3 className="text-[26px] font-[900] text-black mb-1 tracking-tight">{feed.name}</h3>
          <p className="text-[#8E8E93] font-medium mb-8">{feed.source}</p>

          <div className="space-y-3">
            <button
              onClick={onAdd}
              disabled={isAdded}
              className={`w-full py-4 rounded-[20px] font-black text-[17px] transition-all active:scale-95 ${
                isAdded 
                  ? "bg-[#F2F2F7] text-[#8E8E93]" 
                  : "bg-[#0095FF] text-white shadow-lg shadow-blue-500/25"
              }`}
            >
              {isAdded ? "Already Added" : "Follow Creator"}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-[#8E8E93] font-bold text-[15px] active:opacity-50"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}