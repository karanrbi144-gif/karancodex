import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact: text("impact").notNull(), // Business result focused
  techStack: text("tech_stack").array().notNull(),
  imageUrl: text("image_url"),
  link: text("link"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  order: integer("order").default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Abstract identifier for 3D icon
  order: integer("order").default(0),
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  heroHeadline: text("hero_headline").notNull(),
  heroSubtext: text("hero_subtext").notNull(),
  bioHeadline: text("bio_headline").notNull(),
  bioText: text("bio_text").notNull(),
  email: text("email"),
  phone: text("phone"),
  linkedin: text("linkedin"),
  github: text("github"),
  location: text("location"),
});

// === SCHEMAS ===

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertExperienceSchema = createInsertSchema(experiences).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertProfileSchema = createInsertSchema(profile).omit({ id: true });

// === TYPES ===

export type Project = typeof projects.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Profile = typeof profile.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
