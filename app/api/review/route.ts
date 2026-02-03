import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function POST(req: Request) {
  try {
    const { email, name, image, message } = await req.json();

    // ১. ডাটাবেজ কানেক্ট করা
    const client = await clientPromise;
    const db = client.db(); // এটি আপনার MONGODB_URI তে দেওয়া ডাটাবেজ (portfolio) ব্যবহার করবে

    // ২. সরাসরি মঙ্গোডিবি ড্রাইভারে ডাটা ইনসার্ট করা
    const result = await db.collection("reviews").insertOne({
      userEmail: email,
      userName: name,
      userImage: image,
      message: message,
      createdAt: new Date(),
    });

    if (result.insertedId) {
      console.log("✅ Review successfully saved to MongoDB!");
      return NextResponse.json({ success: true, message: "রিভিউ সেভ হয়েছে বস্!" });
    } else {
      throw new Error("Failed to insert review");
    }

  } catch (error: any) {
    console.error("❌ API Review Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "সার্ভার এরর!" 
    }, { status: 500 });
  }
}