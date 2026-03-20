import { useNavigate } from "react-router-dom";

export default function OnboardingLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header with Skip button */}
      <div className="flex justify-end p-6">
        <button 
          onClick={() => navigate("/app/mealplan")} 
          className="text-gray-400 font-medium text-lg hover:text-gray-600"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-8 pb-12">
        {children}
      </div>
    </div>
  );
}