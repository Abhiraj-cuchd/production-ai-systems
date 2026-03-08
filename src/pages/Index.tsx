import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import FocusAreas from "@/components/portfolio/FocusAreas";
import Projects from "@/components/portfolio/Projects";
import Approach from "@/components/portfolio/Approach";
import BlogPreview from "@/components/portfolio/BlogPreview";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navigation />
      <main>
        <Hero />
        <About />
        <FocusAreas />
        <Projects />
        <Approach />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
