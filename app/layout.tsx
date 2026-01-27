import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import CustomCursor from "../components/CustomCursor";
import Header from "../components/Header";
import SpiderBackground from "../components/SpiderBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* antialiased ব্যবহার করা হয়েছে ফন্ট স্মুথ করার জন্য */}
      <body className="bg-[#050505] text-white overflow-x-hidden antialiased">
        <ThemeProvider>
          {/* ১. গ্লোবাল ব্যাকগ্রাউন্ড: এটি সবার নিচে থাকবে */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <SpiderBackground showLines={false} />
          </div>

          <CustomCursor />

          {/* ২. মেইন কন্টেন্ট লেয়ার: ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট রাখা হয়েছে */}
          <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
            <Header />
            
            <main className="flex-1 w-full bg-transparent">
              {children}
            </main>

            <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/5 bg-black/20 backdrop-blur-md">
              © {new Date().getFullYear()} MD Azharul. All rights reserved.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}