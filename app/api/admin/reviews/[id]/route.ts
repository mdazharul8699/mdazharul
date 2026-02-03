import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";

// ডিলিট করার জন্য
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("reviews").deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// এডিট (Status Update) করার জন্য
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("reviews").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status: status } }
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}