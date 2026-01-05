import { GameMode } from '@prisma/client';

export abstract class IGameSettingsRepository {
  abstract getServerConfig(serverId: string): Promise<any>;
  abstract setGameMode(serverId: string, gameMode: GameMode): Promise<any>;
}