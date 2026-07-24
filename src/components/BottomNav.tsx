import React from "react";
import { TabType } from "../types";
import { Home, Compass, Train, Calendar, SlidersHorizontal, User } from "lucide-react";

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 light:bg-white/95 border-t border-slate-800 dark:border-slate-800/80 light:border-slate-200 backdrop-blur-lg px-2 py-1.5 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "home"
              ? "text-blue-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === "home" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : ""}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">홈</span>
        </button>

        <button
          onClick={() => setActiveTab("preferences")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "preferences"
              ? "text-blue-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === "preferences" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : ""}`}>
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">탐색</span>
        </button>

        <button
          onClick={() => setActiveTab("transit")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "transit"
              ? "text-blue-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === "transit" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : ""}`}>
            <Train className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">교통</span>
        </button>

        <button
          onClick={() => setActiveTab("itinerary")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "itinerary"
              ? "text-blue-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === "itinerary" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : ""}`}>
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">일정</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "profile"
              ? "text-blue-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === "profile" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : ""}`}>
            <User className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">프로필</span>
        </button>
      </div>
    </nav>
  );
};
