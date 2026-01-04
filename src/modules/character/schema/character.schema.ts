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

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;

/*
model Character {
  
  series       CharactersOnSeries[]
  owners       CharacterOwnership[]
}*/