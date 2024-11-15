import { motion } from "framer-motion";
import { BookText, Sparkles, Clock } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: <BookText className="w-6 h-6" />,
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

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="bg-gradient-premium p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400"
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted overflow-hidden">
      <motion.div 
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Warum HumanizerAI?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;