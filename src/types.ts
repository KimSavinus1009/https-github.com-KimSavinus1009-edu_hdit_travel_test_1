export type TabType = "home" | "transit" | "preferences" | "itinerary" | "my_trips" | "profile";

export interface Destination {
  id: string;
  name: string;
  nameKr: string;
  country: string;
  imageUrl: string;
  tag: string;
  rating: number;
}

export interface TransportOption {
  id: string;
  type: "train" | "drive" | "flight" | "taxi";
  title: string;
  subtitle: string;
  priceKrw: number;
  durationText: string;
  routeInfo?: string;
  isBestChoice?: boolean;
  isEcoFriendly?: boolean;
  badge?: string;
  co2ReductionText?: string;
}

export interface InterestOption {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
  color: string;
}

export interface ScheduleItem {
  id: string;
  period: "오전" | "오후" | "저녁";
  time: string;
  placeName: string;
  category: "미식" | "관광" | "쇼핑" | "휴식" | "자연" | "액티비티" | "편의시설";
  categoryColor: string;
  description: string;
  transportNote: string;
  tags?: string[];
  imageUrl: string;
  isCompleted?: boolean;
  location?: { lat: number; lng: number };
}

export interface DayItinerary {
  dayNumber: number;
  dateLabel: string;
  schedules: ScheduleItem[];
}

export interface TravelTrip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  progressPercent: number;
  routeOverview: string;
  transportMode: string;
  days: DayItinerary[];
}
