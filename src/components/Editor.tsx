import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const Editor = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.humanizedText);
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-muted rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">Original</h3>
          <Textarea
            className="w-full min-h-[500px] bg-background border-gray-800 rounded-lg resize-none font-mono text-sm"
            value={input}
            onChange={handleInputChange}
            placeholder="Füge deinen KI-generierten Text hier ein..."
          />
        </div>
        <div className="bg-muted rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Humanisiert</h3>
          <div className="w-full min-h-[500px] bg-background border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
            {output || "Dein humanisierter Text erscheint hier..."}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleHumanize} 
          disabled={isLoading}
          className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-lg font-medium transition-all duration-300"
        >
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Text humanisieren
        </Button>
      </div>
    </div>
  );
};

export default Editor;