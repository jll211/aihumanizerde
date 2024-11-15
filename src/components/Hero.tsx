import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-hero-pattern bg-cover bg-center bg-fixed overflow-hidden">
      <div className="absolute inset-0 bg-gradient-premium bg-opacity-75 backdrop-blur-sm"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen"
      >
        <div className="text-center space-y-8">
          <motion.h1 
            className="text-7xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-pulse-slow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Dein KI-Content.
            <br />
            Dein Style.
            <br />
            Deine Stimme.
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Verwandle roboterhaften KI-Content in authentische Texte mit deiner persönlichen Note.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                Jetzt starten
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;