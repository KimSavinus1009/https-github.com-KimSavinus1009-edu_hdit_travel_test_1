import React, { useState } from "react";
import { TravelTrip } from "../types";
import { X, MapPin, Navigation, Compass, Layers, ZoomIn, ZoomOut } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TravelTrip;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, trip }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const sampleWaypoints = [
    { name: "신주쿠역 (출발)", desc: "도쿄 서부 교통 허브", type: "start", color: "#3b82f6" },
    { name: "츠키지 수산시장", desc: "오전 08:30 스시 정식", type: "stop", color: "#ef4444" },
    { name: "고교 히가시 교엔", desc: "오후 12:30 산책", type: "stop", color: "#3b82f6" },
    { name: "긴자 지구 (도착)", desc: "오후 16:00 쇼핑 & 탐방", type: "end", color: "#f59e0b" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3">
      <div className="w-full max-w-md h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">경로 지도 및 최적 동선</h3>
              <p className="text-xs text-slate-400">{trip.routeOverview || "신주쿠 → 긴자 → 시부야"}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Map Canvas Container */}
        <div className="flex-1 relative bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Simulated Dark Mode Map Grid Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 opacity-80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&auto=format&fit=crop')",
              transform: `scale(${zoomLevel})`
            }}
          />

          <div className="absolute inset-0 bg-slate-950/60 backdrop-brightness-75" />

          {/* Route Connection Lines Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 60 120 Q 180 180 300 240 T 220 380"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
          </svg>

          {/* Interactive Map Waypoint Pins */}
          <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between pointer-events-auto">
            {sampleWaypoints.map((pt, idx) => (
              <div
                key={pt.name}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl max-w-[280px] backdrop-blur-md hover:scale-105 transition-transform"
                style={{
                  alignSelf: idx % 2 === 0 ? "flex-start" : "flex-end"
                }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg"
                  style={{ backgroundColor: pt.color }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{pt.name}</h4>
                  <p className="text-[10px] text-slate-400">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-2 z-20">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2))}
              className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-white hover:bg-slate-800"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
              className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-white hover:bg-slate-800"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Directions Summary Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center gap-1.5 text-blue-400">
              <Navigation className="w-4 h-4" />
              총 예상 이동시간: 45분
            </span>
            <span className="text-slate-400">총 3개 명소</span>
          </div>
          <p className="text-[11px] text-slate-400">
            지하철 긴자선 및 도보 이용 시 가장 빠른 경로입니다.
          </p>
        </div>

      </div>
    </div>
  );
};
