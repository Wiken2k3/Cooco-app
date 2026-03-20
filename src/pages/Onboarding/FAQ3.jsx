import { useState } from "react";
import FAQLayout from "../../layout/FAQLayout";
import { Ban, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allergies = [
  "Shellfish", "Fish", "Dairy", "Peanut",
  "Tree nut", "Egg", "Gluten", "Soy"
];

export default function FAQ3() {
  const navigate = useNavigate();
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const toggleAllergy = (item) => {
    setSelectedAllergies(prev =>
      prev.includes(item)
        ? prev.filter(a => a !== item)
        : [...prev, item]
    );
  };

  // ✅ phải chọn ít nhất 1
  const canNext = selectedAllergies.length > 0;

  return (
    <FAQLayout
      step={3}
      canNext={canNext}
      onNext={() => navigate("/faq4")}
    >
      <div className="flex-1">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          Allergies
        </h1>
        <p className="text-gray-400 mb-8 font-medium">
          Do you have any food allergies or restrictions?
        </p>

        {/* LIST */}
        <div className="space-y-4">
          {allergies.map(item => {
            const isSelected = selectedAllergies.includes(item);

            return (
              <div
                key={item}
                onClick={() => toggleAllergy(item)}
                className={`flex items-center justify-between py-4 border-b border-gray-50 cursor-pointer transition-all ${
                  isSelected ? "bg-blue-50/40" : "hover:bg-gray-50"
                }`}
              >
                {/* TEXT */}
                <span
                  className={`text-xl font-semibold transition-colors ${
                    isSelected
                      ? "text-blue-600"
                      : "text-gray-800"
                  }`}
                >
                  {item}
                </span>

                {/* ICON */}
                {isSelected ? (
                  <CheckCircle2
                    size={24}
                    className="text-blue-500 fill-blue-50 scale-110"
                  />
                ) : (
                  <Ban
                    size={24}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  />
                )}

              </div>
            );
          })}
        </div>

      </div>
    </FAQLayout>
  );
}