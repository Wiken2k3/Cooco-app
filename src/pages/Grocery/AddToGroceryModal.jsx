import { useState, useMemo } from "react";
import { X, Check } from "lucide-react";

const INITIAL_ITEMS = [
  { id: 1, name: "Salt", qty: "1/2tsp", price: "$0.01" },
  { id: 2, name: "Sugar", qty: "1tbsp", price: "$0.05" },
  { id: 3, name: "Pepper", qty: "1/4tsp", price: "$0.02" },
  { id: 4, name: "Olive Oil", qty: "2tbsp", price: "$0.20" },
  { id: 5, name: "Garlic", qty: "2cloves", price: "$0.10" },
  { id: 6, name: "Onion", qty: "1pc", price: "$0.30" },
  { id: 7, name: "Paprika", qty: "1tsp", price: "$0.05" },
  { id: 8, name: "Cumin", qty: "1/2tsp", price: "$0.04" },
  { id: 9, name: "Thyme", qty: "3sprigs", price: "$0.15" },
  { id: 10, name: "Butter", qty: "50g", price: "$0.50" },
  { id: 11, name: "Flour", qty: "200g", price: "$0.25" },
];

export default function AddToGroceryModal({ onClose, onAdd }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selected, setSelected] = useState(INITIAL_ITEMS.map(i => i.id));

  const selectedObjects = useMemo(() => 
    items.filter(item => selected.includes(item.id)), 
    [items, selected]
  );

  const toggleSelect = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const removeItem = (e, id) => {
    e.stopPropagation();
    setItems(prev => prev.filter(item => item.id !== id));
    setSelected(prev => prev.filter(x => x !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="w-full bg-[#F2F2F7] rounded-t-[40px] h-[92vh] flex flex-col relative shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-gray-100 z-50">
          <button onClick={onClose} className="text-[#007AFF] text-[17px] font-semibold active:opacity-40">
            Cancel
          </button>
          <h2 className="text-[17px] font-bold text-black">Add to Groceries</h2>
          <div className="w-12" />
        </div>

        {/* List Content - Cuộn được phía dưới các nút */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-44 no-scrollbar">
          <div className="space-y-3">
            {items.map((item) => {
              const isSelected = selected.includes(item.id);
              return (
                <div 
                  key={item.id} 
                  onClick={() => toggleSelect(item.id)} 
                  className="flex items-center bg-white rounded-[22px] p-4 active:scale-[0.98] transition-all cursor-pointer shadow-sm border border-white"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#007AFF]' : 'border-2 border-gray-200'
                  }`}>
                    {isSelected && <Check size={16} className="text-white stroke-[4]" />}
                  </div>

                   <div className="flex flex-1 items-center gap-1.5 ml-4">

                  <span className="text-[18px] font-bold text-[#007AFF]">{item.qty}</span>

                  <span className="text-[18px] font-bold text-black">{item.name}</span>

                  <span className="text-[18px] text-gray-400 font-medium">({item.price})</span>

                </div>

                   <button 
                    onClick={(e) => removeItem(e, item.id)}
                    className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center active:scale-90 text-gray-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2 Nút bấm nổi hoàn toàn đè lên danh sách */}
        <div className="absolute bottom-10 left-0 right-0 px-6 z-50 flex gap-3 pointer-events-none">
          <button 
            onClick={() => setSelected([])} 
            className="flex-1 pointer-events-auto py-4 bg-white/95 backdrop-blur-md text-[#007AFF] rounded-[24px] font-bold text-[17px] active:scale-95 transition-all shadow-xl border border-white/20"
          >
            Deselect All
          </button>
          
          <button 
            onClick={() => onAdd(selectedObjects)} 
            disabled={selected.length === 0}
            className={`flex-[1.5] pointer-events-auto py-4 rounded-[24px] font-bold text-[17px] transition-all active:scale-95 shadow-xl ${
              selected.length > 0 
              ? 'bg-[#007AFF] text-white' 
              : 'bg-gray-300 text-gray-500 opacity-80'
            }`}
          >
            Add {selected.length} Items
          </button>
        </div>

      </div>
    </div>
  );
}