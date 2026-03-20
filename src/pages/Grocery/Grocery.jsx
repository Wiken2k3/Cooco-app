import { useState } from "react";
import { Plus, MoreHorizontal, CheckCircle2, Circle } from "lucide-react";
import GroceryCalculateModal from "./GroceryCalculateModal";
import AddToGroceryModal from "./AddToGroceryModal";

const groceryData = [
  { category: "Produce", items: [{ id: 1, name: "Avocado", qty: "2 pcs", checked: false }, { id: 2, name: "Spinach", qty: "1 bag", checked: true }] },
  { category: "Dairy", items: [{ id: 3, name: "Greek Yogurt", qty: "500g", checked: false }] },
];

export default function Grocery() {
  const [items, setItems] = useState(groceryData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const toggleItem = (catIdx, itemIdx) => {
    const newItems = [...items];
    newItems[catIdx].items[itemIdx].checked = !newItems[catIdx].items[itemIdx].checked;
    setItems(newItems);
  };

  return (
    <div className="min-h-full pb-32 bg-[var(--color-bg)] transition-colors duration-300">
      {/* AppBar */}
      <div className="sticky top-0 z-40 bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-[var(--color-border)] px-6 pt-14 pb-4 flex justify-between items-end">
        <h1 className="text-[34px] font-[900] text-[var(--color-text)] tracking-tight leading-none">Groceries</h1>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsCalcOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-button-bg)] text-[var(--color-button-color)] active:scale-90 transition-all"
          >
            <MoreHorizontal size={22} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-main)] text-white shadow-lg shadow-blue-500/30 active:scale-90 transition-all"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Grocery List Content */}
      <div className="p-5 space-y-8">
        {items.map((section, catIdx) => (
          <div key={section.category} className="animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-[13px] font-black text-[var(--color-text-muted)] uppercase tracking-widest mb-3 ml-1">
              {section.category}
            </h3>
            <div className="bg-[var(--color-card)] rounded-[24px] overflow-hidden shadow-sm border border-[var(--color-border)]">
              {section.items.map((item, itemIdx) => (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(catIdx, itemIdx)}
                  className={`flex items-center justify-between p-4 active:bg-[var(--color-bg)] transition-colors ${itemIdx !== section.items.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {item.checked ? (
                      <CheckCircle2 size={24} className="text-[var(--color-main)] fill-[var(--color-main)]/10" />
                    ) : (
                      <Circle size={24} className="text-[var(--color-border)]" />
                    )}
                    <span className={`text-[17px] font-bold ${item.checked ? 'text-[var(--color-text-muted)] line-through' : 'text-[var(--color-text)]'}`}>
                      {item.name}
                    </span>
                  </div>
                  <span className="text-[15px] font-semibold text-[var(--color-text-muted)]">{item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isAddOpen && <AddToGroceryModal onClose={() => setIsAddOpen(false)} />}
      {isCalcOpen && <GroceryCalculateModal onClose={() => setIsCalcOpen(false)} />}
    </div>
  );
}