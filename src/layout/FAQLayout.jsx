import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function FAQLayout({ 
  children, 
  step, 
  canNext = true,
  onNext
}) {
  const navigate = useNavigate();

  // progress chia 2 thanh (giữ style cũ)
  const progress1 = Math.min((step / 2) * 100, 100);
  const progress2 = step > 2 ? ((step - 2) / 3) * 100 : 0;

  // ✅ handle click an toàn tuyệt đối
  const handleNext = () => {
    if (!canNext) return; // ❗ chặn cứng logic
    onNext?.();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-[430px] mx-auto shadow-2xl">
      <div className="p-6 flex flex-col flex-1">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          
          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded-full active:scale-95 transition"
          >
            <ChevronLeft size={28} className="text-gray-400" />
          </button>

          {/* PROGRESS */}
          <div className="flex-1 flex gap-2">
            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0095ff] transition-all duration-500"
                style={{ width: `${progress1}%` }}
              />
            </div>

            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0095ff] transition-all duration-500"
                style={{ width: `${progress2}%` }}
              />
            </div>
          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* NEXT BUTTON (GLOBAL) */}
        <Button
          onClick={handleNext}
          disabled={!canNext}
          className={`mt-4 rounded-xl h-14 text-lg font-bold transition-all ${
            canNext
              ? "bg-[#0095ff] text-white shadow-lg active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Next
        </Button>

      </div>
    </div>
  );
}