import { motion } from "framer-motion";

interface OutputSectionProps {
  output: string;
}

export const OutputSection = ({ output }: OutputSectionProps) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-background rounded-xl p-6 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <h3 className="text-lg font-semibold mb-4 text-purple-400 tracking-tight">
        Humanisiert
      </h3>
      <div className="w-full h-[600px] bg-background border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
        {output || "Dein humanisierter Text erscheint hier..."}
      </div>
    </motion.div>
  );
};