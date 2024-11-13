import { useState } from "react";

const Editor = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Demo transformation
    setOutput(e.target.value.replace(/KI/g, "ich").replace(/Algorithmus/g, "Prozess"));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Original</h3>
          <textarea
            className="w-full h-40 p-2 border rounded"
            value={input}
            onChange={handleInputChange}
            placeholder="Füge deinen KI-generierten Text hier ein..."
          />
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Humanisiert</h3>
          <div className="w-full h-40 p-2 border rounded bg-muted">
            {output || "Dein humanisierter Text erscheint hier..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;