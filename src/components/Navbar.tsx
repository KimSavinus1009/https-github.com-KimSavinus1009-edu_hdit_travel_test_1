import React from "react";
import { TabType } from "../types";
import { Compass, Moon, Sun, Menu, User, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  tripTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  tripTitle
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/90 dark:bg-slate-950/90 light:bg-white/90 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left branding or navigation menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("home")}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            aria-label="메뉴 오픈"
          >
            <Menu className="w-5 h-5 text-blue-400" />
          </button>
          
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white dark:text-white light:text-slate-900 tracking-tight flex items-center gap-1.5">
                TripMaster
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md">
                  AI
                </span>
              </span>
              {tripTitle && (
                <p className="text-xs text-slate-400 truncate max-w-[160px]">
                  {tripTitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Center Tab Quick Switcher (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 dark:bg-slate-900/80 light:bg-slate-100 p-1 rounded-2xl border border-slate-700/50 dark:border-slate-800 light:border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "home"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            홈
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
              activeTab === "preferences"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI 일정만들기
          </button>
          <button
            onClick={() => setActiveTab("transit")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "transit"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            교통 비교
          </button>
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "itinerary"
                ? "bg-blue-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            상세 일정
          </button>
        </nav>

        {/* Right Controls: Dark mode toggle & Avatar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-800/80 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-400 hover:text-amber-300 transition"
            title={isDarkMode ? "라이트 모드로 변경" : "다크 모드로 변경"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>

          <div 
            onClick={() => setActiveTab("profile")}
            className="w-9 h-9 rounded-full bg-slate-700 overflow-hidden border-2 border-blue-500/40 cursor-pointer hover:border-blue-400 transition"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
