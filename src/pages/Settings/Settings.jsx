import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Moon, Sun, Bell, Shield, 
  HelpCircle, Info, ChevronRight, LogOut,
  Camera, Heart, MoreHorizontal 
} from "lucide-react";
// 1. Import hook dùng chung của dự án
import { useTheme } from "../../hooks/useTheme";

export default function Settings() {
  const navigate = useNavigate();
  
  // 2. Sử dụng context dùng chung để đồng bộ toàn app
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-32 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-6 pt-14 pb-4 flex justify-between items-end">
        <h1 className="text-[34px] font-extrabold text-[var(--color-text)] tracking-tight">
          Settings
        </h1>

        {/* <div className="flex items-center gap-2.5">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-button-bg)] text-[var(--color-button-color)] transition active:scale-95">
            <MoreHorizontal size={20} />
          </button>
        </div> */}
      </div>

      <main className="px-4 mt-6 space-y-8">
        
        {/* PROFILE CARD */}
        <section className="bg-[var(--color-card)] rounded-[28px] p-5 flex items-center gap-4 shadow-sm border border-[var(--color-border)] active:scale-[0.98] transition cursor-pointer">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <User size={32} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--color-main)] text-white rounded-full flex items-center justify-center border-2 border-[var(--color-card)]">
              <Camera size={12} fill="currentColor" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-[20px] font-black text-[var(--color-text)] leading-tight">Chef Luca</h2>
            <p className="text-[13px] font-bold text-[var(--color-text-muted)] opacity-60">luca.kitchen@icloud.com</p>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </section>

        {/* PREFERENCES GROUP */}
        <section className="space-y-2">
          <p className="px-4 text-[12px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.15em] opacity-50">Preferences</p>
          <div className="bg-[var(--color-card)] rounded-[28px] overflow-hidden border border-[var(--color-border)] shadow-sm">
            
            {/* 3. Nút Toggle đồng bộ giao diện và logic */}
            <SettingItem 
              icon={<Moon size={20} className={isDark ? "text-yellow-400" : "text-indigo-500"} />} 
              label="Dark Mode" 
              rightElement={
                <div 
                  onClick={() => setIsDark(!isDark)}
                  className={`w-[50px] h-[26px] rounded-full relative cursor-pointer transition duration-300
                  ${isDark ? 'bg-[#18baf8]' : 'bg-[#e5e7eb] dark:bg-zinc-700'}`}
                >
                  <div className={`w-[22px] h-[22px] bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm transition-transform duration-300
                  ${isDark ? 'translate-x-[24px]' : ''}`} />
                </div>
              }
            />
            
            <Divider />
            <SettingItem icon={<Bell size={20} className="text-red-400" />} label="Notifications" badge="2" />
            <Divider />
            <SettingItem icon={<Heart size={20} className="text-pink-400" />} label="Dietary Plan" />
          </div>
        </section>

        {/* SUPPORT GROUP */}
        <section className="space-y-2">
          <p className="px-4 text-[12px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.15em] opacity-50">App Support</p>
          <div className="bg-[var(--color-card)] rounded-[28px] overflow-hidden border border-[var(--color-border)] shadow-sm">
            <SettingItem icon={<HelpCircle size={20} className="text-blue-400" />} label="Help Center" />
            <Divider />
            <SettingItem icon={<Shield size={20} className="text-emerald-500" />} label="Privacy Policy" />
          </div>
        </section>

        {/* LOGOUT BUTTON */}
        <button className="w-full bg-[var(--color-card)] py-5 rounded-[28px] border border-[var(--color-border)] text-red-500 text-[17px] font-black flex items-center justify-center gap-2 active:scale-[0.97] transition shadow-sm">
          <LogOut size={20} strokeWidth={3} />
          Sign Out
        </button>

        <div className="text-center space-y-1 pb-10">
          <p className="text-[13px] font-black text-[var(--color-text-muted)] opacity-30">COOCO VERSION 1.2.0</p>
          <p className="text-[11px] font-bold text-[var(--color-text-muted)] opacity-20 uppercase tracking-widest">Built for iOS Design Guidelines</p>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function SettingItem({ icon, label, rightElement, badge, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 px-5 active:bg-black/5 dark:active:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
        <span className="font-bold text-[17px] text-[var(--color-text)]">{label}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {badge && (
          <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm">
            {badge}
          </span>
        )}
        {rightElement ? rightElement : <ChevronRight size={18} className="text-gray-300 opacity-50" />}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--color-border)] ml-16 mr-4 opacity-50" />;
}