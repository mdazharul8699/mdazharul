import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    
    // সব মেসেজ নতুন থেকে পুরনো হিসেবে নিয়ে আসবে
    const messages = await db.collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}