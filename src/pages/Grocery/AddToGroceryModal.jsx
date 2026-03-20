import { X } from "lucide-react";

export default function AddToGroceryModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-[360px] bg-[var(--color-card)] rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[24px] font-[900] text-[var(--color-text)] tracking-tight">Quick Add</h2>
          <button onClick={onClose} className="text-[var(--color-text-muted)]"><X /></button>
        </div>

        <div className="space-y-5 mb-8">
          <div className="bg-[var(--color-bg)] rounded-[20px] p-4">
            <label className="text-[11px] font-black text-[var(--color-text-muted)] uppercase mb-1 block">Item Name</label>
            <input type="text" placeholder="e.g. Milk" className="w-full bg-transparent border-none outline-none text-[17px] text-[var(--color-text)] font-bold" />
          </div>
          <div className="bg-[var(--color-bg)] rounded-[20px] p-4">
            <label className="text-[11px] font-black text-[var(--color-text-muted)] uppercase mb-1 block">Quantity</label>
            <input type="text" placeholder="e.g. 2 cartons" className="w-full bg-transparent border-none outline-none text-[17px] text-[var(--color-text)] font-bold" />
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-[var(--color-main)] text-white py-4 rounded-[22px] font-black text-[17px] shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          ADD TO LIST
        </button>
      </div>
    </div>
  );
}