import Hero from "../components/Hero";
import Features from "../components/Features";
import Editor from "../components/Editor";
import StyleAnalyzer from "../components/StyleAnalyzer";
import CTAButton from "../components/CTAButton";
import Discover from "../components/Discover";
import Logo from "../components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <Logo />
      </div>
      <Hero />
      <Features />
      <Discover />
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
          Erlebe den Unterschied
        </h2>
        <Editor />
      </div>
      <div className="py-20 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
          Verstehe deinen Stil
        </h2>
        <StyleAnalyzer />
      </div>
      <CTAButton />
    </div>
  );
};

export default Index;