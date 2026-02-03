import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, name, message, replyMessage } = await req.json();

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
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
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
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}