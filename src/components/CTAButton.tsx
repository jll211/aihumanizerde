import { ArrowRight } from "lucide-react";

const CTAButton = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold mb-6">Bereit für authentischen Content?</h2>
      <button className="button-primary inline-flex items-center gap-2">
        Early Access sichern <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CTAButton;