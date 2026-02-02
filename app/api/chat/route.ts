import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userText } = await req.json();
    const apiKey = "AIzaSyD5GWgJHyHo2eFx01ItLG7Qz-ZJfhuwsvw"; 

    // এই এন্ডপয়েন্টটি গুগলের সবচেয়ে লেটেস্ট এবং অটো-ভার্সন কন্ট্রোলড
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Google Error Details:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return NextResponse.json({ text: aiText });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}