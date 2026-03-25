import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Onboarding & Pages
import Splash from "../pages/Onboarding/Splash";
import Welcome from "../pages/Onboarding/Welcome";
import Welcomenext from "../pages/Onboarding/Welcomenext";
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

// --- IMPORT CÁC TRANG RECIPES CÒN THIẾU ---
import Recipes from "../pages/Recipes/Recipes";
import RecipeDetail from "../pages/Recipes/RecipeDetail";
import RecipeSteps from "../pages/Recipes/RecipeSteps";
import RecipeFolders from "../pages/Recipes/RecipeFolders";
import ImportWebsite from "../pages/Recipes/AddRecipe/ImportWebsite";
import ManualEntry from "../pages/Recipes/AddRecipe/ManualEntry";

const Settings = () => <div className="p-10">Settings Page</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ONBOARDING FLOW --- */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcomenext" element={<Welcomenext />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/faq1" element={<FAQ1 />} />
        <Route path="/faq2" element={<FAQ2 />} />
        <Route path="/faq3" element={<FAQ3 />} />
        <Route path="/faq4" element={<FAQ4 />} />
        <Route path="/faq5" element={<FAQ5 />} />
        <Route path="/feeds" element={<SuggestedFeeds />} />

        {/* --- MAIN APP (Tất cả phải có tiền tố /app) --- */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="discover" replace />} />

          {/* Tab Discover chính */}
          <Route path="discover" element={<Discover />} />
          <Route path="discover/:id" element={<DiscoverDetail />} />
          <Route path="discover/:id/steps" element={<DiscoverSteps />} />

          {/* --- TAB RECIPES: Cập nhật các Route con còn thiếu --- */}
          <Route path="recipes">
            <Route index element={<Recipes />} />
            <Route path=":id" element={<RecipeDetail />} />
            <Route path=":id/steps" element={<RecipeSteps />} />
            <Route path="folders" element={<RecipeFolders />} />
            {/* Luồng thêm món ăn mới */}
            <Route path="add/website" element={<ImportWebsite />} />
            <Route path="add/manual" element={<ManualEntry />} />
          </Route>

          <Route path="mealplan" element={<MealPlan />} />
          <Route path="grocery" element={<Grocery />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}