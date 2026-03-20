import { useState } from "react";
import FAQLayout from "../../layout/FAQLayout";
import { ThumbsDown, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cuisines = [
  "American", "Italian", "Mexican", "Asian",
  "Chinese", "Japanese", "Thai", "Indian"
];

export default function FAQ1() {
  const navigate = useNavigate();

  // { American: 'like', Italian: 'dislike' }
  const [selections, setSelections] = useState({});

  const handleToggle = (item, type) => {
    setSelections(prev => ({
      ...prev,
      [item]: prev[item] === type ? null : type
    }));
  };

  // ✅ check có ít nhất 1 lựa chọn
  const canNext = Object.values(selections).some(v => v);

  return (
    <FAQLayout
      step={1}
      canNext={canNext}
      onNext={() => navigate("/faq2")}
    >
      <div className="flex-1">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          Cuisines
        </h1>
        <p className="text-gray-400 mb-8 font-medium">
          Are there any cuisines you especially like or dislike?
        </p>

        {/* LIST */}
        <div className="space-y-2">
          {cuisines.map(item => {
            const value = selections[item];

            return (
              <div
                key={item}
                className="flex items-center justify-between py-4 border-b border-gray-50"
              >
                <span className="text-xl font-medium text-gray-800">
                  {item}
                </span>

                <div className="flex gap-4">
                  
                  {/* DISLIKE */}
                  <ThumbsDown
                    size={24}
                    onClick={() => handleToggle(item, "dislike")}
                    className={`cursor-pointer transition-all ${
                      value === "dislike"
                        ? "text-red-500 fill-red-500 scale-110"
                        : "text-gray-300 hover:text-red-400"
                    }`}
                  />

                  {/* LIKE */}
                  <Heart
                    size={24}
                    onClick={() => handleToggle(item, "like")}
                    className={`cursor-pointer transition-all ${
                      value === "like"
                        ? "text-pink-500 fill-pink-500 scale-110"
                        : "text-gray-300 hover:text-pink-400"
                    }`}
                  />

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </FAQLayout>
  );
}