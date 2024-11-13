import { ChartBar } from "lucide-react";

const StyleAnalyzer = () => {
  return (
    <div className="bg-white p-6 rounded-xl max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <ChartBar className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Style-Analyse Demo</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-muted p-4 rounded">
          <p className="text-sm font-medium mb-2">Satzlänge</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }}></div>
          </div>
        </div>
        <div className="bg-muted p-4 rounded">
          <p className="text-sm font-medium mb-2">Emotionalität</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleAnalyzer;