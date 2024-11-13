import Hero from "../components/Hero";
import Features from "../components/Features";
import Editor from "../components/Editor";
import StyleAnalyzer from "../components/StyleAnalyzer";
import CTAButton from "../components/CTAButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Erlebe den Unterschied
        </h2>
        <Editor />
      </div>
      <div className="py-20 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-12">
          Verstehe deinen Stil
        </h2>
        <StyleAnalyzer />
      </div>
      <CTAButton />
    </div>
  );
};

export default Index;