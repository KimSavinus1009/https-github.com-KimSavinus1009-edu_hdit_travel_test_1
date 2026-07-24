import React from "react";
import { TravelTrip, TabType } from "../types";
import { User, Settings, Heart, Bell, Shield, Moon, Sun, ChevronRight, MapPin, Award } from "lucide-react";

interface ScreenProfileProps {
  trips: TravelTrip[];
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  setActiveTab: (tab: TabType) => void;
  onSelectTrip: (trip: TravelTrip) => void;
}

export const ScreenProfile: React.FC<ScreenProfileProps> = ({
  trips,
  isDarkMode,
  setIsDarkMode,
  setActiveTab,
  onSelectTrip
}) => {
  return (
    <div className="pb-28 pt-4 max-w-md mx-auto px-4 space-y-6">
      {/* Profile Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">김민준 님</h2>
            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold">
              PRO 회원
            </span>
          </div>
          <p className="text-xs text-slate-400">ksjfamily486@gmail.com</p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>총 4개의 여행 일정을 저장함</span>
          </p>
        </div>
      </div>

      {/* My Saved Trips */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">내 저장된 여행</h3>
        <div className="space-y-2">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => {
                onSelectTrip(trip);
                setActiveTab("itinerary");
              }}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer flex items-center justify-between transition"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{trip.title}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {trip.destination} • {trip.startDate}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Settings Options List */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 px-1">앱 설정 및 환경</h3>

        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 flex items-center justify-between cursor-pointer transition"
        >
          <div className="flex items-center gap-3">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
            <span className="text-xs font-bold text-white">
              {isDarkMode ? "다크 모드 (기본 테마 적용 중)" : "라이트 모드"}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-blue-400">변경</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 flex items-center justify-between cursor-pointer transition">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-bold text-white">여행 일정 알림</span>
          </div>
          <span className="text-[11px] text-slate-400">켜짐</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 flex items-center justify-between cursor-pointer transition">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-white">개인정보 및 지도의 세부설정</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
