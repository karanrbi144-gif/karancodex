import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const links = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold font-display tracking-widest text-white cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          DEV<span className="text-primary">.OS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary hover:text-glow transition-all duration-300"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
        >
          <div className="flex flex-col p-6 gap-6">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-lg font-display uppercase tracking-widest text-white hover:text-primary text-left"
              >
                {link.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
