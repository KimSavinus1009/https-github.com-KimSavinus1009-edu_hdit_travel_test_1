import React, { useState } from "react";
import { DEFAULT_TRANSPORTS } from "../data/mockData";
import { TransportOption, TabType } from "../types";
import { MapPin, Train, Car, Plane, Info, CheckCircle2, ArrowRight } from "lucide-react";

interface ScreenTransitProps {
  onSelectTransport: (option: TransportOption) => void;
  setActiveTab: (tab: TabType) => void;
}

export const ScreenTransit: React.FC<ScreenTransitProps> = ({
  onSelectTransport,
  setActiveTab
}) => {
  const [selectedRoute, setSelectedRoute] = useState("샌프란시스코에서 로스앤젤레스까지");
  const [selectedOptionId, setSelectedOptionId] = useState("train");

  const routes = [
    "샌프란시스코에서 로스앤젤레스까지",
    "도쿄에서 오사카까지",
    "서울에서 제주까지",
    "파리에서 니스까지"
  ];

  return (
    <div className="pb-24 pt-4 max-w-md mx-auto px-4 space-y-6">
      {/* Route Location Indicator */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
          <MapPin className="w-4 h-4" />
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="bg-transparent border-none text-blue-400 font-semibold focus:outline-none cursor-pointer"
          >
            {routes.map((r) => (
              <option key={r} value={r} className="bg-slate-900 text-slate-200">
                {r}
              </option>
            ))}
          </select>
        </div>
        <h1 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
          교통수단 선택
        </h1>
        <p className="text-xs text-slate-400">
          오늘의 여행을 위한 4가지 이동 수단을 비교합니다.
        </p>
      </div>

      {/* Transport Options List */}
      <div className="space-y-4">
        {DEFAULT_TRANSPORTS.map((option) => {
          const isSelected = selectedOptionId === option.id;

          let Icon = Train;
          if (option.type === "drive") Icon = Car;
          if (option.type === "flight") Icon = Plane;
          if (option.type === "taxi") Icon = Car;

          return (
            <div
              key={option.id}
              onClick={() => setSelectedOptionId(option.id)}
              className={`relative p-5 rounded-3xl border transition-all cursor-pointer ${
                option.isBestChoice
                  ? "bg-slate-900/95 dark:bg-slate-900/95 light:bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/30"
                  : isSelected
                  ? "bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border-blue-400"
                  : "bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Best Choice Badge */}
              {option.isBestChoice && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                  <span>★ 최적의 선택</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-3 pt-1">
                {/* Icon & Details */}
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-2xl ${
                    option.type === "train"
                      ? "bg-blue-500/20 text-blue-400"
                      : option.type === "drive"
                      ? "bg-rose-500/20 text-rose-400"
                      : option.type === "flight"
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white dark:text-white light:text-slate-900">
                      {option.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {option.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right">
                  <p className="text-lg font-extrabold text-blue-400 dark:text-blue-400 light:text-blue-600">
                    {option.priceKrw.toLocaleString()}원
                  </p>
                  <p className="text-[11px] text-slate-400">예상 비용</p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200" />

              {/* Bottom Row: Duration & Action button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>{option.durationText}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTransport(option);
                    setActiveTab("preferences");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    option.isBestChoice
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {option.isBestChoice ? "지금 예약하기" : "선택하기"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Eco-Friendly Feature Card */}
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-blue-300">
            친환경적인 선택
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            기차를 이용하면 비행기 대비 탄소 배출량을 75%까지 줄일 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
