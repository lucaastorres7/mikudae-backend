import { Category, Gender } from '@prisma/client';
import z from 'zod';

export const haremSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  ownerId: z.number().int().positive(),
  serverId: z.number().int().positive(),
})

export const haremWithCharactersSchema = z.object({
  ...haremSchema,
  characters: z.array(z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    gender: z.enum(Gender),
    category: z.enum(Category),
    images: z.array(z.url()),
    kakeraValue: z.number().min(0),
    serieId: z.number().int().positive().optional(),
  })).optional(),
})

export const haremWithCharacterIdSchema = z.object({
  ...haremSchema,
  characterIds: z.array(z.number().int().positive()).optional(),
})

export const createHaremSchema = z.object({
  name: z.string().min(1),
  ownerId: z.number().int().positive(),
  serverId: z.number().int().positive(),
  characterIds: z.array(z.number().int().positive()).optional(),
})

export type HaremSchema = z.infer<typeof haremSchema>;
export type HaremWithCharactersSchema = z.infer<typeof haremWithCharactersSchema>;
export type HaremWithCharacterIdSchema = z.infer<typeof haremWithCharacterIdSchema>;
export type CreateHaremSchema = z.infer<typeof createHaremSchema>;