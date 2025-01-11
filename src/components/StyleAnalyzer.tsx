import { ChartBar } from "lucide-react";
import { motion } from "framer-motion";

const StyleAnalyzer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-premium p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
            <ChartBar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Stilanalyse</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Satzlänge</span>
              <span>75%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Emotionalität</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Formalität</span>
              <span>60%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StyleAnalyzer;