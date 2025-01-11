import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const ActionButton = ({ onClick, isLoading }: ActionButtonProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-8 flex justify-center"
    >
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="group px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-lg font-semibold tracking-tight transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
        )}
        Text humanisieren
      </Button>
    </motion.div>
  );
};