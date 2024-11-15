import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-2 select-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
      >
        <PenLine className="w-6 h-6 text-white absolute" />
      </motion.div>
      <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        HumanizerAI
      </span>
    </motion.div>
  );
};

export default Logo;