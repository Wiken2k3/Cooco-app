export default function AddRecipeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="w-full max-w-[430px] bg-white rounded-t-[32px] p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-500 ease-out">
        {/* iOS Grabber */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-1.5 bg-[#D1D1D6] rounded-full" />

        <div className="flex justify-between items-center mb-10 mt-2">
          <button onClick={onClose} className="text-[#0095FF] text-[17px] font-medium active:opacity-40">Cancel</button>
          <h3 className="text-[17px] font-extrabold text-black">Add Recipe</h3>
          <button className="text-[#D1D1D6] text-[17px] font-bold">Add</button>
        </div>
        
        <div className="bg-[#F2F2F7] rounded-[20px] p-4 mb-8 border border-black/5">
          <label className="text-[11px] text-[#8E8E93] block mb-1.5 uppercase font-black tracking-widest ml-1">
            Recipe URL
          </label>
          <input 
            autoFocus
            type="text" 
            placeholder="https://cooking.nytimes.com/..."
            className="w-full bg-transparent border-none outline-none text-[17px] text-black placeholder:text-[#C7C7CC] font-medium px-1"
          />
        </div>

        {/* Padding cho bàn phím ảo */}
        <div className="h-12" />
      </div>
    </div>
  ); 
}