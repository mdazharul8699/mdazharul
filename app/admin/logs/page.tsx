"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiTerminal, FiShield, FiAlertCircle } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function SystemLogs() {
  const theme = useTheme();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/api/admin/logs").then(res => res.json()).then(data => setLogs(data));
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">
          System <span style={{ color: theme.color }}>Logs</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] tracking-widest mt-1 uppercase">
          Real-time event auditing and security monitoring
        </p>
      </header>

      <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[10px] font-mono text-gray-500 ml-2">TERMINAL_V1.0.4</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/5 uppercase">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Event</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any, i: number) => (
                <motion.tr 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  key={log._id}
                  className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                >
                  <td className="p-4 text-gray-600">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold" style={{ color: theme.color }}>
                      {log.event}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{log.description}</td>
                  <td className="p-4">
                    <span className={log.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}>
                      ● {log.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}