import React, { useState } from "react";
import { INTEREST_OPTIONS } from "../data/mockData";
import { TabType } from "../types";
import { Utensils, Landmark, Compass, Users, Coffee, Calendar, Footprints, Train, Car, Sparkles, Check, ChevronRight } from "lucide-react";
import { DatePickerModal } from "./DatePickerModal";

interface ScreenPreferencesProps {
  onGenerateAI: (destination: string, startDate: string, endDate: string, transport: string, interests: string[]) => void;
  setActiveTab: (tab: TabType) => void;
}

export const ScreenPreferences: React.FC<ScreenPreferencesProps> = ({
  onGenerateAI,
  setActiveTab
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "gourmet",
    "landmark",
    "hidden",
    "cafe"
  ]);
  const [selectedDestination, setSelectedDestination] = useState("도쿄");
  const [travelDates, setTravelDates] = useState("2024년 10월 12일 - 10월 15일");
  const [transportMode, setTransportMode] = useState("대중교통");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const iconMap: Record<string, any> = {
    Utensils,
    Landmark,
    Compass,
    Users,
    Coffee
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleCreateItinerary = () => {
    const interestTitles = INTEREST_OPTIONS
      .filter((opt) => selectedInterests.includes(opt.id))
      .map((opt) => opt.title);

    onGenerateAI(
      selectedDestination,
      "2024-10-12",
      "2024-10-15",
      transportMode,
      interestTitles
    );
  };

  return (
    <div className="pb-24 pt-4 max-w-md mx-auto px-4 space-y-6">
      {/* Top Banner Card */}
      <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-3">
        <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <h1 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
          당신만의 여정을 만드세요
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed">
          가장 중요하게 생각하는 가치를 선택해 주세요. 인공지능 컨시어지가 당신의 취향을 반영해 정밀한 일정을 구성해 드립니다.
        </p>

        {/* Quick Destination Select */}
        <div className="pt-2 flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">목적지:</span>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-blue-400 focus:outline-none"
          >
            <option value="도쿄">도쿄 (Tokyo)</option>
            <option value="서울">서울 (Seoul)</option>
            <option value="제주">제주 (Jeju)</option>
            <option value="교토">교토 (Kyoto)</option>
            <option value="파리">파리 (Paris)</option>
            <option value="샌프란시스코">샌프란시스코 (SF)</option>
          </select>
        </div>
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white dark:text-white light:text-slate-900">
              여행 관심사
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              2개 이상 선택하시면 더 정확한 결과를 얻으실 수 있습니다.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow">
            5개의 옵션 사용 가능
          </span>
        </div>

        {/* Interest Cards */}
        <div className="space-y-3">
          {INTEREST_OPTIONS.map((item) => {
            const IconComponent = iconMap[item.iconName] || Compass;
            const isSelected = selectedInterests.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer relative space-y-2 ${
                  isSelected
                    ? "bg-slate-900/95 dark:bg-slate-900/95 light:bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                    : "bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-white dark:text-white light:text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pl-12">
                  {item.description}
                </p>

                <div className="pl-12 flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-semibold">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Travel Dates Card */}
      <div className="p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 space-y-2">
        <p className="text-xs font-semibold text-slate-400">여행 일정</p>
        <div
          onClick={() => setIsDatePickerOpen(true)}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-sm font-bold text-white cursor-pointer hover:border-blue-500/50 transition active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>{travelDates}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-400 font-bold">
            <span>달력 변경</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelectRange={(datesStr) => {
          setTravelDates(datesStr);
        }}
      />

      {/* Transport Mode */}
      <div className="p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 space-y-2">
        <p className="text-xs font-semibold text-slate-400">이동 수단</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "도보", label: "도보", icon: Footprints },
            { id: "대중교통", label: "대중교통", icon: Train },
            { id: "차량", label: "차량", icon: Car },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = transportMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setTransportMode(mode.id)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl border text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate CTA */}
      <button
        onClick={handleCreateItinerary}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all"
      >
        <span>일정 생성하기</span>
        <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
      </button>
    </div>
  );
};
