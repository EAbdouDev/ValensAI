// app/api/ai-response/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(request: NextRequest) {
  const { caseDetails, question } = await request.json();

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are an AI simulating a patient based on dynamic case details provided...",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I'm ready to simulate a patient based on the case details you provide...",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: `here are the case details: ${caseDetails}` }],
      },
    ],
  });

  const result = await chatSession.sendMessage(`${question}`);
  const jsonResponse =
    result.response.candidates?.[0].content.parts[0].text || "{}";

  console.log(jsonResponse);
  return NextResponse.json({ response: JSON.parse(jsonResponse) });
}
