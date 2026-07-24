import React, { useState } from "react";
import { POPULAR_DESTINATIONS } from "../data/mockData";
import { TravelTrip, TabType } from "../types";
import { Search, Plane, Train, Car, Bus, Calendar, ChevronRight, MoreVertical, Sparkles, MapPin, ArrowLeft } from "lucide-react";
import { DatePickerModal } from "./DatePickerModal";

interface ScreenHomeProps {
  onGenerateItinerary: (destination: string, transport: string, duration: string, interests: string[]) => void;
  ongoingTrips: TravelTrip[];
  onSelectTrip: (trip: TravelTrip) => void;
  setActiveTab: (tab: TabType) => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  onGenerateItinerary,
  ongoingTrips,
  onSelectTrip,
  setActiveTab
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("도쿄");
  const [selectedTransport, setSelectedTransport] = useState("항공");
  const [travelDates, setTravelDates] = useState("2024년 10월 12일 - 10월 15일");
  const [travelDurationText, setTravelDurationText] = useState("총 3박 4일");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["맛집 탐방", "자연/힐링"]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const transportOptions = [
    { id: "항공", label: "항공", icon: Plane },
    { id: "철도", label: "철도", icon: Train },
    { id: "렌터카", label: "렌터카", icon: Car },
    { id: "버스", label: "버스", icon: Bus },
  ];

  const interestTags = ["맛집 탐방", "역사/문화", "쇼핑", "자연/힐링", "액티비티", "카페 투어"];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    const dest = searchQuery.trim() || selectedDestination || "도쿄";
    onGenerateItinerary(dest, selectedTransport, travelDates, selectedInterests);
  };

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between py-2">
        <button className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <h1 className="text-lg font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
          나의 여행 계획기 시작!!
        </h1>
        <button 
          onClick={() => setActiveTab("preferences")}
          className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition"
        >
          <Search className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      {/* Hero Banner with Search */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-700 to-slate-900 border border-slate-800">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1000&auto=format&fit=crop')"
        }} />
        <div className="relative p-6 pt-10 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
              어디로 떠나고 싶으신가요?
            </h2>
            <p className="text-sm text-slate-300">
              꿈꾸던 여행을 현실로 만들어보세요.
            </p>
          </div>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            className="relative mt-2 flex items-center"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder="도시, 명소 또는 국가를 입력하세요"
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 text-white dark:text-white light:text-slate-900 placeholder:text-slate-400 border border-slate-700/80 focus:border-blue-500 focus:outline-none shadow-inner text-sm font-medium transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition flex items-center justify-center shadow-md"
              title="검색 및 일정 생성"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900">
          인기 추천 여행지
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {POPULAR_DESTINATIONS.map((dest) => {
            const isSelected = selectedDestination === dest.nameKr;
            return (
              <button
                key={dest.id}
                onClick={() => {
                  setSelectedDestination(dest.nameKr);
                  setSearchQuery(dest.nameKr);
                }}
                className={`snap-start shrink-0 flex flex-col items-center gap-2 p-2 rounded-2xl transition-all ${
                  isSelected
                    ? "bg-blue-600/20 border-2 border-blue-500 shadow-md shadow-blue-500/20"
                    : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative shadow-md">
                  <img
                    src={dest.imageUrl}
                    alt={dest.nameKr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-2 text-xs font-bold text-white drop-shadow">
                    {dest.nameKr}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Travel Style Settings Card */}
      <div className="p-5 rounded-3xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900">
          여행 스타일 설정
        </h3>

        {/* Transportation Mode */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400">교통수단 선택</p>
          <div className="grid grid-cols-4 gap-2">
            {transportOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedTransport === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTransport(item.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30 scale-105"
                      : "bg-slate-800/60 dark:bg-slate-800/60 light:bg-white border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration Picker Card */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400">여행 기간</p>
          <div
            onClick={() => setIsDatePickerOpen(true)}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-white border border-slate-700/60 hover:border-blue-500/50 cursor-pointer transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                  {travelDates}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {travelDurationText}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-400 font-bold">
              <span>달력 변경</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Date Picker Modal */}
        <DatePickerModal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          onSelectRange={(datesStr, fullDatesStr, durationStr) => {
            setTravelDates(datesStr);
            setTravelDurationText(durationStr);
          }}
        />

        {/* Interest Categories */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400">관심 분야</p>
          <div className="flex flex-wrap gap-2">
            {interestTags.map((tag) => {
              const isSelected = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? "bg-blue-600/30 border-blue-500 text-blue-200 font-semibold"
                      : "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate CTA Button */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleGenerate}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all"
          >
            <span>나의 일정 생성하기</span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </button>
          <p className="text-[11px] text-center text-slate-400">
            AI가 당신의 취향에 맞는 최적의 경로를 추천해 드립니다.
          </p>
        </div>
      </div>

      {/* Ongoing Plans Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900">
            진행 중인 계획
          </h3>
          <button 
            onClick={() => setActiveTab("itinerary")}
            className="text-xs font-semibold text-blue-400 hover:underline"
          >
            모두 보기
          </button>
        </div>

        {ongoingTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => {
              onSelectTrip(trip);
              setActiveTab("itinerary");
            }}
            className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-blue-500/50 cursor-pointer shadow-lg space-y-3 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                  {trip.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  일정의 {trip.progressPercent}% 완성됨
                </p>
              </div>
              <button className="p-1 text-slate-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${trip.progressPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
