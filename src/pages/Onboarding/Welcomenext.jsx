import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../layout/OnboardingLayout";
import { Button } from "../../components/ui/button";
import { Check } from "lucide-react";

export default function WelcomeShoppingList() {
  const navigate = useNavigate();

  const ingredients = [
    { amount: "2 cups", name: "of flour", note: "(sifted)", checked: false },
    { amount: "3 tbsp", name: "worcestershire sauce", note: "", checked: true },
    { amount: "2 cups", name: "garlic", note: "", checked: true },
    { amount: "4 cups", name: "vegetable stock", note: "(or chicken)", checked: false },
    { amount: "1", name: "medium zucchini", note: "(diced)", checked: false },
  ];

  return (
    <OnboardingLayout onSkip={() => navigate("/faq1")}>
      <div className="flex-1 flex flex-col h-full px-4">
        
        {/* Card Minh họa - Căn chỉnh lại padding và shadow nhẹ hơn */}
        <div className="flex-1 flex flex-col items-center justify-center pt-4">
          <div className="w-full max-w-[320px] bg-white rounded-[2.5rem] p-6 border border-gray-50 shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="divide-y divide-gray-50">
              {ingredients.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-3.5">
                  {/* Checkbox nhỏ hơn một chút (24px) */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    item.checked ? "bg-[#4ade80] border-[#4ade80]" : "border-gray-200"
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />}
                  </div>

                  {/* Text content - Giảm size chữ xuống 16px */}
                  <div className={`flex flex-wrap items-baseline gap-1.5 text-[16px] leading-tight ${item.checked ? "opacity-30" : "opacity-100"}`}>
                    <span className={`${item.checked ? "line-through text-gray-900" : "text-[#4ade80] font-bold"}`}>
                      {item.amount}
                    </span>
                    <span className={`font-bold text-gray-900 ${item.checked ? "line-through" : ""}`}>
                      {item.name}
                    </span>
                    {item.note && (
                      <span className="text-[#8e8e93] font-medium text-[14px]">{item.note}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tiêu đề & Mô tả - Đã giảm size theo yêu cầu */}
        <div className="mt-8 mb-6">
          <h2 className="text-[28px] font-black text-gray-900 leading-[1.1] tracking-tight mb-3">
            Create Shopping Lists <br /> from Recipes
          </h2>
          <p className="text-[#8e8e93] text-[17px] font-medium leading-[1.4] max-w-[95%]">
            Automatically create shopping lists from recipes in your Cookbook or Meal Plan.
          </p>
        </div>

        {/* Nút Next - Đã giảm nhỏ lại (py-5 px-8) */}
        <div className="pb-10 flex justify-end">
          <Button 
            onClick={() => navigate("/splash")}
            className="bg-[#D7F4D9] hover:bg-[#C8EBCB] text-[#22553F] text-[17px] font-bold py-5 px-8 h-auto rounded-[20px] shadow-none transition-all active:scale-95"
          >
            Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}