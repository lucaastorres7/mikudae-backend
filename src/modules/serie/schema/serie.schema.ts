import { Category, Gender } from '@prisma/client';
import z from 'zod';

export const serieSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  image: z.url().optional(),
})

export const serieWithCharacterSchema = z.object({
  ...serieSchema,
  characters: z.array(z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    gender: z.enum(Gender),
    category: z.enum(Category),
    images: z.array(z.url()),
    kakeraValue: z.number().min(0)
  })).optional(),
})

export const serieWithCharacterIdSchema = z.object({
  ...serieSchema,
  characterIds: z.array(z.number().int().positive()).optional(),
})

export const createSerieSchema = z.object({
  name: z.string().min(1),
  image: z.url().optional(),
  characterIds: z.array(z.number().int().positive()).optional(),
})

export type SerieSchema = z.infer<typeof serieSchema>;
export type SerieWithCharacterSchema = z.infer<typeof serieWithCharacterSchema>;
export type SerieWithCharacterIdSchema = z.infer<typeof serieWithCharacterIdSchema>;
export type CreateSerieSchema = z.infer<typeof createSerieSchema>;