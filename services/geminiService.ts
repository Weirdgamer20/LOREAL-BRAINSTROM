
import { GoogleGenAI, Type } from "@google/genai";
import { UserResponses, Recommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateScentRecommendations(responses: UserResponses): Promise<Recommendation[]> {
  const prompt = `Act as a master luxury perfumer and UX architect. 
  Based on these user emotional inputs: ${JSON.stringify(responses)}, 
  generate 3 distinct "Scent Directions". 
  Focus on abstract metaphors and emotional descriptions. 
  Do not use technical fragrance notes (e.g. no "Citrus", "Patchouli"). 
  Use language like "Luminous Silks", "Forgotten Shadows", "Morning Dew on Granite".`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            metaphor: { type: Type.STRING },
            description: { type: Type.STRING },
            visualCue: { type: Type.STRING, description: "A hex color code representing the scent's mood" }
          },
          required: ["id", "title", "metaphor", "description", "visualCue"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse recommendations", e);
    return [];
  }
}

export async function createScentIdentity(baseRec: Recommendation, refinements: any): Promise<string> {
    const prompt = `Create a poetic "Digital Scent Passport" identity description for a perfume named after the direction "${baseRec.title}". 
    The user refined it with: Intensity ${refinements.intensity}%, Warmth ${refinements.warmth}%, Brightness ${refinements.brightness}%.
    Describe it as a legacy object, focusing on character and time.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    
    return response.text || "A unique blend of your emotional essence.";
}
