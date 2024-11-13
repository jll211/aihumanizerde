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
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Warum HumanizerAI?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;