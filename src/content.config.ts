import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(3),
    description: z.string().min(10).max(200),
    category: z.enum([
      'Arduino',
      'ESP32',
      'IoT',
      'Robotics',
      'Drones',
      'AI & Vision',
      '3D Printing',
      'Sensors',
    ]),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    time: z.string(),

    // Kya is project ki details check ho chuki hain?
    // Sirf site owner (aap) isko "verified" kar sakte ho.
    verification: z.enum(['verified', 'unverified', 'demo']).default('unverified'),

    // Safety level: low / medium / high
    safetyLevel: z.enum(['low', 'medium', 'high']),
    safetyNotes: z.array(z.string()).min(1),

    components: z
      .array(
        z.object({
          name: z.string(),
          quantity: z.number().int().positive(),
          note: z.string().optional(),
        }),
      )
      .min(1),

    pinConnections: z
      .array(
        z.object({
          from: z.string(),
          to: z.string(),
          note: z.string().optional(),
        }),
      )
      .default([]),

    learningOutcomes: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    videoId: z.string().optional(), // YouTube video ID, baad me
    related: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishedDate: z.coerce.date(),
  }),
});

export const collections = { projects };