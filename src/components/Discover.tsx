import { motion } from "framer-motion";
import { FileText, Wand2, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Text eingeben",
    description: "Füge deinen KI-generierten Text in den Editor ein."
  },
  {
    icon: <Wand2 className="w-8 h-8" />,
    title: "Analysieren",
    description: "Unser System analysiert den Inhalt und deinen Stil."
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Transformieren",
    description: "Der Text wird in deinen persönlichen Stil umgewandelt."
  }
];

const Discover = () => {
  return (
    <section className="py-20 px-4 bg-gradient-premium">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 tracking-tighter"
        >
          So funktioniert's
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discover;