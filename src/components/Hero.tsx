import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-wave opacity-20 animate-wave"></div>
      <div className="relative max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Dein KI-Content.
            <br />
            Dein Style.
            <br />
            Deine Stimme.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Verwandle roboterhaften KI-Content in authentische Texte mit deiner persönlichen Note.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 flex items-center gap-2">
              Jetzt starten
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;