import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // সব রিভিউ লেটেস্ট থেকে ওল্ড এই সিরিয়ালে নিয়ে আসা
    const reviews = await db.collection("reviews")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}