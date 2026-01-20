import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Loader } from "@react-three/drei";
import { useProfile, useProjects, useExperiences, useServices } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { Scene } from "@/components/Scene";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowDown, Mail, Github, Linkedin, MapPin, Terminal } from "lucide-react";

export default function Home() {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const { data: experiences } = useExperiences();
  const { data: services } = useServices();

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fake data if API fails or empty (for visual dev)
  const safeProfile = profile || {
    name: "Developer",
    role: "Full Stack Engineer",
    heroHeadline: "I develop businesses, not just code.",
    heroSubtext: "Blending technical mastery with strategic vision to build products that scale.",
    bioHeadline: "The Business Developer",
    bioText: "I bridge the gap between complex engineering challenges and user-centric business goals. My code drives revenue.",
    location: "San Francisco, CA",
    email: "hello@example.com"
  };

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-white">
      <Navigation />
      
      {/* 3D Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Main Content - Scrollable */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <Section id="home" className="h-screen flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-block px-4 py-1 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-md mb-4"
            >
              <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                {safeProfile.role}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-tight"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                {safeProfile.heroHeadline.split(",")[0]}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                {safeProfile.heroHeadline.split(",")[1] || "Future Ready."}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {safeProfile.heroSubtext}
            </motion.p>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="pt-12"
            >
              <a href="#about" className="animate-bounce inline-block p-2 rounded-full border border-white/10 hover:border-primary text-white/50 hover:text-primary transition-colors">
                <ArrowDown />
              </a>
            </motion.div>
          </div>
        </Section>

        {/* ABOUT SECTION */}
        <Section id="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="glass-panel p-8 md:p-12 rounded-2xl relative">
                <div className="absolute -top-4 -left-4 text-primary opacity-50">
                   <Terminal size={48} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-white">
                  {safeProfile.bioHeadline}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{safeProfile.bioText}</p>
                  <p>
                    Coding is the easy part. The challenge is building something that matters. 
                    I focus on performance, scalability, and impact.
                  </p>
                </div>
                
                <div className="mt-8 flex gap-6 text-white/80">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold font-display text-secondary">5+</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Years Exp</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold font-display text-primary">20+</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Projects</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
               {/* 3D placeholder or just spacing for the background 3D elements to shine through */}
               <div className="w-full h-full min-h-[300px] flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                 <h3 className="text-9xl font-display font-black text-white/5 absolute select-none">
                   ABOUT
                 </h3>
               </div>
            </div>
          </div>
        </Section>

        {/* SERVICES SECTION */}
        <Section id="services">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Capabilities
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
            {!services?.length && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Loading services...
              </div>
            )}
          </div>
        </Section>

        {/* PROJECTS SECTION - Horizontal Scroll Snap */}
        <Section id="projects" className="overflow-hidden">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-2 text-white">
                Selected Works
              </h2>
              <p className="text-muted-foreground">Some things I've built.</p>
            </div>
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:-mx-12 md:px-12">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
            {!projects?.length && (
               <div className="w-full text-center py-20 border border-dashed border-white/10 rounded-2xl">
                 <p className="text-muted-foreground">Projects loading...</p>
               </div>
            )}
          </div>
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section id="experience">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-16 text-center text-white">
              Trajectory
            </h2>
            
            <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-12">
              {experiences?.map((exp, idx) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
                  
                  <div className="glass-panel p-8 rounded-xl border-l-4 border-l-primary/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                        {exp.title}
                      </h3>
                      <span className="text-sm font-mono text-secondary px-3 py-1 bg-secondary/10 rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg text-white/80 mb-4 flex items-center gap-2">
                       <span className="w-2 h-2 bg-white/50 rounded-full" />
                       {exp.company}
                    </h4>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" className="min-h-[70vh] flex items-center">
          <div className="w-full max-w-4xl mx-auto text-center">
             <motion.h2 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="text-5xl md:text-7xl font-bold font-display mb-8 text-white"
             >
               Let's Build <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                 The Impossible.
               </span>
             </motion.h2>
             
             <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
               I'm currently available for freelance work and strategic partnerships.
               Drop a line if you have a vision that needs engineering.
             </p>
             
             <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <a 
                 href={`mailto:${safeProfile.email}`} 
                 className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center gap-3"
               >
                 <Mail size={20} />
                 Start a Conversation
               </a>
               
               <div className="flex gap-4">
                 {safeProfile.github && (
                   <a href={safeProfile.github} target="_blank" rel="noreferrer" className="p-4 glass-panel rounded-lg hover:text-primary transition-colors">
                     <Github size={24} />
                   </a>
                 )}
                 {safeProfile.linkedin && (
                   <a href={safeProfile.linkedin} target="_blank" rel="noreferrer" className="p-4 glass-panel rounded-lg hover:text-primary transition-colors">
                     <Linkedin size={24} />
                   </a>
                 )}
               </div>
             </div>
             
             <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
               <div className="flex items-center gap-2">
                 <MapPin size={14} />
                 {safeProfile.location}
               </div>
               <p>© {new Date().getFullYear()} {safeProfile.name}. All rights reserved.</p>
             </div>
          </div>
        </Section>

      </main>
      
      <Loader 
        containerStyles={{ backgroundColor: "#050505" }}
        barStyles={{ backgroundColor: "#7c3aed", height: "4px" }}
        dataStyles={{ fontSize: "14px", fontFamily: "Orbitron" }}
      />
    </div>
  );
}
