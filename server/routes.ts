import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API ROUTES ===

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // === SEED DATA (Run on startup if empty) ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const profile = await storage.getProfile();
  if (!profile) {
    console.log("Seeding database...");

    // 1. Profile
    await storage.createProfile({
      name: "Karan Maurya",
      role: "Business Developer & Creative Technologist",
      heroHeadline: "I am not only a developer,\nI develop businesses.",
      heroSubtext: "I build scalable digital products, systems, and experiences that turn ideas into revenue.",
      bioHeadline: "Business Problem Solver",
      bioText: "I don’t just write code. I understand products, users, and growth. I help businesses scale using technology.",
      email: "reachtokarankumar@gmail.com",
      phone: "+91-7236089760",
      location: "Pune, Maharashtra",
      linkedin: "https://www.linkedin.com/in/karan-maurya",
      github: "https://github.com/karancodex"
    });

    // 2. Services
    const servicesList = [
      { title: "Product Engineering", description: "End-to-end development of scalable digital products.", icon: "box" },
      { title: "Startup MVP Development", description: "Rapid prototyping and iteration for early-stage ventures.", icon: "rocket" },
      { title: "Business Automation", description: "Streamlining operations with smart technological solutions.", icon: "gear" },
      { title: "Mobile & Web Platforms", description: "Cross-platform experiences that users love.", icon: "devices" },
      { title: "AI & Smart Systems", description: "Integrating intelligence into business workflows.", icon: "brain" }
    ];
    for (const [index, s] of servicesList.entries()) {
      await storage.createService({ ...s, order: index });
    }

    // 3. Projects (Selected from Resume)
    const projectsList = [
      {
        title: "Style AI",
        description: "Virtual Try-On & Smart Fashion Assistant using OpenCV and MediaPipe.",
        impact: "Reduced return rates by enabling real-time virtual product placement.",
        techStack: ["React", "OpenCV", "MediaPipe", "Python"],
        featured: true,
        order: 1
      },
      {
        title: "Drivers In India",
        description: "City-wise driver booking platform managing thousands of monthly users.",
        impact: "Reached 17K+ monthly users with 26% bounce rate improvement.",
        techStack: ["WordPress", "SEO", "Cashfree"],
        featured: true,
        order: 2
      },
      {
        title: "CodeX AI",
        description: "Cross-platform chatbot app with Gemini Pro API integration.",
        impact: "Enabled real-time AI conversations on Android and iOS.",
        techStack: ["React Native", "Gemini API", "TypeScript"],
        featured: true,
        order: 3
      },
      {
        title: "Spotfinder",
        description: "Parking booking platform with real-time availability.",
        impact: "Enhanced user experience with interactive maps and push notifications.",
        techStack: ["React", "React Native", "Google Places API"],
        featured: true,
        order: 4
      },
      {
        title: "Medusa E-commerce",
        description: "Headless commerce solution with custom storefront and admin.",
        impact: "Streamlined order processing and user management.",
        techStack: ["Next.js", "Medusa", "TypeScript"],
        featured: false,
        order: 5
      }
    ];
    for (const p of projectsList) {
      await storage.createProject(p);
    }

    // 4. Experience
    const experienceList = [
      {
        title: "Software Developer",
        company: "Right Brain Infotech LLP",
        period: "May 2022 – Present",
        description: "Full-stack development, UI/UX implementation, and mentoring junior developers.",
        order: 1
      },
      {
        title: "Master of Computer Applications",
        company: "Savitribai Phule Pune University",
        period: "2023 - 2025",
        description: "Advanced studies in computer applications.",
        order: 2
      }
    ];
    for (const e of experienceList) {
      await storage.createExperience(e);
    }

    console.log("Database seeded successfully.");
  }
}
