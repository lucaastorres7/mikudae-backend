import z from 'zod';

export const rollSchema = z.object({
  playerId: z.string().min(1),
  serverId: z.string().min(1),
})

export type RollSchema = z.infer<typeof rollSchema>;