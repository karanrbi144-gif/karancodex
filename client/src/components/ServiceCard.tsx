import { motion } from "framer-motion";
import { type Service } from "@shared/schema";
import { Box, Code, Cpu, Globe, Rocket, Terminal } from "lucide-react";

const icons: Record<string, any> = {
  code: Code,
  globe: Globe,
  rocket: Rocket,
  cpu: Cpu,
  terminal: Terminal,
  box: Box
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon] || Box;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className="glass-panel p-8 rounded-xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:text-white group-hover:bg-primary transition-colors duration-300">
          <Icon size={24} />
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white font-display uppercase">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
      
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}
