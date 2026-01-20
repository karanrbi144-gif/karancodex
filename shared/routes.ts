import { z } from 'zod';
import { 
  projects, experiences, services, profile,
  insertProjectSchema, insertExperienceSchema, insertServiceSchema, insertProfileSchema 
} from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile',
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  experiences: {
    list: {
      method: 'GET' as const,
      path: '/api/experiences',
      responses: {
        200: z.array(z.custom<typeof experiences.$inferSelect>()),
      },
    },
  },
  services: {
    list: {
      method: 'GET' as const,
      path: '/api/services',
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type ProfileResponse = z.infer<typeof api.profile.get.responses[200]>;
export type ProjectsListResponse = z.infer<typeof api.projects.list.responses[200]>;
export type ExperiencesListResponse = z.infer<typeof api.experiences.list.responses[200]>;
export type ServicesListResponse = z.infer<typeof api.services.list.responses[200]>;
