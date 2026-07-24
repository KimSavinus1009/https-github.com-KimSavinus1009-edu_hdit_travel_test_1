import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check } from "lucide-react";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRange: (startDateStr: string, endDateStr: string, durationText: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectRange,
}) => {
  if (!isOpen) return null;

  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(10); // October

  const [startDay, setStartDay] = useState<number | null>(12);
  const [endDay, setEndDay] = useState<number | null>(15);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();

  const handleDayClick = (day: number) => {
    if (!startDay || (startDay && endDay)) {
      setStartDay(day);
      setEndDay(null);
    } else if (startDay && !endDay) {
      if (day < startDay) {
        setStartDay(day);
      } else if (day === startDay) {
        setEndDay(day);
      } else {
        setEndDay(day);
      }
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleConfirm = () => {
    if (startDay && endDay) {
      const sDate = `${currentYear}년 ${currentMonth}월 ${startDay}일`;
      const eDate = `${currentMonth}월 ${endDay}일`;
      const diffDays = endDay - startDay;
      const nights = diffDays;
      const days = diffDays + 1;
      const durationStr = `총 ${nights}박 ${days}일`;

      onSelectRange(`${sDate} - ${eDate}`, `${sDate} ~ ${eDate}`, durationStr);
    } else if (startDay) {
      const sDate = `${currentYear}년 ${currentMonth}월 ${startDay}일`;
      onSelectRange(`${sDate} (당일치기)`, `${sDate}`, "총 0박 1일");
    }
    onClose();
  };

  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">여행 기간 선택</h3>
              <p className="text-[11px] text-slate-400">출발일과 귀국일을 선택해 주세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Range Display Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold text-slate-400">선택된 일정</p>
            <p className="text-xs font-extrabold text-blue-400">
              {startDay
                ? `${currentMonth}월 ${startDay}일`
                : "출발일 선택"}{" "}
              ~{" "}
              {endDay
                ? `${currentMonth}월 ${endDay}일`
                : "귀국일 선택"}
            </p>
          </div>
          {startDay && endDay && (
            <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow">
              {endDay - startDay}박 {endDay - startDay + 1}일
            </span>
          )}
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-extrabold text-white">
            {currentYear}년 {currentMonth}월
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days Grid Header */}
        <div className="grid grid-cols-7 text-center">
          {dayLabels.map((label, idx) => (
            <span
              key={label}
              className={`text-xs font-bold py-1 ${
                idx === 0 ? "text-rose-400" : idx === 6 ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Blank cells */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`blank-${i}`} className="p-2" />
          ))}

          {/* Day Cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isStart = startDay === day;
            const isEnd = endDay === day;
            const isInRange =
              startDay && endDay && day > startDay && day < endDay;

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`py-2 text-xs font-bold rounded-xl transition-all relative ${
                  isStart || isEnd
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 z-10 scale-105"
                    : isInRange
                    ? "bg-blue-500/20 text-blue-200 border-y border-blue-500/30"
                    : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 active:scale-95 transition"
        >
          <Check className="w-4 h-4" />
          <span>선택한 기간으로 일정 적용</span>
        </button>

      </div>
    </div>
  );
};
