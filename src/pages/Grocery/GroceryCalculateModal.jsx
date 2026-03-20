export default function GroceryCalculateModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="w-full max-w-[430px] bg-[var(--color-card)] rounded-t-[32px] p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-500">
        <div className="w-9 h-1.5 bg-[var(--color-border)] rounded-full mx-auto mb-6" />
        
        <h2 className="text-[22px] font-[900] text-[var(--color-text)] mb-6 text-center">Grocery Summary</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between p-4 bg-[var(--color-bg)] rounded-2xl">
            <span className="text-[var(--color-text-muted)] font-bold">Total Items</span>
            <span className="text-[var(--color-text)] font-black">12 Items</span>
          </div>
          <div className="flex justify-between p-4 bg-[var(--color-bg)] rounded-2xl">
            <span className="text-[var(--color-text-muted)] font-bold">Estimated Cost</span>
            <span className="text-[var(--color-main)] font-black">$45.50</span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-[var(--color-main)] text-white py-4 rounded-2xl font-black text-[17px] active:scale-95 transition-transform"
        >
          GOT IT
        </button>
      </div>
    </div>
  );
}