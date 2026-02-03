import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";

const handler = NextAuth({
  // ১. মঙ্গোডিবি অ্যাডাপ্টার সেটআপ
  adapter: MongoDBAdapter(clientPromise),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ২. সেশন কনফিগারেশন (JWT ব্যবহার করা লোকালহোস্টের জন্য সবচেয়ে নিরাপদ)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ৩০ দিন পর্যন্ত লগইন থাকবে
  },

  // ৩. সিক্রেট এবং ডিবাগ মোড
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  // ৪. কলব্যাকস (ইউজারের আইডি সেশনে পাঠানোর জন্য)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  // ৫. পেজ রিডাইরেক্ট (লগইন ফেল করলে কোথায় যাবে)
  pages: {
    signIn: "/login",
    error: "/login", // যেকোনো এরর হলে লগইন পেজেই ফেরত পাঠাবে
  },
});

export { handler as GET, handler as POST };