
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    sentiment: {
      type: Type.STRING,
      enum: ['Positive', 'Negative', 'Neutral'],
      description: "The overall sentiment of the journal entry."
    },
    emotions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 2-5 primary emotions detected in the text (e.g., Joy, Sadness, Anger, Fear, Surprise)."
    },
    triggers: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 1-3 potential emotional triggers mentioned in the text (e.g., 'Work stress', 'Family conflict', 'Positive social interaction')."
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 2-3 actionable, personalized coping strategies or wellness suggestions based on the entry's content."
    },
    summary: {
      type: Type.STRING,
      description: "A concise, one-sentence summary of the journal entry."
    }
  },
  required: ['sentiment', 'emotions', 'triggers', 'suggestions', 'summary'],
};

export async function analyzeJournalEntry(text: string): Promise<AnalysisResult> {
  const prompt = `Analyze the following journal entry: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are Mindflow, an empathetic AI journaling assistant. Analyze journal entries to identify sentiment, emotions, and potential triggers. Provide a concise summary and constructive, personalized wellness suggestions to help the user understand their thoughts and feelings. Respond with a JSON object that follows the specified schema.",
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.5,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing entry with Gemini:", error);
    throw error;
  }
}
