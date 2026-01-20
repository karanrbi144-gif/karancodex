import { db } from "./db";
import { 
  projects, experiences, services, profile,
  type Project, type Experience, type Service, type Profile,
  type InsertProject, type InsertExperience, type InsertService, type InsertProfile
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile).limit(1);
    return result;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [result] = await db.insert(profile).values(insertProfile).returning();
    return result;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [result] = await db.insert(projects).values(insertProject).returning();
    return result;
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.order);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [result] = await db.insert(experiences).values(insertExperience).returning();
    return result;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.order);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [result] = await db.insert(services).values(insertService).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
