import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../layout/OnboardingLayout";
import { Button } from "../../components/ui/button";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout onSkip={() => navigate("/faq1")}>
      <div className="flex-1 flex flex-col">
        {/* Minh họa giao diện Recipe Skeleton */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="w-full max-w-[320px] bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl relative overflow-hidden">
             {/* Card Image Header */}
             <div className="h-32 bg-gradient-to-r from-rose-200 via-orange-100 to-amber-100 rounded-2xl mb-6 relative">
                {/* Green floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-[#4ade80] rounded-xl shadow-lg flex items-center justify-center">
                   <div className="w-10 h-1.5 bg-white/40 rounded-full" />
                </div>
             </div>
             
             <p className="text-center font-bold text-gray-800 text-lg mb-8">
                Chocolate Chip Cookies
             </p>
             
             {/* Skeleton List Items */}
             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-12 h-3 bg-green-100 rounded-full" />
                    <div className="flex-1 h-3 bg-gray-100 rounded-full" />
                  </div>
                ))}
                <div className="w-2/3 h-3 bg-gray-100 rounded-full ml-16" />
             </div>
          </div>
        </div>

        {/* Nội dung text */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Save recipes from any website
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Browse the web with Pestle and save recipes from your favorite websites, blogs, and more.
          </p>
        </div>

        {/* Nút bấm chuyển sang FAQ1 */}
        <div className="mt-10">
          <Button 
            onClick={() => navigate("/faq1")}
            className="bg-[#d1f5d3] hover:bg-[#c1e8c3] text-[#2d6a4f] text-xl font-bold rounded-2xl shadow-none"
          >
            Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}