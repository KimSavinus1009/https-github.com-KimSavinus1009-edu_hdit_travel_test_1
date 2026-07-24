import React, { useState } from "react";
import { TravelTrip, ScheduleItem, TabType } from "../types";
import { MapPin, Maximize2, Utensils, Camera, ShoppingBag, Coffee, CheckCircle, Plus, Trash2, Edit3, Clock, Navigation, Check, Sparkles, Share2 } from "lucide-react";

interface ScreenItineraryProps {
  currentTrip: TravelTrip;
  onUpdateTrip: (updated: TravelTrip) => void;
  onOpenMapModal: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const ScreenItinerary: React.FC<ScreenItineraryProps> = ({
  currentTrip,
  onUpdateTrip,
  onOpenMapModal,
  setActiveTab
}) => {
  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [dayConfirmed, setDayConfirmed] = useState<Record<number, boolean>>({});

  // Form states for adding/editing schedule item
  const [formTime, setFormTime] = useState("18:30");
  const [formPeriod, setFormPeriod] = useState<"오전" | "오후" | "저녁">("저녁");
  const [formPlaceName, setFormPlaceName] = useState("");
  const [formCategory, setFormCategory] = useState<"미식" | "관광" | "쇼핑" | "휴식" | "자연" | "액티비티">("미식");
  const [formDescription, setFormDescription] = useState("");
  const [formTransportNote, setFormTransportNote] = useState("도보 10분");

  const currentDay = currentTrip.days.find((d) => d.dayNumber === activeDayNumber) || currentTrip.days[0];

  const handleToggleComplete = (itemId: string) => {
    const updatedDays = currentTrip.days.map((day) => {
      if (day.dayNumber === activeDayNumber) {
        return {
          ...day,
          schedules: day.schedules.map((s) =>
            s.id === itemId ? { ...s, isCompleted: !s.isCompleted } : s
          )
        };
      }
      return day;
    });

    onUpdateTrip({
      ...currentTrip,
      days: updatedDays
    });
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPlaceName.trim()) return;

    const newItem: ScheduleItem = {
      id: `sch-${Date.now()}`,
      period: formPeriod,
      time: formTime,
      placeName: formPlaceName,
      category: formCategory,
      categoryColor:
        formCategory === "미식" ? "#ef4444" : formCategory === "관광" ? "#3b82f6" : "#f59e0b",
      description: formDescription || "즐거운 시간을 보내세요.",
      transportNote: formTransportNote,
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop",
      isCompleted: false
    };

    const updatedDays = currentTrip.days.map((day) => {
      if (day.dayNumber === activeDayNumber) {
        return {
          ...day,
          schedules: [...day.schedules, newItem]
        };
      }
      return day;
    });

    onUpdateTrip({
      ...currentTrip,
      days: updatedDays
    });

    setShowAddModal(false);
    setFormPlaceName("");
    setFormDescription("");
  };

  const handleDeleteSchedule = (itemId: string) => {
    const updatedDays = currentTrip.days.map((day) => {
      if (day.dayNumber === activeDayNumber) {
        return {
          ...day,
          schedules: day.schedules.filter((s) => s.id !== itemId)
        };
      }
      return day;
    });

    onUpdateTrip({
      ...currentTrip,
      days: updatedDays
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "미식":
        return <Utensils className="w-4 h-4 text-white" />;
      case "관광":
        return <Camera className="w-4 h-4 text-white" />;
      case "쇼핑":
        return <ShoppingBag className="w-4 h-4 text-white" />;
      default:
        return <Coffee className="w-4 h-4 text-white" />;
    }
  };

  const isCurrentDayConfirmed = dayConfirmed[activeDayNumber];

  return (
    <div className="pb-28 pt-2 max-w-md mx-auto px-4 space-y-5">
      {/* Route Map Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
        <div 
          className="h-44 w-full bg-cover bg-center brightness-75 group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1000&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Floating Route Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentTrip.routeOverview || "경로: 신주쿠 → 시부야"}</span>
          </div>
          
          <button
            onClick={() => {
              const text = `${currentTrip.title} (${currentTrip.destination}) 여행 일정`;
              if (navigator.share) {
                navigator.share({ title: text, url: window.location.href }).catch(() => {});
              } else {
                alert("일정 정보가 복사되었습니다!");
              }
            }}
            className="p-2 rounded-full bg-slate-900/80 text-slate-200 hover:text-white"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Map Expand Button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onOpenMapModal}
            className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xl shadow-blue-600/40 active:scale-95 transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>지도 확대</span>
          </button>
        </div>
      </div>

      {/* Day Tabs Switcher */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex gap-2">
          {currentTrip.days.map((day) => {
            const isActive = day.dayNumber === activeDayNumber;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {day.dateLabel}
              </button>
            );
          })}
        </div>

        {/* Add Schedule Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2.5 rounded-2xl bg-slate-800 text-blue-400 border border-slate-700/80 hover:bg-blue-600 hover:text-white transition shrink-0"
          title="일정 추가"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Timeline Section */}
      <div className="space-y-6 pt-2 relative">
        {/* Vertical Timeline Thread */}
        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200" />

        {currentDay && currentDay.schedules.length > 0 ? (
          currentDay.schedules.map((schedule) => {
            return (
              <div key={schedule.id} className="relative pl-12 space-y-2 group">
                {/* Timeline Category Node Icon */}
                <div
                  className={`absolute left-2 top-0 w-8 h-8 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    schedule.category === "미식"
                      ? "bg-rose-500 shadow-rose-500/30"
                      : schedule.category === "관광"
                      ? "bg-blue-500 shadow-blue-500/30"
                      : schedule.category === "쇼핑"
                      ? "bg-amber-500 shadow-amber-500/30"
                      : "bg-emerald-500 shadow-emerald-500/30"
                  }`}
                >
                  {getCategoryIcon(schedule.category)}
                </div>

                {/* Timeline Schedule Card */}
                <div
                  className={`p-4 rounded-3xl border transition-all space-y-3 ${
                    schedule.isCompleted
                      ? "bg-slate-900/40 border-slate-800 opacity-60"
                      : "bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border-slate-800 shadow-xl"
                  }`}
                >
                  {/* Card Header image */}
                  {schedule.imageUrl && (
                    <div className="h-32 w-full rounded-2xl overflow-hidden relative shadow-inner">
                      <img
                        src={schedule.imageUrl}
                        alt={schedule.placeName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => handleToggleComplete(schedule.id)}
                          className={`p-1.5 rounded-full backdrop-blur-md transition ${
                            schedule.isCompleted
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-900/80 text-slate-300 hover:text-white"
                          }`}
                          title={schedule.isCompleted ? "완료 해제" : "방문 완료 표시"}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="p-1.5 rounded-full bg-slate-900/80 text-rose-400 hover:bg-rose-600 hover:text-white transition"
                          title="일정 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Metadata & Place Name */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                          {schedule.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {schedule.period} {schedule.time}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-base font-extrabold text-white dark:text-white light:text-slate-900 ${
                      schedule.isCompleted ? "line-through text-slate-400" : ""
                    }`}>
                      {schedule.placeName}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {schedule.description}
                    </p>

                    {/* Tags */}
                    {schedule.tags && schedule.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {schedule.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Transport Footnote */}
                  {schedule.transportNote && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-400">
                      <Navigation className="w-3.5 h-3.5 text-blue-400" />
                      <span>{schedule.transportNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="pl-12 py-8 text-center text-slate-400 text-xs">
            아직 추가된 일정이 없습니다. 우측 상단의 + 버튼을 눌러 새 일정을 추가해 보세요!
          </div>
        )}
      </div>

      {/* Completion Banner matching Screen 4 */}
      <div className="p-5 rounded-3xl bg-blue-600 text-white shadow-2xl space-y-3 mt-6">
        <h3 className="text-base font-extrabold tracking-tight">
          {activeDayNumber}일차 일정을 마치셨나요?
        </h3>
        <p className="text-xs text-blue-100 leading-relaxed">
          저녁 예약을 위해 일정을 최종 확정하시겠습니까?
        </p>

        <button
          onClick={() => {
            setDayConfirmed((prev) => ({
              ...prev,
              [activeDayNumber]: true
            }));
            alert(`${activeDayNumber}일차 일정이 확정되었습니다! 즐거운 시간 되세요 🎉`);
          }}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            isCurrentDayConfirmed
              ? "bg-emerald-500 text-white shadow-lg"
              : "bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
          }`}
        >
          {isCurrentDayConfirmed ? (
            <>
              <Check className="w-4 h-4" />
              <span>{activeDayNumber}일차 확정 완료</span>
            </>
          ) : (
            <span>일정 확정하기</span>
          )}
        </button>
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              {activeDayNumber}일차 일정 추가
            </h3>

            <form onSubmit={handleAddSchedule} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400">시간대</label>
                  <select
                    value={formPeriod}
                    onChange={(e: any) => setFormPeriod(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none"
                  >
                    <option value="오전">오전</option>
                    <option value="오후">오후</option>
                    <option value="저녁">저녁</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400">시각</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="08:30"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">장소 / 명소 이름</label>
                <input
                  type="text"
                  required
                  value={formPlaceName}
                  onChange={(e) => setFormPlaceName(e.target.value)}
                  placeholder="예: 시부야 스카이, 도쿄 타워"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">카테고리</label>
                <select
                  value={formCategory}
                  onChange={(e: any) => setFormCategory(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none"
                >
                  <option value="미식">미식</option>
                  <option value="관광">관광</option>
                  <option value="쇼핑">쇼핑</option>
                  <option value="휴식">휴식</option>
                  <option value="자연">자연</option>
                  <option value="액티비티">액티비티</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">설명</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="간단한 메모 및 활동 내용"
                  rows={2}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">이동 정보</label>
                <input
                  type="text"
                  value={formTransportNote}
                  onChange={(e) => setFormTransportNote(e.target.value)}
                  placeholder="예: 도보 10분, 지하철 15분"
                  className="w-full mt-1 p-2 rounded-xl bg-slate-800 text-xs text-white border border-slate-700 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-lg"
                >
                  추가하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
