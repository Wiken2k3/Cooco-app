import { useState } from "react";
import FAQLayout from "../../layout/FAQLayout";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const veggieData = [
  { id: 1, name: "Sauteed Spinach", img: "https://www.wellplated.com/wp-content/uploads/2023/01/Seasoned-Sauteed-Spinach.jpg" },
  { id: 2, name: "Roasted Broccoli", img: "https://natashaskitchen.com/wp-content/uploads/2022/09/Roasted-Broccoli-SQ.jpg" },
  { id: 3, name: "Glazed Carrots", img: "https://assets.epicurious.com/photos/64cabef094f0a9cf4c215a8e/4:6/w_2222,h_3333,c_limit/glazed-carrots_RECIPE_072123_18161_VOG_final.jpg" },
  { id: 4, name: "Grilled Asparagus", img: "https://www.simplyrecipes.com/thmb/nw6mLCW2JFWbVV54E7iqHDLJMqo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Grilled-Asparagus-LEAD-ef819b5eef8b449eabaa739ee540203c.jpg" },
  { id: 5, name: "Brussels Sprouts", img: "https://www.onceuponachef.com/images/2009/11/Roasted-Brussels-Sprouts-1200x1500.jpg" },
  { id: 6, name: "Sauteed Mushrooms", img: "https://moonandspoonandyum.com/wp-content/uploads/2022/03/sauteed-mushrooms-recipe.jpg" },
  { id: 7, name: "Roasted Potatoes", img: "https://www.afamilyfeast.com/wp-content/uploads/2024/12/Tuscan-Roasted-Potatoes-new1.jpg" },
  { id: 8, name: "Grilled Corn", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7UpKauCZIlFTscAYtIBgDZzS9i5p_gRSGDw&s" },
];

export default function FAQ4() {
  const navigate = useNavigate();
  const [selectedVeggies, setSelectedVeggies] = useState([]);

  const toggleVeggie = (id) => {
    setSelectedVeggies(prev =>
      prev.includes(id)
        ? prev.filter(vId => vId !== id)
        : [...prev, id]
    );
  };

  // ✅ phải chọn ít nhất 1
  const canNext = selectedVeggies.length > 0;

  return (
    <FAQLayout
      step={4}
      canNext={canNext}
      onNext={() => navigate("/faq5")}
    >
      <div className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2 leading-tight">
          Preferred cooked veggies
        </h1>
        <p className="text-gray-400 mb-6 font-medium">
          Which of these cooked veggies do you want to see in your meal plans?
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4 pb-4">
          {veggieData.map((v) => {
            const isSelected = selectedVeggies.includes(v.id);

            return (
              <div
                key={v.id}
                onClick={() => toggleVeggie(v.id)}
                className="space-y-2 cursor-pointer group"
              >

                {/* IMAGE CARD */}
                <div
                  className={`relative aspect-square rounded-3xl overflow-hidden border-4 transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 scale-[0.96]"
                      : "border-transparent group-hover:scale-[0.98]"
                  }`}
                >
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover"
                  />

                  {/* HEART ICON */}
                  <div
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      isSelected
                        ? "bg-blue-500 text-white scale-110"
                        : "bg-white/80 text-gray-400 group-hover:bg-white"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={isSelected ? "fill-current" : ""}
                    />
                  </div>

                  {/* OVERLAY */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/10" />
                  )}
                </div>

                {/* NAME */}
                <p
                  className={`font-bold text-sm text-center transition-colors ${
                    isSelected
                      ? "text-blue-600"
                      : "text-gray-800 group-hover:text-black"
                  }`}
                >
                  {v.name}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </FAQLayout>
  );
}