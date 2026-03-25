import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../layout/OnboardingLayout";
import { Button } from "../../components/ui/button";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout onSkip={() => navigate("/faq1")}>
      <div className="flex-1 flex flex-col h-full">
        
        {/* Phần minh họa Card (Visual Area) */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-10">
          <div className="w-full max-w-[320px] bg-white rounded-[3rem] p-7 border border-gray-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
            
            {/* Header Gradient */}
            <div className="h-32 bg-gradient-to-r from-[#FFD5A4] via-[#FFB8A1] to-[#FF9E9E] rounded-[2rem] mb-6 relative">
              {/* Floating Badge Xanh */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-9 bg-[#4ade80] rounded-xl shadow-lg flex items-center justify-center">
                <div className="w-9 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>

            {/* Recipe Title */}
            <p className="text-center font-black text-gray-900 text-[19px] mt-6 mb-4 tracking-tight">
              Chocolate Chip Cookies
            </p>

            {/* Three pill indicators (Prep, Cook, Cal) */}
            <div className="flex justify-center gap-2.5 mb-8">
              <div className="w-14 h-2.5 bg-gray-100 rounded-full" />
              <div className="w-14 h-2.5 bg-gray-100 rounded-full" />
              <div className="w-14 h-2.5 bg-gray-100 rounded-full" />
            </div>

            {/* List Skeleton Items */}
            <div className="space-y-4 px-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-6 h-2 bg-[#F0FDF4] rounded-[2px] flex-shrink-0" />
                  <div 
                    className="h-2 bg-gray-50 rounded-full" 
                    style={{ width: i % 2 === 0 ? '100%' : '85%' }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nội dung Text phía dưới */}
        <div className="px-2 mb-10">
          <h2 className="text-[32px] font-black text-gray-900 leading-[1.05] tracking-tight mb-4">
            Save recipes from <br /> any website
          </h2>
          <p className="text-[#8e8e93] text-[18px] font-medium leading-[1.4] max-w-[90%]">
            Browse the web with Pestle and save recipes from your favorite websites, blogs, and more.
          </p>
        </div>

        {/* Nút bấm Next - Căn phải chuẩn thiết kế */}
        <div className="flex justify-end pb-10">
          <Button 
            onClick={() => navigate("/welcomenext")}
            className="bg-[#D7F4D9] hover:bg-[#C8EBCB] text-[#22553F] text-[18px] font-bold py-7 px-10 rounded-[22px] shadow-none transition-all active:scale-95"
          >
            Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}