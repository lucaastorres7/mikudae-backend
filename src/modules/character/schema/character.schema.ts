import { Category, Gender } from '@prisma/client';
import z from 'zod';

export const createCharacterSchema = z.object({
  name: z.string().min(1),
  gender: z.enum(Gender),
  category: z.enum(Category),
  images: z.array(z.url()),
  kakeraValue: z.number().min(0),
});

export const characterSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  gender: z.enum(Gender),
  category: z.enum(Category),
  images: z.array(z.url()),
  kakeraValue: z.number().min(0),
})

export const characterWithSeriesSchema = z.object({
  ...characterSchema,
  series: z.array(z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    image: z.url().optional(),
  })).optional(),
})

export const characterWithSerieIdSchema = z.object({
  ...characterSchema,
  seriesIds: z.array(z.number().int().positive()).optional(),
})

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
export type CharacterSchema = z.infer<typeof characterSchema>;
export type CharacterWithSeriesSchema = z.infer<typeof characterWithSeriesSchema>;