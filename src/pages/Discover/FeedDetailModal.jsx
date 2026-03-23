import { X, Check, ExternalLink } from "lucide-react";

export default function FeedDetailModal({ feed, onClose, onAdd, isAdded }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Overlay: Nhấn ra ngoài để đóng */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Card */}
      <div className="relative w-full max-w-[340px] bg-[var(--color-bg)] rounded-[40px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">

        {/* Banner Section */}
        <div className={`h-40 bg-gradient-to-br ${feed.color} flex flex-col items-center justify-center relative`}>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* Avatar với hiệu ứng Ring và Glow */}
          <div className="relative group">
             <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-500" />
             <div className="relative w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full border-[3px] border-white/40 flex items-center justify-center text-white text-4xl font-[900] shadow-2xl">
               {feed.avatar}
             </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-8 pt-6 text-center bg-[var(--color-card)]">
          <div className="flex items-center justify-center gap-2 mb-1">
             <h3 className="text-[26px] font-[900] tracking-tight text-[var(--color-text)]">
               {feed.name}
             </h3>
             {/* Icon tích xanh giả định cho creator xịn */}
             <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={12} strokeWidth={4} className="text-white" />
             </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[var(--color-text-muted)] text-[14px] font-medium mb-8">
            <span>{feed.source}</span>
            <ExternalLink size={14} className="opacity-50" />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                if (!isAdded) onAdd(feed);
                onClose(); // Đóng modal sau khi add
              }}
              disabled={isAdded}
              className={`
                w-full py-4 rounded-[22px] font-extrabold text-[16px] transition-all active:scale-95 flex items-center justify-center gap-2
                ${isAdded
                  ? "bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed"
                  : "bg-[var(--color-main)] text-white shadow-[0_8px_20px_rgba(var(--color-main-rgb),0.3)] hover:brightness-110"
                }
              `}
            >
              {isAdded ? (
                <> <Check size={18} strokeWidth={3} /> Subscribed </>
              ) : (
                "Follow Creator"
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 text-[var(--color-text-muted)] font-bold text-[14px] hover:text-[var(--color-text)] transition-colors active:opacity-50"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="h-2 bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent opacity-20" />
      </div>
    </div>
  );
}