import React from "react";
import { Sparkles, Compass, MapPin, Utensils } from "lucide-react";

interface AILoadingModalProps {
  isOpen: boolean;
  destination: string;
}

export const AILoadingModal: React.FC<AILoadingModalProps> = ({ isOpen, destination }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Glowing Animated Background Orbs */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl animate-pulse delay-500" />

        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-xl shadow-blue-500/30 animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-white">
              {destination} 여행 일정 생성 중...
            </h3>
            <p className="text-xs text-slate-300">
              TripMaster AI 컨시어지가 당신의 취향을 분석하고 있습니다.
            </p>
          </div>

          {/* Animated Checklist Steps */}
          <div className="space-y-2 pt-2 text-left">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
              <Compass className="w-4 h-4 text-blue-400 animate-spin" />
              <span>숨은 명소 및 최신 가볼 만한 곳 수집 중</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
              <Utensils className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>현지 미슐랭 & 인생 맛집 동선 매칭</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>대중교통 및 소요 시간 최적화 계산</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
