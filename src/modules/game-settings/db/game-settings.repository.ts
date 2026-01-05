import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IGameSettingsRepository } from '../game-settings.interface';
import { GameMode } from '@prisma/client';

@Injectable()
export class GameSettingsRepository implements IGameSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getServerConfig(serverId: string): Promise<any> {
    // busca no banco, se tiver atualiza, se não tiver cria
    const config = await this.prisma.serverConfig.upsert({
      where: { serverId },
      create: { serverId, gameMode: 'MODE_1' }, // default mode
      update: {},
    });

    return config;
  }

  async setGameMode(serverId: string, gameMode: GameMode): Promise<any> {
    return await this.prisma.serverConfig.upsert({
      where: { serverId },
      create: { serverId, gameMode },
      update: { gameMode },
    });
  }
}