import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // ডাটাবেজ থেকে কমান্ড পাঠিয়ে চেক করা
    await db.command({ ping: 1 });
    
    console.log("✅ LIVE CHECK: MongoDB is perfectly connected to your Portfolio!");
    
    return NextResponse.json({ 
      status: "Connected", 
      message: "বস্, ডাটাবেজ একদম রেডি!" 
    });
  } catch (e) {
    console.error("❌ LIVE CHECK ERROR:", e);
    return NextResponse.json({ 
      status: "Error", 
      message: "কানেকশন ফেল করেছে!" 
    }, { status: 500 });
  }
}