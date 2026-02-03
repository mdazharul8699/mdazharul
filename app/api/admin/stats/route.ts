import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    // একসাথে মেসেজ এবং রিভিউ কাউন্ট করা
    const [messageCount, reviewCount] = await Promise.all([
      db.collection("contacts").countDocuments(),
      db.collection("reviews").countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      messages: messageCount,
      reviews: reviewCount,
      // আপনি চাইলে এখানে আরও ডেটা যোগ করতে পারেন
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}