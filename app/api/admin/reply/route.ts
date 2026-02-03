import { createLog } from "@/app/lib/logger";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
  try {
    const { email, name, message, replyMessage } = await req.json();

    // ১. ট্রান্সপোর্টার সেটআপ (Gmail App Password ব্যবহার করে)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ২. ইমেইল টেমপ্লেট কনফিগারেশন
    const mailOptions = {
      from: `"Md Azharul" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Reply to your message - Md Azharul`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 15px; color: #1a202c; max-width: 600px; margin: auto;">
          <h2 style="color: #000;">Hello ${name},</h2>
          <p style="color: #718096; font-style: italic;">"You sent: ${message}"</p>
          <div style="height: 1px; background: #edf2f7; margin: 20px 0;"></div>
          <p style="font-weight: bold; margin-bottom: 5px;">Azharul's Response:</p>
          <p style="font-size: 16px; line-height: 1.6; color: #2d3748; background: #f7fafc; padding: 15px; border-radius: 10px;">
            ${replyMessage}
          </p>
          <br />
          <p style="margin-top: 20px;">Best Regards,<br />
          <strong style="color: #000;">Md Azharul</strong><br />
          <span style="color: #718096; font-size: 12px;">Web Developer | Specialized in MERN Stack</span></p>
        </div>
      `,
    };

    // ৩. ইমেইল পাঠানো
    await transporter.sendMail(mailOptions);

    // ৪. সিস্টেম লগে সাকসেস ইভেন্ট সেভ করা
    await createLog("REPLY_SENT", "Admin", `Successfully replied to ${email}`, "SUCCESS");

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Reply API Error:", error);
    
    // ৫. এরর হলে সেটিও লগে সেভ করা
    await createLog("REPLY_FAILED", "System", `Failed to send email to ${email}: ${error.message}`, "FAILED");
    
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}