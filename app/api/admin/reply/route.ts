import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createLog } from "@/app/lib/logger";

export async function POST(req: Request) {
  // ১. ইমেইল ভেরিয়েবলটি বাইরে ডিক্লেয়ার করুন যাতে ক্যাচ ব্লক এটি পায়
  let userEmail = "Unknown"; 

  try {
    const { email, name, message, replyMessage } = await req.json();
    userEmail = email; // এখানে ভ্যালু এসাইন করুন

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Md Azharul" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Reply to your message - Md Azharul`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2>Hello ${name},</h2>
          <p>You sent: "<em>${message}</em>"</p>
          <hr />
          <p><strong>Azharul's Reply:</strong></p>
          <p style="font-size: 16px; color: #333;">${replyMessage}</p>
          <br />
          <p>Best Regards,<br /><strong>Md Azharul</strong><br />Web Developer</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    await createLog("REPLY_SENT", "Admin", `Successfully replied to ${email}`, "SUCCESS");

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Reply API Error:", error);
    
    // ২. এখন userEmail এখানে কাজ করবে
    await createLog("REPLY_FAILED", "System", `Failed to send email to ${userEmail}: ${error.message}`, "FAILED");
    
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}