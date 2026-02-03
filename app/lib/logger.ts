import clientPromise from "./mongodb-client";

export async function createLog(event: string, actor: string, description: string, status: "SUCCESS" | "FAILED" | "INFO") {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("logs").insertOne({
      event,
      actor,
      description,
      status,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Log failed to save", error);
  }
}