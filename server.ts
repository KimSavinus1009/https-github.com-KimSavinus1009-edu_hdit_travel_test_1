import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // API Endpoint for AI Travel Itinerary Generation
  app.post("/api/generate-itinerary", async (req, res) => {
    const { destination, startDate, endDate, transportMode, interests, customPrompt } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Returning fallback sample itinerary.");
      return res.json({
        success: true,
        isSample: true,
        destination: destination || "도쿄",
        title: `${destination || "도쿄"} 맞춤 여행 일정`,
        routeOverview: "경로: 신주쿠 → 긴자 → 아키하바라 → 시부야",
        days: getFallbackDays(destination || "도쿄")
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const promptText = `
너는 전문 여행 컨시어지 AI "TripMaster"이다.
사용자의 여행 요청:
- 목적지: ${destination || "도쿄"}
- 일정: ${startDate || "2024-10-12"} ~ ${endDate || "2024-10-15"}
- 주요 이동수단: ${transportMode || "대중교통"}
- 선호 관심사: ${interests && interests.length > 0 ? interests.join(", ") : "맛집, 랜드마크, 카페"}
${customPrompt ? `- 기타 요구사항: ${customPrompt}` : ""}

다음 JSON 구조에 맞추어 2~3일 치 일정을 작성하라:
{
  "title": "도쿄 미식 & 문화 여행",
  "routeOverview": "경로: 신주쿠 → 긴자 → 시부야",
  "days": [
    {
      "dayNumber": 1,
      "dateLabel": "1일차",
      "schedules": [
        {
          "period": "오전",
          "time": "08:30",
          "placeName": "츠키지 수산시장",
          "category": "미식",
          "categoryColor": "#ef4444",
          "description": "정통 조식 스시를 맛보고 신선한 해산물 매장을 둘러보세요.",
          "transportNote": "이동 20분 • 긴자선",
          "tags": ["인기맛집", "조식스시"],
          "imageUrl": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop"
        }
      ]
    }
  ]
}
category는 ["미식", "관광", "쇼핑", "휴식", "자연", "액티비티"] 중 선택.
imageUrl은 한국어로 된 실제 명소에 어울리는 고화질 Unsplash 이미지 URL(예: Japan/Tokyo/Seoul/Jeju/Paris/Kyoto 주제 사진)을 제공해줘.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              routeOverview: { type: Type.STRING },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayNumber: { type: Type.INTEGER },
                    dateLabel: { type: Type.STRING },
                    schedules: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          period: { type: Type.STRING },
                          time: { type: Type.STRING },
                          placeName: { type: Type.STRING },
                          category: { type: Type.STRING },
                          categoryColor: { type: Type.STRING },
                          description: { type: Type.STRING },
                          transportNote: { type: Type.STRING },
                          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                          imageUrl: { type: Type.STRING }
                        },
                        required: ["period", "time", "placeName", "category", "description", "transportNote"]
                      }
                    }
                  },
                  required: ["dayNumber", "dateLabel", "schedules"]
                }
              }
            },
            required: ["title", "routeOverview", "days"]
          }
        }
      });

      const itineraryData = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        isSample: false,
        destination: destination || "도쿄",
        ...itineraryData
      });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.json({
        success: true,
        isSample: true,
        errorNote: err?.message || "AI 생성 제한으로 샘플 일정을 불러왔습니다.",
        destination: destination || "도쿄",
        title: `${destination || "도쿄"} 맞춤 여행 일정`,
        routeOverview: "경로: 신주쿠 → 긴자 → 시부야",
        days: getFallbackDays(destination || "도쿄")
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TripMaster Express server listening on http://0.0.0.0:${PORT}`);
  });
}

function getFallbackDays(dest: string) {
  const d = dest.toLowerCase();
  if (d.includes("제주") || d.includes("jeju")) {
    return [
      {
        dayNumber: 1,
        dateLabel: "1일차",
        schedules: [
          {
            period: "오전",
            time: "09:00",
            placeName: "성산일출봉",
            category: "자연",
            categoryColor: "#10b981",
            description: "유네스코 세계자연유산의 웅장한 일출 전망대 탐방.",
            transportNote: "차량 25분 이동",
            tags: ["자연경관", "세계유산"],
            imageUrl: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800&auto=format&fit=crop"
          },
          {
            period: "오후",
            time: "12:30",
            placeName: "동문재래시장 흑돼지 식당",
            category: "미식",
            categoryColor: "#f43f5e",
            description: "제주 특산 흑돼지구이와 고기국수로 든든한 점심 정식.",
            transportNote: "도보 10분 내 식당가",
            tags: ["제주미식", "최고평점"],
            imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
          },
          {
            period: "오후",
            time: "16:00",
            placeName: "협재 해수욕장 카페거리",
            category: "휴식",
            categoryColor: "#3b82f6",
            description: "에메랄드빛 바다 전망 테라스에서 감성 애프터눈 티 타임.",
            transportNote: "버스로 40분 이동",
            tags: ["바다뷰", "감성카페"],
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
          }
        ]
      },
      {
        dayNumber: 2,
        dateLabel: "2일차",
        schedules: [
          {
            period: "오전",
            time: "10:00",
            placeName: "한라산 영실 코스 입구",
            category: "자연",
            categoryColor: "#10b981",
            description: "사계절이 아름다운 숲길 트레킹과 주상절리 감상.",
            transportNote: "렌터카 35분",
            tags: ["힐링", "트레킹"],
            imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop"
          }
        ]
      }
    ];
  }

  if (d.includes("서울") || d.includes("seoul")) {
    return [
      {
        dayNumber: 1,
        dateLabel: "1일차",
        schedules: [
          {
            period: "오전",
            time: "09:30",
            placeName: "경복궁 & 한옥마을",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "조선 왕조의 으뜸 궁궐 탐방 및 한복 체험.",
            transportNote: "지하철 3호선 안국역",
            tags: ["전통문화", "궁궐산책"],
            imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop"
          },
          {
            period: "오후",
            time: "13:00",
            placeName: "성수동 카페거리",
            category: "미식",
            categoryColor: "#f43f5e",
            description: "트렌디한 팝업 스토어와 베이커리 스페셜티 카페 투어.",
            transportNote: "지하철 2호선 성수역",
            tags: ["핫플레이스", "디저트"],
            imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop"
          }
        ]
      },
      {
        dayNumber: 2,
        dateLabel: "2일차",
        schedules: [
          {
            period: "오후",
            time: "18:00",
            placeName: "N서울타워 & 남산 야경",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "서울 도심 전경을 한눈에 담는 시그니처 전망대.",
            transportNote: "케이블카 15분",
            tags: ["야경 hotspot", "데이트"],
            imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&auto=format&fit=crop"
          }
        ]
      }
    ];
  }

  if (d.includes("파리") || d.includes("paris")) {
    return [
      {
        dayNumber: 1,
        dateLabel: "1일차",
        schedules: [
          {
            period: "오전",
            time: "09:00",
            placeName: "에펠탑 & 샤요 궁전",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "파리의 상징 에펠탑 전망대와 센강 수변 정원 산책.",
            transportNote: "RER C선 잔드마르스역",
            tags: ["랜드마크", "인생샷"],
            imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop"
          },
          {
            period: "오후",
            time: "14:00",
            placeName: "루브르 박물관",
            category: "관광",
            categoryColor: "#3b82f6",
            description: "모나리자와 밀로의 비너스를 영접하는 세계 최고 미술관 관람.",
            transportNote: "지하철 1호선 Palais Royal",
            tags: ["예술", "역사탐방"],
            imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop"
          }
        ]
      }
    ];
  }

  // Generic fallback using user specified destination name!
  return [
    {
      dayNumber: 1,
      dateLabel: "1일차",
      schedules: [
        {
          period: "오전",
          time: "09:00",
          placeName: `${dest} 중심가 & 대표 명소`,
          category: "관광",
          categoryColor: "#3b82f6",
          description: `${dest}의 역사와 문화가 담긴 시그니처 랜드마크 방문.`,
          transportNote: "도보 및 대중교통 이동",
          tags: ["시티투어", "랜드마크"],
          imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
        },
        {
          period: "오후",
          time: "12:30",
          placeName: `${dest} 미식 거리의 로컬 맛집`,
          category: "미식",
          categoryColor: "#f43f5e",
          description: "현지인들이 극찬하는 대표 시그니처 음식을 맛보는 미식 타임.",
          transportNote: "도보 10분",
          tags: ["로컬미식", "인기맛집"],
          imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
        },
        {
          period: "오후",
          time: "16:00",
          placeName: `${dest} 감성 카페 & 쇼핑 거리`,
          category: "쇼핑",
          categoryColor: "#f59e0b",
          description: "특색 있는 스페셜티 커피를 마시며 여유로운 쇼핑 및 산책.",
          transportNote: "이동 15분",
          tags: ["감성카페", "쇼핑"],
          imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      dayNumber: 2,
      dateLabel: "2일차",
      schedules: [
        {
          period: "오전",
          time: "10:00",
          placeName: `${dest} 힐링 공원 & 야경 스팟`,
          category: "휴식",
          categoryColor: "#10b981",
          description: "아름다운 풍경과 야경을 즐길 수 있는 산책 및 휴식 코스.",
          transportNote: "차량 20분",
          tags: ["야경전망", "힐링"],
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
        }
      ]
    }
  ];
}

startServer();
