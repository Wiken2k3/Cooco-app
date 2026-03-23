import { useState } from "react";

export default function SaveModal({ feed, onClose }) {
  const [selectedFolder, setSelectedFolder] = useState("Baking");

  const folders = [
    { id: "baking", name: "Baking" },
    { id: "dessert", name: "Dessert" },
    { id: "dinner", name: "Dinner" },
    { id: "supper", name: "Supper" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-[2px] p-4" onClick={onClose}>
      <div 
        className="w-full max-w-lg bg-white rounded-[40px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onClose} className="bg-[#E0F2FE] text-[#00A3FF] px-6 py-2.5 rounded-2xl font-black text-sm active:scale-95 transition">CANCEL</button>
          <button onClick={onClose} className="bg-[#00A3FF] text-white px-8 py-2.5 rounded-2xl font-black text-sm shadow-md active:scale-95 transition">SAVE</button>
        </div>

        {/* PREVIEW */}
        <div className="flex items-center gap-4 bg-[#F8F9FA] p-4 rounded-3xl mb-8">
          <img src={feed.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="" />
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Saving recipe</p>
            <p className="text-lg font-black text-gray-800">{feed.title}</p>
          </div>
        </div>

        <h3 className="text-gray-400 font-bold px-2 mb-6 uppercase text-sm tracking-widest">Folders</h3>

        {/* FOLDER LIST */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {folders.map((f) => {
            const isActive = selectedFolder === f.name;
            return (
              <div 
                key={f.id} 
                className="flex flex-col items-center min-w-[90px] cursor-pointer"
                onClick={() => setSelectedFolder(f.name)}
              >
                {/* FOLDER ICON VISUAL */}
                <div className="relative w-20 h-16 mb-3">
                  {/* Folder Tab */}
                  <div className={`absolute -top-1.5 left-0 w-8 h-4 rounded-t-lg transition-colors ${isActive ? 'bg-[#00A3FF]' : 'bg-[#A8D9FF]'}`} />
                  {/* Folder Body */}
                  <div className={`absolute inset-0 rounded-tr-xl rounded-b-xl shadow-md transition-all ${isActive ? 'bg-[#00A3FF] scale-105' : 'bg-[#A8D9FF]'}`}>
                    {isActive && (
                      <img 
                        src={feed.image} 
                        className="w-[85%] h-[85%] mx-auto mt-1 object-cover rounded-md border-2 border-white translate-y-2 shadow-inner transition-transform" 
                        alt="" 
                      />
                    )}
                  </div>
                </div>
                <span className={`text-sm font-black transition-colors ${isActive ? 'text-[#00A3FF]' : 'text-gray-400'}`}>
                  {f.name}
                </span>
                {isActive && <span className="text-[10px] font-bold text-[#00A3FF] mt-1 italic">Selected</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}