import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";

// ১. ডিলিট করার জন্য (DELETE)
export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // এখানে Promise ব্যবহার করতে হবে
) {
  try {
    const { id } = await params; // params-কে await করতে হবে
    const client = await clientPromise;
    const db = client.db("portfolio");
    
    await db.collection("reviews").deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ২. এডিট করার জন্য (PATCH)
export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // এখানেও Promise
) {
  try {
    const { id } = await params; // params-কে await করতে হবে
    const { status } = await req.json();
    
    const client = await clientPromise;
    const db = client.db("portfolio");
    
    await db.collection("reviews").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}