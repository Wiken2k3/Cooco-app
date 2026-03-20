import { X, Bookmark, Share2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DiscoverDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-28">
      {/* Header Image */}
      <div className="relative h-[420px]">
        <img
          src="https://www.twospoons.ca/wp-content/uploads/2021/06/chocolate-covered-stuffed-dates-with-peanut-butter-recipe-twospoons-16.jpg"
          className="w-full h-full object-cover"
          alt="Recipe"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Nút Top */}
        <div className="absolute top-14 left-6 right-6 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-all"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
          <button className="w-10 h-10 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-all">
            <Share2 size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Nội dung chi tiết - Nổi lên trên ảnh */}
      <div className="px-6 -mt-10 bg-white rounded-t-[36px] relative z-10 pt-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 pr-4">
            <h1 className="text-[32px] font-[900] text-black leading-[1.1] mb-3 tracking-tight">
              Peanut Butter Chocolate Dates
            </h1>
            <div className="flex items-center gap-3 text-[#8E8E93] font-bold text-[13px] uppercase tracking-wider">
              <span>Budget Bytes</span>
              <div className="w-1 h-1 bg-[#C7C7CC] rounded-full" />
              <div className="flex items-center gap-1.5">
                <Clock size={14} strokeWidth={2.5} /> 15 MINS
              </div>
            </div>
          </div>

          <button className="flex flex-col items-center bg-[#F2F2F7] p-3 rounded-[20px] active:bg-[#E5E5EA] transition-colors min-w-[64px]">
            <Bookmark size={24} className="text-[#0095FF] fill-[#0095FF]" />
            <span className="text-[10px] font-black text-[#0095FF] mt-1.5 uppercase">Save</span>
          </button>
        </div>

        {/* Ingredients Section */}
        <div>
          <h3 className="text-[22px] font-[900] text-black mb-5 tracking-tight">Ingredients</h3>
          <div className="space-y-3">
            {["12 dates", "1/2 cup peanut butter", "Dark chocolate chips"].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#F2F2F7] rounded-[20px]">
                <div className="w-6 h-6 rounded-full border-[2.5px] border-[#0095FF] flex items-center justify-center" />
                <span className="text-[17px] font-semibold text-[#1C1C1E]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-[#E5E5EA] flex justify-center z-50">
        <button
          onClick={() => navigate("steps/1")}
          className="w-full max-w-[430px] bg-[#0095FF] text-white py-4 rounded-2xl text-[17px] font-[900] shadow-[0_8px_20px_rgba(0,149,255,0.3)] active:scale-95 transition-transform tracking-wide"
        >
          START COOKING
        </button>
      </div>
    </div>
  );
}