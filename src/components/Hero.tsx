import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="gradient-bg min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Dein KI-Content. Dein Style. Deine Stimme.
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Verwandle roboterhaften KI-Content in authentische Texte mit deiner persönlichen Note.
        </p>
        <button className="button-secondary inline-flex items-center gap-2">
          Jetzt starten <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;