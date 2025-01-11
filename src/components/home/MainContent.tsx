import { motion } from "framer-motion";
import Editor from "../Editor";

const MainContent = () => {
  return (
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
  );
};

export default MainContent;