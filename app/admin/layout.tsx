"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const theme = useTheme();

  // আপনার নিজের ইমেইল এখানে দিন
  const ADMIN_EMAIL = "mdazharulfb@gmail.com"; 

  if (status === "loading") return <div className="h-screen bg-black flex items-center justify-center text-cyan-500 font-mono animate-pulse">AUTHENTICATING...</div>;

  if (!session || session.user?.email !== ADMIN_EMAIL) {
    redirect("/"); // অ্যাডমিন না হলে হোমপেজে পাঠিয়ে দিবে
  }

  return (
    <div className="min-h-screen mt-40 bg-[#020202] text-white flex flex-col md:flex-row">
      {/* Sidebar - ড্যাশবোর্ড মেনু */}
      <aside className="w-full md:w-64 border-r border-white/5 p-6 space-y-8 backdrop-blur-xl bg-black/50">
        <div className="text-2xl font-black italic tracking-tighter uppercase">
          Azharul <span style={{ color: theme.color }}>OS</span>
        </div>
        
        <nav className="space-y-4">
          <AdminNavLink label="Overview" href="/admin" active />
          <AdminNavLink label="Inbound Messages" href="/admin/messages" />
          <AdminNavLink label="Manage Reviews" href="/admin/reviews" />
          <AdminNavLink label="System Logs" href="/admin/logs" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function AdminNavLink({ label, href, active = false }: any) {
  return (
    <a href={href} className={`block p-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${active ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
      {label}
    </a>
  );
}