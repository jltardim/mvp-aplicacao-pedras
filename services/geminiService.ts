import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { UploadedImage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStonePlacement = async (
  locationImage: UploadedImage,
  stoneName: string,
  applicationArea: string
): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: locationImage.mimeType,
        data: locationImage.base64,
      },
    };

    const textPart = {
      text: `Aplique de forma realista a pedra chamada "${stoneName}" na seguinte área da imagem: "${applicationArea}". Mantenha o restante da imagem, a iluminação e as sombras consistentes.`,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content.parts ?? []) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
    }

    throw new Error("Nenhuma imagem foi gerada. Tente novamente.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Não foi possível gerar a imagem. Verifique o console para mais detalhes.");
  }
};