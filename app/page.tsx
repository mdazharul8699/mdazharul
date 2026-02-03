import { Metadata } from "next";
import Education from "@/components/Education";
import Hero from "../components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import GameHub from "@/components/GameHub";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AiChatbot from "@/components/AiChatbot";
import Pricing from "@/components/Pricing";
import BlogSection from "@/components/BlogSection";
import ReviewSection from "@/components/ReviewSection";
import FloatingReview from "@/components/FloatingReview";
// ... অন্যান্য ইমপোর্টগুলো আগের মতোই থাকবে

// বস্, এই পার্টটুকুই আপনার সাইটের SEO কন্ট্রোল করবে
export const metadata: Metadata = {
  title: "MD AZHARUL | Next.js Evangelist & Full-Stack Architect",
  description: "Official portfolio of MD AZHARUL, a Full-Stack Developer specializing in Next.js, React, and Robust Web Applications. Explore my projects, skills, and academic journey.",
  keywords: ["MD AZHARUL", "Next.js Developer Bangladesh", "Full-Stack Developer", "React Architect", "Web Developer Khulna", "Shahed-136 Drone Project"],
  authors: [{ name: "MD AZHARUL" }],
  
  // ফেসবুক এবং লিঙ্কডইনের জন্য প্রিভিউ (OpenGraph)
  openGraph: {
    title: "MD AZHARUL | Portfolio",
    description: "Building robust digital ecosystems with high-performance code.",
    url: "https://your-domain.com", // এখানে আপনার আসল ডোমেইন দিন
    siteName: "MD AZHARUL Portfolio",
    images: [
      {
        url: "/og-image.jpg", // public ফোল্ডারে ১২০০x৬৩০ সাইজের একটি ছবি রাখুন
        width: 1200,
        height: 630,
        alt: "MD AZHARUL Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // টুইটার/এক্স প্রিভিউ
  twitter: {
    card: "summary_large_image",
    title: "MD AZHARUL | Next.js Developer",
    description: "Full-Stack Architect specializing in high-performance web solutions.",
    images: ["/og-image.jpg"],
  },

  // রোবট ইনডেক্সিং (গুগলকে ইনডেক্স করতে বলা)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <About />
      <Education />
      <GameHub />
      <Pricing />
     <BlogSection /> 
     <ReviewSection />
      <Projects />
      <Contact />
      <FloatingReview />
      <AiChatbot />
    </main>
  );
}