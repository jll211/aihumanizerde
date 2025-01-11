import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-premium bg-opacity-75 backdrop-blur-sm"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-6xl mx-auto px-4 flex flex-col items-center justify-center"
      >
        <div className="text-center space-y-8">
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Transform your AI-generated content into natural, human-like text.
          </motion.p>
        </div>
      </motion.div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;