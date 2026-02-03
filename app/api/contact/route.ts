import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // ভ্যালিডেশন
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "সবগুলো ঘর পূরণ করুন!" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // কন্টাক্ট ডাটা সেভ
    const result = await db.collection("contacts").insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "মেসেজ সফলভাবে পাঠানো হয়েছে! আজহারুল দ্রুত আপনার সাথে যোগাযোগ করবে।" 
    });

  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, error: "সার্ভার এরর!" }, { status: 500 });
  }
}