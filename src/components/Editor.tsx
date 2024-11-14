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
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Original</h3>
          <Textarea
            className="w-full min-h-[400px] p-2 border rounded resize-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Füge deinen KI-generierten Text hier ein..."
          />
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Humanisiert</h3>
          <div className="w-full min-h-[400px] p-2 border rounded bg-muted overflow-y-auto whitespace-pre-wrap">
            {output || "Dein humanisierter Text erscheint hier..."}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Button 
          onClick={handleHumanize} 
          disabled={isLoading}
          className="button-primary"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Text humanisieren
        </Button>
      </div>
    </div>
  );
};

export default Editor;