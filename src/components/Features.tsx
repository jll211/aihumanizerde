import { Book, Sparkles, Clock } from "lucide-react";

const features = [
  {
    icon: <Book className="w-6 h-6" />,
    title: "Von roboterhaft zu menschlich",
    description: "Transformiere KI-Content in Sekunden in deinen persönlichen Schreibstil."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Lerne aus deinem Stil",
    description: "Analysiere und verstehe deine einzigartigen Schreibmuster."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Skaliere intelligent",
    description: "Produziere mehr Content ohne Qualitätseinbußen."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gradient-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Warum HumanizerAI?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-muted p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;