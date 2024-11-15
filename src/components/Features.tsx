import { motion } from "framer-motion";
import { BookText, Sparkles, Clock } from "lucide-react";

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

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          variants={itemVariants}
        >
          Warum HumanizerAI?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-muted p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;