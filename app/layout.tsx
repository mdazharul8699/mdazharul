import { Metadata } from "next"; // SEO এর জন্য
import RootLayoutClient from "./RootLayoutClient"; // ক্লায়েন্ট লজিক আলাদা ফাইলে

// বস্, এই অংশটি সার্ভার সাইডে রেন্ডার হবে, যা SEO এর জন্য ১ নম্বর
export const metadata: Metadata = {
  title: "MD AZHARUL | Next.js Evangelist & Full-Stack Developer",
  description: "Official portfolio of MD AZHARUL. GPA 5.00 in SSC, Expert in Next.js, React, and Military Drone Design (Shahed-136). Building future-ready digital ecosystems.",
  keywords: ["MD AZHARUL", "Next.js Expert", "Full Stack Developer Bangladesh", "GPA 5.00 SSC", "Political Science Honours", "Shahed-136 Drone Project"],
  openGraph: {
    title: "MD AZHARUL | Next.js Evangelist",
    description: "Building robust digital ecosystems with high-performance code.",
    url: "https://your-domain.com",
    siteName: "Azharul Portfolio",
    images: [
      {
        url: "/og-image.jpg", // public ফোল্ডারে এই ছবিটা রাখতে ভুলবেন না
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD AZHARUL | Portfolio",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050505] text-white overflow-x-hidden antialiased">
        {/* সব এনিমেশন এবং থিম লজিক এই ক্লায়েন্ট কম্পোনেন্টে থাকবে */}
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}