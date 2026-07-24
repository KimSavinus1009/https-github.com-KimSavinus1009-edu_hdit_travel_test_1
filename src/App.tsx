import React, { useState, useEffect } from "react";
import { INITIAL_TRIPS } from "./data/mockData";
import { TabType, TravelTrip, TransportOption } from "./types";
import { Navbar } from "./components/Navbar";
import { BottomNav } from "./components/BottomNav";
import { ScreenHome } from "./components/ScreenHome";
import { ScreenTransit } from "./components/ScreenTransit";
import { ScreenPreferences } from "./components/ScreenPreferences";
import { ScreenItinerary } from "./components/ScreenItinerary";
import { ScreenProfile } from "./components/ScreenProfile";
import { MapModal } from "./components/MapModal";
import { AILoadingModal } from "./components/AILoadingModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Dark mode as default per user request
  const [trips, setTrips] = useState<TravelTrip[]>(INITIAL_TRIPS);
  const [activeTripId, setActiveTripId] = useState<string>("trip-tokyo");
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  // AI Loading state
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [aiLoadingDest, setAiLoadingDest] = useState<string>("도쿄");

  // Keep html class in sync with dark mode setting
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const currentTrip = trips.find((t) => t.id === activeTripId) || trips[0];

  // Handler for AI generation request
  const handleGenerateAI = async (
    destination: string,
    startDate: string,
    endDate: string,
    transportMode: string,
    interests: string[]
  ) => {
    setAiLoadingDest(destination);
    setIsAILoading(true);

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          transportMode,
          interests
        })
      });

      const data = await res.json();

      if (data.success && data.days) {
        const newTripId = `trip-${Date.now()}`;
        const newTrip: TravelTrip = {
          id: newTripId,
          title: data.title || `${destination} 맞춤 일정`,
          destination: destination,
          startDate: startDate || "2024년 10월 12일",
          endDate: endDate || "10월 15일",
          progressPercent: 20,
          routeOverview: data.routeOverview || `경로: ${destination} 시내 탐방`,
          transportMode: transportMode || "대중교통",
          days: data.days
        };

        setTrips([newTrip, ...trips]);
        setActiveTripId(newTripId);
      }
    } catch (err) {
      console.error("AI Generation error:", err);
    } finally {
      setTimeout(() => {
        setIsAILoading(false);
        setActiveTab("itinerary");
      }, 1200);
    }
  };

  const handleUpdateTrip = (updatedTrip: TravelTrip) => {
    setTrips(trips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
  };

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        tripTitle={currentTrip?.title}
      />

      {/* Main Screen Content */}
      <main className="transition-all">
        {activeTab === "home" && (
          <ScreenHome
            onGenerateItinerary={(dest, transport, duration, interests) =>
              handleGenerateAI(dest, "2024-10-12", "2024-10-15", transport, interests)
            }
            ongoingTrips={trips}
            onSelectTrip={(t) => setActiveTripId(t.id)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "transit" && (
          <ScreenTransit
            onSelectTransport={(opt: TransportOption) => {
              if (currentTrip) {
                handleUpdateTrip({
                  ...currentTrip,
                  transportMode: opt.title
                });
              }
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "preferences" && (
          <ScreenPreferences
            onGenerateAI={handleGenerateAI}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "itinerary" && (
          <ScreenItinerary
            currentTrip={currentTrip}
            onUpdateTrip={handleUpdateTrip}
            onOpenMapModal={() => setIsMapModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "profile" && (
          <ScreenProfile
            trips={trips}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            setActiveTab={setActiveTab}
            onSelectTrip={(t) => setActiveTripId(t.id)}
          />
        )}
      </main>

      {/* Map Modal */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        trip={currentTrip}
      />

      {/* AI Generating Loading Overlay */}
      <AILoadingModal
        isOpen={isAILoading}
        destination={aiLoadingDest}
      />

      {/* Bottom Floating Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
