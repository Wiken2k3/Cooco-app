import { useState } from "react";

export default function AddRecipeModal({ onClose }) {
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!url) return;
    console.log("Add recipe from:", url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/30">

      {/* OVERLAY */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-[500px] mb-3 
        bg-[var(--color-card)] 
        rounded-[32px] 
        px-5 pt-4 pb-6
        shadow-[0_-10px_30px_rgba(0,0,0,0.12)]
        animate-slideUp
      ">

        {/* GRABBER */}
        <div className="w-10 h-1.5 bg-[var(--color-border)] rounded-full mx-auto mb-4" />

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">

          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-full text-[15px] font-semibold
            bg-[var(--color-button-bg)] 
            text-[var(--color-button-color)] 
            active:scale-95"
          >
            Cancel
          </button>

          <h3 className="text-[17px] font-bold text-[var(--color-text)]">
            Add Recipe
          </h3>

          <button 
            onClick={handleAdd}
            className="px-4 py-1.5 rounded-full text-[15px] font-semibold
            bg-[var(--color-main)] text-white 
            active:scale-95"
          >
            Add
          </button>
        </div>

        {/* INPUT */}
        <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[18px] px-4 py-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste recipe link..."
            className="w-full bg-transparent outline-none text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        {/* HINT */}
        <p className="text-[13px] text-[var(--color-text-muted)] mt-3 px-1">
          Paste a recipe URL to quickly import
        </p>

      </div>
    </div>
  );
}