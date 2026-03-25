import { useState, useEffect } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import GroceryCalculateModal from "./GroceryCalculateModal";
import AddToGroceryModal from "./AddToGroceryModal";

export default function Grocery() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("grocery-items");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Carrot", qty: "20", unit: "Item", checked: false }
    ];
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("grocery-items", JSON.stringify(items));
  }, [items]);

  const handleAddItems = (newItemsFromModal) => {
    const formattedItems = newItemsFromModal.map(item => ({
      id: Date.now() + Math.random(),
      name: item.name,
      qty: item.qty.replace(/[^\d./]/g, '') || "1",
      unit: item.qty.replace(/[\d./]/g, '') || "Item",
      checked: false
    }));
    setItems(prev => [...prev, ...formattedItems]);
    setIsAddOpen(false);
  };

  const handleUpdateItem = (newQty, newUnit) => {
    setItems(prev => prev.map(i => 
      i.id === selectedItem.id ? { ...i, qty: newQty, unit: newUnit } : i
    ));
    setIsCalcOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24 font-sans transition-colors">

      {/* HEADER đồng bộ */}
      <div className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-6 pt-14 pb-4 flex justify-between items-end">
        
        <h1 className="text-[34px] font-extrabold text-[var(--color-text)] tracking-tight">
          Groceries
        </h1>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full 
            bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] 
            text-[var(--color-button-color)] transition active:scale-95"
          >
            <Plus size={20} />
          </button>

          <button 
            className="w-9 h-9 flex items-center justify-center rounded-full 
            bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] 
            text-[var(--color-button-color)] transition active:scale-95"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="px-4 pt-6 space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setSelectedItem(item); setIsCalcOpen(true); }}
              className="flex items-center gap-4 p-4 
              bg-[var(--color-card)] 
              rounded-[24px] 
              shadow-[var(--shadow-sm)] 
              border border-[var(--color-border)] 
              active:scale-[0.98] 
              transition-all cursor-pointer"
            >
              <div className="w-[52px] h-[52px] bg-[var(--color-bg)] rounded-[16px] flex-shrink-0 flex items-center justify-center text-xl border border-[var(--color-border)]" />

              <div className="flex items-center gap-2">
                <span className="text-[20px] font-bold text-[#007AFF] leading-none">
                  {item.qty}
                </span>
                <span className="text-[20px] font-bold text-[var(--color-text)] capitalize leading-none">
                  {item.name}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center opacity-40">
            <p className="text-[17px] font-medium text-[var(--color-text-muted)]">
              No items yet
            </p>
          </div>
        )}
      </div>

      {/* MODALS */}
      {isAddOpen && (
        <AddToGroceryModal 
          onClose={() => setIsAddOpen(false)} 
          onAdd={handleAddItems} 
        />
      )}
      
      {isCalcOpen && (
        <GroceryCalculateModal 
          item={selectedItem} 
          onClose={() => setIsCalcOpen(false)} 
          onSave={handleUpdateItem} 
        />
      )}
    </div>
  );
}