import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { ArrowUpRight, Github } from "lucide-react";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex-shrink-0 w-[85vw] md:w-[600px] bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 group snap-center"
    >
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
             <span className="text-white/20 font-display text-4xl font-bold uppercase">No Image</span>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs font-bold uppercase bg-primary/20 text-primary-foreground rounded backdrop-blur-sm border border-primary/30">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white font-display uppercase">{project.title}</h3>
          <div className="flex gap-3">
             {project.link && (
               <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors"
               >
                 <ArrowUpRight size={20} />
               </a>
             )}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-3">
          {project.description}
        </p>
        
        <div className="pl-4 border-l-2 border-secondary/50">
          <p className="text-sm font-medium text-secondary uppercase tracking-wide mb-1">Impact</p>
          <p className="text-white/90 italic">"{project.impact}"</p>
        </div>
      </div>
    </motion.div>
  );
}
