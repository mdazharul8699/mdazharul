"use client";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ExternalLink, Github } from "lucide-react";

// ... (projects array আগের মতোই থাকবে)

export default function Projects() {
  const theme = useTheme();
  const projects = [
  {
    title: "E-Commerce Experience",
    tech: ["Next.js", "MongoDB", "Stripe"],
    description: "Full-featured online store with payment gateway integration and admin panel.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "AI Chat Dashboard",
    tech: ["React", "Tailwind", "OpenAI"],
    description: "Advanced analytics dashboard with AI-powered insights and real-time data.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio 2026",
    tech: ["Next.js", "Framer Motion", "GSAP"],
    description: "A high-performance premium portfolio with dynamic themes and smooth animations.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Real Estate Portal",
    tech: ["Node.js", "Express", "PostgreSQL"],
    description: "Property listing platform with advanced search filters and interactive maps.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Social Connect App",
    tech: ["React Native", "Firebase"],
    description: "Real-time social media application with chat, stories, and post features.",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Crypto Tracker",
    tech: ["JavaScript", "CoinGecko API"],
    description: "Live cryptocurrency price tracker with interactive charts and historical data.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Food Delivery UI",
    tech: ["Tailwind CSS", "Bootstrap"],
    description: "Responsive and modern UI/UX design for a premium food delivery service.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Job Portal API",
    tech: ["Node.js", "JWT", "Swagger"],
    description: "Robust RESTful API for a job portal with authentication and file uploads.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#"
  }
];

  return (
    <section id="projects" className="py-20 md:py-32">
      {/* ফোনে দুই পাশে প্যাডিং নিশ্চিত করতে px-6 যোগ করা হয়েছে */}
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">
            SELECTED <span style={{ color: theme.color }}>WORKS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects?.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-[#0d0d0d] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl"
            >
              {/* Image Box - ফোনে হাইট একটু কমানো হয়েছে (h-56) */}
              <div className="h-56 md:h-64 w-full overflow-hidden bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Content Box - ফোনে প্যাডিং p-6 এবং ডেক্সটপে p-8 */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[9px] md:text-[10px] px-2 py-1 bg-white/5 rounded border border-white/10 text-gray-400 uppercase font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-gray-500">
                    <Github size={18} className="hover:text-white transition-colors cursor-pointer" />
                    <ExternalLink size={18} className="hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:italic transition-all">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Theme Color Line */}
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full"
                    style={{ backgroundColor: theme.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}