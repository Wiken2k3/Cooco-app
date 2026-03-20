import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Onboarding
import Splash from "../pages/Onboarding/Splash";
import Welcome from "../pages/Onboarding/Welcome";
import FAQ1 from "../pages/Onboarding/FAQ1";
import FAQ2 from "../pages/Onboarding/FAQ2";
import FAQ3 from "../pages/Onboarding/FAQ3";
import FAQ4 from "../pages/Onboarding/FAQ4";
import FAQ5 from "../pages/Onboarding/FAQ5";
import SuggestedFeeds from "../pages/Discover/SuggestedFeedsModal";

// Layout
import MainLayout from "../layout/MainLayout";

// Pages
import Discover from "../pages/Discover/Discover";
import DiscoverDetail from "../pages/DiscoverDetail/DiscoverDetail";
import DiscoverSteps from "../pages/DiscoverSteps/DiscoverSteps";
import MealPlan from "../pages/MealPlan/MealPlan";
import Grocery from "../pages/Grocery/Grocery";

// ✅ TEMP placeholder (tránh lỗi route)
const Recipes = () => <div>Recipes Page</div>;
const Settings = () => <div>Settings Page</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Onboarding */}
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/faq1" element={<FAQ1 />} />
        <Route path="/faq2" element={<FAQ2 />} />
        <Route path="/faq3" element={<FAQ3 />} />
        <Route path="/faq4" element={<FAQ4 />} />
        <Route path="/faq5" element={<FAQ5 />} />
        <Route path="/feeds" element={<SuggestedFeeds />} />

        {/* Main App */}
        <Route path="/app" element={<MainLayout />}>
          {/* ✅ FIX redirect */}
          <Route index element={<Navigate to="discover" />} />

          {/* Tabs */}
          <Route path="discover" element={<Discover />} />
          <Route path="mealplan" element={<MealPlan />} />
          <Route path="grocery" element={<Grocery />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="settings" element={<Settings />} />

          {/* Nested */}
          <Route path="discover/:id" element={<DiscoverDetail />} />
          <Route path="discover/:id/steps/:stepId" element={<DiscoverSteps />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}