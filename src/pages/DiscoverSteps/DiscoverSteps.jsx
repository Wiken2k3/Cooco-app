import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, List, EyeOff, History, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { discoverFeeds } from "../../data/discoverFeeds";

export default function DiscoverSteps() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const feed = discoverFeeds.find((f) => String(f.id) === String(id));

  // Redirect nếu không tìm thấy feed
  useEffect(() => {
    if (!feed) navigate("/app/discover");
  }, [feed, navigate]);

  if (!feed) return null;

  const steps = feed.steps || [];
  const totalSteps = steps.length;

  // Hàm để highlight các từ quan trọng (Sử dụng biến màu hệ thống)
  const formatStepText = (text) => {
    const highlights = [
      "dates", "pitted", "Medjool date", "chunky peanut butter", 
      "walnuts", "ground cinnamon", "sea salt", "quick rolled oats", 
      "honey", "dark chocolate chips"
    ];

    let formattedText = text;
    highlights.forEach((word) => {
      // Thêm \b để nhận diện chính xác từ (Word Boundary)
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      // Sử dụng class màu biến thay vì hardcode #00A3FF
      formattedText = formattedText.replace(
        regex, 
        `<span class="text-[var(--color-main)] font-black">$1</span>`
      );
    });

    return (
      <p 
        className="text-[32px] font-[700] leading-[1.3] text-[var(--color-text)] transition-colors duration-300"
        dangerouslySetInnerHTML={{ __html: formattedText }} 
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] z-[9999] flex flex-col px-6 pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] overflow-hidden transition-colors duration-300">
      
      {/* HEADER ACTIONS */}
      <header className="h-[60px] flex justify-between items-center mt-2">
        <button
          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] active:scale-90 transition-all"
          onClick={() => navigate(-1)}
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <div className="flex gap-4">
          <HeaderIconBtn icon={<List size={26} />} />
          <HeaderIconBtn icon={<EyeOff size={26} />} />
          <HeaderIconBtn icon={<History size={26} />} />
          <HeaderIconBtn icon={<Plus size={26} />} />
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 flex flex-col justify-center mb-24">
        <div className="text-[24px] text-[var(--color-text-muted)] font-bold mb-4 tracking-tight">
          Step {currentStep + 1}
        </div>

        <div className="min-h-[200px]">
          {steps.length > 0 ? formatStepText(steps[currentStep]) : <p className="text-[var(--color-text-muted)]">No steps available.</p>}
        </div>
      </main>

      {/* NAVIGATION FOOTER */}
      <footer className="h-[140px] relative flex flex-col items-center justify-center">
        
        {/* Previous Button */}
        {currentStep > 0 && (
          <button
            className="absolute left-0 w-[72px] h-[72px] bg-[var(--color-main)] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(var(--color-main-rgb,0,163,255),0.3)] hover:brightness-110 active:scale-90 transition-all"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <ArrowLeft size={36} color="white" strokeWidth={3} />
          </button>
        )}

        {/* Next Button */}
        {currentStep < totalSteps - 1 && (
          <button
            className="absolute right-0 w-[72px] h-[72px] bg-[var(--color-main)] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(var(--color-main-rgb,0,163,255),0.3)] hover:brightness-110 active:scale-90 transition-all"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            <ArrowRight size={36} color="white" strokeWidth={3} />
          </button>
        )}

        {/* Finish Button (Xuất hiện ở bước cuối) */}
        {currentStep === totalSteps - 1 && (
          <button
            className="absolute right-0 px-8 h-[72px] bg-[#34C759] text-white font-black text-xl rounded-full shadow-[0_8px_20px_rgba(52,199,89,0.3)] hover:brightness-105 active:scale-90 transition-all"
            onClick={() => navigate(-1)}
          >
            FINISH
          </button>
        )}

        {/* Pagination Dots */}
        <div className="flex gap-2.5 absolute bottom-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? "w-6 bg-[var(--color-main)]" 
                  : "w-2.5 bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

// Sub-component cho các nút icon trên Header
function HeaderIconBtn({ icon }) {
  return (
    <button className="p-2 text-[var(--color-text-muted)] opacity-70 hover:opacity-100 hover:text-[var(--color-main)] active:scale-90 transition-all">
      {icon}
    </button>
  );
}