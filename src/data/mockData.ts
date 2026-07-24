import { Destination, TransportOption, InterestOption, TravelTrip } from "../types";

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: "seoul",
    name: "Seoul",
    nameKr: "서울",
    country: "대한민국",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
    tag: "트렌디한 미식 & 쇼핑",
    rating: 4.9,
  },
  {
    id: "jeju",
    name: "Jeju",
    nameKr: "제주",
    country: "대한민국",
    imageUrl: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800&auto=format&fit=crop",
    tag: "청정 자연 & 드라이브",
    rating: 4.8,
  },
  {
    id: "kyoto",
    name: "Kyoto",
    nameKr: "교토",
    country: "일본",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
    tag: "고즈넉한 고도 & 사찰",
    rating: 4.9,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    nameKr: "도쿄",
    country: "일본",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop",
    tag: "화려한 야경 & 미식 투어",
    rating: 4.9,
  },
  {
    id: "paris",
    name: "Paris",
    nameKr: "파리",
    country: "프랑스",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop",
    tag: "낭만과 예술의 도시",
    rating: 4.7,
  }
];

export const DEFAULT_TRANSPORTS: TransportOption[] = [
  {
    id: "train",
    type: "train",
    title: "기차",
    subtitle: "암트랙 코스트 스타라이트",
    priceKrw: 85000,
    durationText: "도착 예정 6시간 15분",
    isBestChoice: true,
    isEcoFriendly: true,
    badge: "최적의 선택",
    co2ReductionText: "비행기 대비 탄소 배출량 75% 감소"
  },
  {
    id: "drive",
    type: "drive",
    title: "직접 운전",
    subtitle: "I-5 S 도로 경유 (유류비 + 통행료)",
    priceKrw: 112000,
    durationText: "도착 예정 5시간 45분",
  },
  {
    id: "flight",
    type: "flight",
    title: "항공편",
    subtitle: "SFO에서 LAX까지 (보안검색 포함)",
    priceKrw: 245000,
    durationText: "3시간 20분 (보안검색 포함)",
  },
  {
    id: "taxi",
    type: "taxi",
    title: "택시 / 카풀",
    subtitle: "도어 투 도어 편의 서비스",
    priceKrw: 420000,
    durationText: "도착 예정 5시간 50분",
  }
];

export const INTEREST_OPTIONS: InterestOption[] = [
  {
    id: "gourmet",
    title: "필수 맛집",
    description: "미슐랭 스타 레스토랑부터 현지인이 사랑하는 길거리 음식까지 망라합니다.",
    tag: "미식",
    iconName: "Utensils",
    color: "#f43f5e"
  },
  {
    id: "landmark",
    title: "유명 랜드마크",
    description: "필수 관광지, 상징적인 기념물, 역사적인 명소들을 방문합니다.",
    tag: "관광",
    iconName: "Landmark",
    color: "#3b82f6"
  },
  {
    id: "hidden",
    title: "숨겨진 명소",
    description: "비밀스러운 장소, 한적한 골목, 남들이 모르는 특별한 경험을 선사합니다.",
    tag: "어드벤처",
    iconName: "Compass",
    color: "#8b5cf6"
  },
  {
    id: "restroom",
    title: "공중 화장실 & 편의시설",
    description: "이동 경로 중 접근이 쉽고 깨끗한 편의 시설을 포함하도록 최적화합니다.",
    tag: "유틸리티",
    iconName: "Users",
    color: "#10b981"
  },
  {
    id: "cafe",
    title: "카페 투어",
    description: "엄선된 스페셜티 커피 전문점과 아늑한 애프터눈 티 명소에서의 완벽한 휴식.",
    tag: "아티잔 / 휴식",
    iconName: "Coffee",
    color: "#f59e0b"
  }
];

export const INITIAL_TRIPS: TravelTrip[] = [
  {
    id: "trip-tokyo",
    title: "도쿄 미식 & 문화 여행",
    destination: "도쿄",
    startDate: "2024년 10월 12일",
    endDate: "10월 15일",
    progressPercent: 60,
    routeOverview: "경로: 신주쿠 → 시부야 → 긴자",
    transportMode: "대중교통",
    days: [
      {
        dayNumber: 1,
        dateLabel: "1일차",
        schedules: [
          {
            id: "sch-1",
            period: "오전",
            time: "08:30",
            placeName: "츠키지 수산시장",
            category: "미식",
            categoryColor: "#ef4444",
            description: "정통 조식 스시를 맛보고 신선한 해산물 매장을 둘러보세요.",
            transportNote: "이동 20분 • 긴자선",
            tags: ["미식", "인기추천"],
            imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop",
            isCompleted: true
          },
          {
            id: "sch-2",
            period: "오후",
            time: "12:30",
            placeName: "고교 히가시 교엔",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "역사적인 일본 정원을 거닐며 평화로운 시간을 보내세요.",
            transportNote: "도보 15분 • 치요다 구역",
            tags: ["최고 평점", "친환경"],
            imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
            isCompleted: true
          },
          {
            id: "sch-3",
            period: "오후",
            time: "16:00",
            placeName: "긴자 지구",
            category: "쇼핑",
            categoryColor: "#f59e0b",
            description: "플래그십 부티크와 하이테크 쇼룸을 탐방해 보세요.",
            transportNote: "지하철 10분 이동",
            tags: ["쇼핑", "부티크"],
            imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop",
            isCompleted: false
          }
        ]
      },
      {
        dayNumber: 2,
        dateLabel: "2일차",
        schedules: [
          {
            id: "sch-4",
            period: "오전",
            time: "09:30",
            placeName: "아사쿠사 센소지 사찰",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "고즈넉한 고도 상점가 나카미세에서 전통 주전부리 탐방.",
            transportNote: "지하철 15분",
            tags: ["역사", "전통"],
            imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&auto=format&fit=crop",
            isCompleted: false
          },
          {
            id: "sch-5",
            period: "오후",
            time: "14:00",
            placeName: "시부야 스카이 전망대",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "360도 도쿄 대도시 파노라마 야경과 신주쿠 스카이라인 감상.",
            transportNote: "야마노테선 직결",
            tags: ["전망대", "핫플"],
            imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop",
            isCompleted: false
          }
        ]
      },
      {
        dayNumber: 3,
        dateLabel: "3일차",
        schedules: [
          {
            id: "sch-6",
            period: "오전",
            time: "10:30",
            placeName: "오모테산도 스페셜티 카페",
            category: "휴식",
            categoryColor: "#10b981",
            description: "핸드드립 커피와 도심 속 자작나무 가로수길 카페 산책.",
            transportNote: "도보 8분",
            tags: ["카페투어", "힐링"],
            imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop",
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: "trip-sf-la",
    title: "SF → LA 태평양 해안 로드트립",
    destination: "샌프란시스코 ~ 로스앤젤레스",
    startDate: "2024년 11월 01일",
    endDate: "11월 05일",
    progressPercent: 35,
    routeOverview: "경로: 샌프란시스코 → 몬터레이 → 빅서 → 로스앤젤레스",
    transportMode: "기차 / 차",
    days: []
  }
];
