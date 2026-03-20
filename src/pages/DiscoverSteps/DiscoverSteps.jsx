import { X, ArrowRight, ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function DiscoverSteps() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const step = parseInt(stepId);

  const stepsContent = [
    "Slit the dates lengthwise and remove the pit.",
    "Fill each date with about 1 tsp of peanut butter.",
    "Melt the chocolate and drizzle it over the stuffed dates.",
    "Enjoy your healthy snack!"
  ];

  const totalSteps = stepsContent.length;
  const isLastStep = step >= totalSteps;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (isLastStep) navigate("/app/discover");
    else navigate(`../steps/${step + 1}`);
  };

  return (
    <div className="h-screen bg-[#F2F2F7] flex flex-col relative overflow-hidden">
      {/* Top Bar with Progress */}
      <div className="px-6 pt-14">
        <div className="flex justify-between items-center mb-8 h-10">
          <div className="w-10 flex justify-start">
            {step > 1 && (
              <button onClick={() => navigate(-1)} className="text-[#8E8E93] active:opacity-50 transition-opacity">
                <ChevronLeft size={32} strokeWidth={2.5} />
              </button>
            )}
          </div>
          <button
            onClick={() => navigate("../")}
            className="w-9 h-9 bg-[#E5E5EA] rounded-full flex items-center justify-center active:scale-90 transition-all"
          >
            <X size={18} strokeWidth={2.5} className="text-[#8E8E93]" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0095FF] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-8 pt-16 flex flex-col">
        <span className="text-[#0095FF] font-[900] uppercase tracking-widest text-[13px] mb-4">
          Step {step} of {totalSteps}
        </span>

        <h2 key={step} className="text-[34px] font-[900] text-black leading-[1.15] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500">
          {stepsContent[step - 1] || "All Done!"}
        </h2>
      </div>

      {/* Floating Big Next Button */}
      <div className="absolute bottom-16 right-8">
        <button
          onClick={handleNext}
          className="w-[84px] h-[84px] bg-[#0095FF] text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,149,255,0.4)] active:scale-90 transition-transform"
        >
          <ArrowRight size={40} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}