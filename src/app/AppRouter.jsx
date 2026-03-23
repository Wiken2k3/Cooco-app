import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Onboarding & Pages (Giữ nguyên các import của bạn)
import Splash from "../pages/Onboarding/Splash";
import Welcome from "../pages/Onboarding/Welcome";
import FAQ1 from "../pages/Onboarding/FAQ1";
import FAQ2 from "../pages/Onboarding/FAQ2";
import FAQ3 from "../pages/Onboarding/FAQ3";
import FAQ4 from "../pages/Onboarding/FAQ4";
import FAQ5 from "../pages/Onboarding/FAQ5";
import SuggestedFeeds from "../pages/Discover/SuggestedFeedsModal";
import MainLayout from "../layout/MainLayout";
import Discover from "../pages/Discover/Discover";
import DiscoverDetail from "../pages/DiscoverDetail/DiscoverDetail";
import DiscoverSteps from "../pages/DiscoverSteps/DiscoverSteps";
import MealPlan from "../pages/MealPlan/MealPlan";
import Grocery from "../pages/Grocery/Grocery";

const Recipes = () => <div className="p-10">Recipes Page</div>;
const Settings = () => <div className="p-10">Settings Page</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ONBOARDING FLOW --- */}
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/faq1" element={<FAQ1 />} />
        <Route path="/faq2" element={<FAQ2 />} />
        <Route path="/faq3" element={<FAQ3 />} />
        <Route path="/faq4" element={<FAQ4 />} />
        <Route path="/faq5" element={<FAQ5 />} />
        <Route path="/feeds" element={<SuggestedFeeds />} />

        {/* --- MAIN APP (Tất cả phải có tiền tố /app) --- */}
        <Route path="/app" element={<MainLayout />}>
          {/* Mặc định vào /app sẽ nhảy sang /app/discover */}
          <Route index element={<Navigate to="discover" replace />} />

          {/* Tab Discover chính */}
          <Route path="discover" element={<Discover />} />
          
          {/* Chi tiết món ăn: /app/discover/:id */}
          <Route path="discover/:id" element={<DiscoverDetail />} />
          
          {/* Các bước nấu: /app/discover/:id/steps */}
          <Route path="discover/:id/steps" element={<DiscoverSteps />} />

          {/* Các Tabs khác */}
          <Route path="mealplan" element={<MealPlan />} />
          <Route path="grocery" element={<Grocery />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all: Nếu gõ bừa URL thì về Splash hoặc Trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}