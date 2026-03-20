import { useState } from "react";
import FAQLayout from "../../layout/FAQLayout";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FAQ5() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);

  const recipe = {
    name: "Hummus Turkey Sandwich",
    calories: "404 cal",
    image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=600&q=80"
  };

  const canNext = !!rating;

  return (
    <FAQLayout
      step={5}
      canNext={canNext}
      onNext={() =>
        navigate("/app/discover", {
          state: { openSuggested: true }
        })
      }
    >
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-1 leading-tight">
          Your taste profile
        </h1>
        <p className="text-gray-400 mb-6 text-sm font-medium">
          Rate recipes to help us refine your meal plan.
        </p>

        <div className="flex-1 flex flex-col justify-center items-center pb-4">

          {/* CARD */}
          <div className="w-full max-w-[320px] aspect-[3/4] bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col">
            <div className="relative flex-[4] overflow-hidden">
              <img
                src={recipe.image}
                className="w-full h-full object-cover"
                alt={recipe.name}
              />

              {rating === "like" && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <ThumbsUp size={60} className="text-white drop-shadow-lg" />
                </div>
              )}

              {rating === "dislike" && (
                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                  <ThumbsDown size={60} className="text-white drop-shadow-lg" />
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="p-5 bg-white flex-[1] flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-800 leading-snug mb-0.5">
                {recipe.name}
              </h2>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">
                {recipe.calories}
              </p>
            </div>
          </div>

          {/* ACTION */}
          <div className="w-full max-w-[320px] flex gap-3 mt-6">
            <button
              onClick={() => setRating("dislike")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                rating === "dislike"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
            >
              <ThumbsDown size={18} /> Dislike
            </button>

            <button
              onClick={() => setRating("like")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                rating === "like"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp size={18} /> Like
            </button>
          </div>

        </div>
      </div>
    </FAQLayout>
  );
}