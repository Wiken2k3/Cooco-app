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
      // Tách số và đơn vị để đồng bộ với logic Calculate
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
    <div className="min-h-screen bg-[#F2F2F7] pb-24 font-sans">
      {/* AppBar - Apple Style Glassmorphism */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl px-5 pt-14 pb-4 flex justify-between items-end">
        <h1 className="text-[34px] font-bold text-black tracking-tight leading-none">
          Groceries
        </h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E3F2FD] text-[#007AFF] active:scale-90 transition-all"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E3F2FD] text-[#007AFF] active:scale-90 transition-all">
            <MoreHorizontal size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* List Content - Mỗi item là một Card riêng biệt (Theo bản thiết kế mới) */}
      <div className="px-4 pt-6 space-y-4"> 
        {items.length > 0 ? (
          items.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setSelectedItem(item); setIsCalcOpen(true); }}
              className="flex items-center gap-4 p-4 bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-white active:scale-[0.98] active:bg-[#F9F9F9] transition-all cursor-pointer"
            >
              {/* Box xám placeholder - Bo góc 16px chuẩn iOS */}
              <div className="w-[52px] h-[52px] bg-[#F2F2F7] rounded-[16px] flex-shrink-0 flex items-center justify-center text-xl">
                
              </div>
              
              <div className="flex items-center gap-2">
                {/* Số lượng màu xanh dương */}
                <span className="text-[20px] font-bold text-[#007AFF] leading-none">
                  {item.qty}
                </span>
                {/* Tên sản phẩm */}
                <span className="text-[20px] font-bold text-black capitalize leading-none">
                  {item.name}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center opacity-40">
            <p className="text-[17px] font-medium">No items yet</p>
          </div>
        )}
      </div>

      {/* Modals */}
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