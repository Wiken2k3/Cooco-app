import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, List, EyeOff, Plus, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { myRecipes } from "../../data/myRecipes";

export default function RecipeSteps() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const recipe = myRecipes.find((r) => String(r.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!recipe) return null;

  const steps = recipe.steps || [];
  const totalSteps = steps.length;

  // HÀM FIX LỖI: Highlight thông minh không ghi đè vào tag HTML
  const formatStepText = (text) => {
    const highlights = [
      "oven", "250°C", "dough", "mozzarella", "sauce", "pan", 
      "medium-high heat", "10-12 minutes", "golden", "salt", "pepper",
      "avocado", "salmon", "flour"
    ];

    let formattedText = text;

    highlights.forEach((word) => {
      // Sử dụng Regex với \b (word boundary) để chỉ highlight đúng từ đó, 
      // tránh highlight chữ "pan" bên trong chữ "pancake" hoặc class="pan"
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      formattedText = formattedText.replace(
        regex,
        `<span style="color: var(--color-main); font-weight: 900;">$1</span>`
      );
    });

    return (
      <p 
        className="text-[32px] md:text-[42px] font-[800] leading-[1.2] text-[var(--color-text)] transition-all duration-500"
        dangerouslySetInnerHTML={{ __html: formattedText }} 
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] z-[9999] flex flex-col px-6 pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] overflow-hidden">
      
      {/* HEADER */}
      <header className="h-[70px] flex justify-between items-center mt-2">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-[var(--color-text-muted)] active:scale-90 transition-transform"
          onClick={() => navigate(-1)}
        >
          <X size={28} strokeWidth={2} />
        </button>

        <div className="flex gap-2">
          <HeaderIconBtn icon={<List size={22} />} />
          <HeaderIconBtn icon={<EyeOff size={22} />} />
          <HeaderIconBtn icon={<Plus size={22} />} />
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="flex gap-1.5 mt-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              index <= currentStep ? "bg-[var(--color-main)]" : "bg-black/10 dark:bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col justify-center mb-10">
        <div className="mb-6">
          <span className="px-4 py-1.5 bg-[var(--color-main)]/10 text-[var(--color-main)] rounded-full text-[14px] font-[900] tracking-widest uppercase">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>

        <div key={currentStep} className="min-h-[300px] animate-in fade-in slide-in-from-right-10 duration-500">
          {formatStepText(steps[currentStep])}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="h-[140px] flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center mb-6">
          <button
            disabled={currentStep === 0}
            className={`w-[75px] h-[75px] rounded-full flex items-center justify-center transition-all active:scale-90 ${
              currentStep > 0 ? "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] shadow-sm" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <ArrowLeft size={35} strokeWidth={2.5} />
          </button>

          {currentStep < totalSteps - 1 ? (
            <button
              className="w-[75px] h-[75px] bg-[var(--color-main)] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              <ArrowRight size={35} strokeWidth={3} />
            </button>
          ) : (
            <button
              className="px-10 h-[75px] bg-green-500 text-white font-[900] text-xl rounded-full shadow-lg active:scale-90 transition-all flex items-center gap-3"
              onClick={() => navigate(-1)}
            >
              <Check size={28} strokeWidth={3} />
              FINISH
            </button>
          )}
        </div>
        <p className="text-[13px] font-bold text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest">
          Cooking: {recipe.title}
        </p>
      </footer>
    </div>
  );
}

function HeaderIconBtn({ icon }) {
  return (
    <button className="w-11 h-11 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-main)] active:scale-90 transition-all">
      {icon}
    </button>
  );
}