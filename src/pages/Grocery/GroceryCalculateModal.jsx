import { useState } from "react";
import { Plus } from "lucide-react";

export default function GroceryCalculateModal({ item, onClose, onSave }) {
  const [value, setValue] = useState(item?.qty?.toString() || "20");
  const [unit, setUnit] = useState(item?.unit || "Item");

  const units = ["Item", "Tablespoon", "Teespoon", "Cup", "Mills"];
  const fractions = ["1/4", "1/3", "1/2", "2/3", "3/4"];

  const handleNumberPress = (num) => {
    setValue((prev) => {
      if (prev === "0" && num !== ",") return num;
      if (num === "," && prev.includes(",")) return prev;
      return prev + num;
    });
  };

  const handleDelete = () => {
    setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/5 backdrop-blur-[1px] flex items-end">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="w-full bg-white rounded-t-[40px] p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative animate-in slide-in-from-bottom duration-300">
        
        {/* Header: Save & Plus at Top Corners */}
        <div className="flex justify-between items-start w-full mb-1">
          <button 
            onClick={() => onSave(value, unit)}
            className="px-5 py-2 bg-[#D1EFF8] text-[#019AF5] rounded-2xl font-bold text-[16px] active:opacity-70"
          >
            Save
          </button>

          <button className="w-10 h-10 bg-[#C0EEE3] text-[#00CD86] rounded-full flex items-center justify-center active:scale-90">
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Display: Đã hạ size chữ xuống để hài hòa hơn */}
        <div className="flex flex-col items-center mb-5">
          <span className="text-[36px] font-bold text-[#019AF5] leading-none tracking-tight">
            {value}
          </span>
          <span className="text-[22px] font-bold text-[#000000] mt-1">
            {item?.name || "Carrot"}
          </span>
        </div>

        {/* Units - Tabs ngang */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {units.map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-4 py-2 rounded-[14px] font-bold text-[14px] whitespace-nowrap transition-colors ${
                unit === u ? "bg-[#019AF5] text-white" : "bg-[#D1EFF8] text-[#019AF5]"
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        {/* Fractions - Small buttons */}
        <div className="grid grid-cols-5 gap-2 mb-3">
          {fractions.map((f) => (
            <button
              key={f}
              onClick={() => setValue(f)}
              className="py-2.5 bg-[#EFDFF6] text-[#C662EC] rounded-xl font-bold text-[14px] active:opacity-70"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Main Keypad - Font chữ phím bấm gọn gàng */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => handleNumberPress(n.toString())} className="py-3.5 bg-[#C0EEE3] text-[#00CD86] rounded-2xl font-bold text-[20px] active:opacity-70">
              {n}
            </button>
          ))}
          <button className="py-3.5 bg-[#D1EFF8] text-[#019AF5] rounded-2xl font-bold text-[20px]">/</button>

          {[4, 5, 6].map(n => (
            <button key={n} onClick={() => handleNumberPress(n.toString())} className="py-3.5 bg-[#C0EEE3] text-[#00CD86] rounded-2xl font-bold text-[20px]">
              {n}
            </button>
          ))}
          <button className="py-3.5 bg-[#D1EFF8] text-[#019AF5] rounded-2xl font-bold text-[20px]">-</button>

          {[7, 8, 9].map(n => (
            <button key={n} onClick={() => handleNumberPress(n.toString())} className="py-3.5 bg-[#C0EEE3] text-[#00CD86] rounded-2xl font-bold text-[20px]">
              {n}
            </button>
          ))}
          <button onClick={() => handleNumberPress(",")} className="py-3.5 bg-[#D1EFF8] text-[#019AF5] rounded-2xl font-bold text-[20px]">,</button>

          <button 
            onClick={() => handleNumberPress("0")}
            className="col-span-2 py-3.5 bg-[#C0EEE3] text-[#00CD86] rounded-2xl font-bold text-[20px]"
          >
            0
          </button>
          <button 
            onClick={handleDelete}
            className="col-span-2 py-3.5 bg-[#F7DEDD] text-[#FF685E] rounded-2xl font-bold text-[16px] lowercase active:opacity-70"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}