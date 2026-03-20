import { useState } from "react";
import FAQLayout from "../../layout/FAQLayout";
import { Search, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tags = [
  "beef", "beets", "bell peppers", "broccoli", "brussels sprouts",
  "cilantro", "eggplant", "eggs", "fish", "ginger",
  "kale", "mayonnaise", "mushrooms", "okra", "olives",
  "peas", "pickles", "pork", "quinoa"
];

export default function FAQ2() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // ✅ phải chọn ít nhất 1
  const canNext = selectedTags.length > 0;

  return (
    <FAQLayout
      step={2}
      canNext={canNext}
      onNext={() => navigate("/faq3")}
    >
      <div className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          Dislikes
        </h1>
        <p className="text-gray-400 mb-6 font-medium">
          Are there any foods you dislike?
        </p>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            className="w-full bg-gray-100 rounded-xl py-4 pl-12 pr-4 outline-none text-lg focus:ring-2 focus:ring-blue-500/30"
            placeholder="Search"
          />
        </div>

        {/* TAG LIST */}
        <h3 className="text-gray-400 font-bold tracking-wider mb-4 uppercase text-xs">
          Common Dislikes
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => {
            const isSelected = selectedTags.includes(tag);

            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`border rounded-xl px-4 py-2 flex items-center gap-2 transition-all text-sm font-medium ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 text-blue-600 scale-95"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tag}
                {isSelected ? (
                  <Check size={16} />
                ) : (
                  <Plus size={16} />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </FAQLayout>
  );
}