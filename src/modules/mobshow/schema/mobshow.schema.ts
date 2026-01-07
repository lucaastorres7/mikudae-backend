import z from 'zod';

export const createMobshowSchema = z.object({
  serverId: z.string().min(1),
  channelId: z.string().min(1),
  hostId: z.string().min(1),
})

export const joinMobshowSchema = z.object({
  sessionId: z.number().min(1),
  playerId: z.string().min(1),
})

export const addPointsSchema = z.object({
  sessionId: z.number().min(1),
  playersId: z.array(z.string().min(1)).min(1),
  points: z.number().min(1),
})

export type CreateMobshowSchema = z.infer<typeof createMobshowSchema>;
export type JoinMobshowSchema = z.infer<typeof joinMobshowSchema>;
export type AddPointsSchema = z.infer<typeof addPointsSchema>;