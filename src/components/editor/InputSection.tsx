import { motion } from "framer-motion";
import { Textarea } from "../ui/textarea";

interface InputSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputSection = ({ value, onChange }: InputSectionProps) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-background rounded-xl p-6 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <h3 className="text-lg font-semibold mb-4 text-blue-400 tracking-tight">
        Original
      </h3>
      <Textarea
        className="w-full h-[600px] bg-background border-gray-800 rounded-lg resize-none font-mono text-sm"
        value={value}
        onChange={onChange}
        placeholder="Füge deinen KI-generierten Text hier ein..."
      />
    </motion.div>
  );
};