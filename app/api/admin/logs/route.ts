import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const logs = await db.collection("logs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50) // শেষ ৫০টি লগ দেখাবে
      .toArray();
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}