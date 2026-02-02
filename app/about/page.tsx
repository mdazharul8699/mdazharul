
import About from "@/components/About";
import AboutPage from "./AboutPage";
export default function about() {
  return (
    <main>
        <div className="pt-20"> 
            <About />
        </div>
      <AboutPage />
      {/* অন্য সেকশনগুলো এখানে যোগ হবে */}
    </main>
  );
}