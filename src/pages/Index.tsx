import Hero from "../components/Hero";
import Features from "../components/Features";
import Editor from "../components/Editor";
import StyleAnalyzer from "../components/StyleAnalyzer";
import CTAButton from "../components/CTAButton";
import Discover from "../components/Discover";
import Logo from "../components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="p-6">
        <Logo />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-7xl md:text-8xl font-extrabold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-pulse-slow mb-8">
          KI-Texte
          <br />
          Menschlich Machen
        </h1>
        
        <p className="text-xl md:text-2xl text-center text-gray-300 max-w-2xl mx-auto font-light tracking-tight mb-12">
          Der leistungsstärkste AI Humanizer für natürlich klingende Texte
        </p>

        <Editor />
      </div>

      <div className="py-20">
        <Features />
      </div>

      <div className="py-20">
        <Discover />
      </div>

      <div className="py-20">
        <StyleAnalyzer />
      </div>

      <CTAButton />
    </div>
  );
};

export default Index;