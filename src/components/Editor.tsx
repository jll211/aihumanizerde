import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Loader2, Sparkles, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

const TEXT_TYPES = {
  standard: "Standard",
  blog: "Blogartikel",
  social: "Social Media Post",
  academic: "Akademischer Text",
  business: "Geschäftliche E-Mail",
} as const;

type TextType = keyof typeof TEXT_TYPES;

const Editor = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<TextType>("standard");
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleHumanize = async () => {
    if (!input.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte gib einen Text ein.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending request to humanize function...');
      const { data, error } = await supabase.functions.invoke('humanize', {
        body: { 
          text: input,
          type: selectedType 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response:', data);

      // Make sure we're accessing the humanizedText property from the response
      if (data && typeof data.humanizedText === 'string') {
        setOutput(data.humanizedText);
        
        toast({
          title: "Erfolg!",
          description: "Dein Text wurde erfolgreich humanisiert.",
        });
      } else {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Fehler",
        description: "Konnte den Text nicht humanisieren. Bitte versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-6"
    >
      <div className="mb-6 flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-48 bg-background border-gray-800">
              {TEXT_TYPES[selectedType]}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-background border-gray-800">
            {Object.entries(TEXT_TYPES).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setSelectedType(key as TextType)}
                className="cursor-pointer"
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-background rounded-xl p-6 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold mb-4 text-blue-400 tracking-tight">Original</h3>
          <Textarea
            className="w-full h-[600px] bg-background border-gray-800 rounded-lg resize-none font-mono text-sm"
            value={input}
            onChange={handleInputChange}
            placeholder="Füge deinen KI-generierten Text hier ein..."
          />
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-background rounded-xl p-6 border border-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold mb-4 text-purple-400 tracking-tight">Humanisiert</h3>
          <div className="w-full h-[600px] bg-background border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || "Dein humanisierter Text erscheint hier..."}
          </div>
        </motion.div>
      </div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <Button 
          onClick={handleHumanize} 
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
    </motion.div>
  );
};

export default Editor;