
import { GoogleGenAI } from "@google/genai";
import { LISTINGS } from "../mockData";
import { Listing } from "../types";

// Helper to search listings locally based on AI parameters
const searchListings = (cityId?: string, maxPrice?: number): Listing[] => {
  return LISTINGS.filter(l => {
    let match = true;
    if (cityId && l.cityId !== cityId) match = false;
    if (maxPrice && l.price > maxPrice) match = false;
    return match;
  }).slice(0, 3); // Limit to 3
};

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<{ text: string; listings?: Listing[]; groundingChunks?: any[] }> => {
  try {
    // Note: In a real production app, never expose API key in client code.
    // This is for prototype demonstration only.
    const apiKey = process.env.API_KEY || ''; 
    
    if (!apiKey) {
      // Mock response if no API key is provided
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (message.includes('USC') || message.includes('洛杉矶')) {
        return {
            text: "收到了！为您找到洛杉矶 USC 附近的精选房源。这些公寓都支持拎包入住，包含家具和水电网。",
            listings: searchListings('la')
        }
      }
       if (message.includes('NYU') || message.includes('纽约')) {
        return {
            text: "纽约 NYU 附近的房源非常抢手。这里有几个位于 LIC 和曼哈顿的优质全包公寓推荐给您。",
            listings: searchListings('nyc')
        }
      }
      return {
        text: "我是柚子找房的 AI 助手。请告诉我您想去的学校或城市（例如：USC, NYU），以及您的预算，我会为您推荐合适的“拎包入住”房源！",
        listings: []
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Updated System Instruction for Maps Grounding and ID Tagging
    const systemInstruction = `
      You are the AI assistant for "Youzihouse" (柚子找房), a platform for Chinese students studying abroad.
      Your goal is to help students find housing and provide accurate location information using Google Maps.
      
      We have a database of listings:
      ${JSON.stringify(LISTINGS.map(l => ({
        id: l.id, 
        title: l.title, 
        city: l.cityId, 
        price: l.price,
        locationName: l.distanceToSchool
      })))}
      
      Instructions:
      1. **Google Maps**: Use the 'googleMaps' tool to answer questions about location, distance, nearby amenities (restaurants, gyms, etc.), or to verify addresses.
      2. **Recommendations**: If a user's request matches our listings, recommend them enthusiastically.
      3. **Format**: 
         - When you recommend a specific listing from our database, you MUST include its ID in the text using this format: [[LISTING_ID:id]] (e.g., [[LISTING_ID:1]]).
         - Do NOT output JSON. Reply in natural, friendly Chinese.
      
      Example Response:
      "根据地图显示，Lorenzo 公寓距离 USC 校园仅 10 分钟步行路程 [[LISTING_ID:1]]。如果您喜欢更安静的环境，Element 30 也是不错的选择 [[LISTING_ID:2]]。"
    `;

    const model = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleMaps: {} }], // Enable Maps Grounding
      },
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ]
    });

    const response = await model;
    const text = response.text || "抱歉，暂时无法获取信息。";
    
    // 1. Extract Grounding Metadata (Maps Links)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // 2. Extract Listing IDs from the text tags [[LISTING_ID:x]]
    const listingIds: string[] = [];
    const regex = /\[\[LISTING_ID:\s*(\w+)\]\]/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      listingIds.push(match[1]);
    }
    
    // 3. Clean the text (remove the ID tags for display)
    const cleanText = text.replace(/\[\[LISTING_ID:\s*\w+\]\]/g, '');

    const listings = LISTINGS.filter(l => listingIds.includes(l.id));

    return {
      text: cleanText,
      listings,
      groundingChunks
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "抱歉，网络有点小问题。但我可以为您推荐一些热门房源！",
      listings: searchListings('la')
    };
  }
};
