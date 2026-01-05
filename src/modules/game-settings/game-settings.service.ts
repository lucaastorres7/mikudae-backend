import { Injectable } from '@nestjs/common';
import { GameMode } from '@prisma/client';
import { IGameSettingsRepository } from './game-settings.interface';

@Injectable()
export class GameSettingsService {
  constructor(private readonly gameSettings: IGameSettingsRepository) {}

  private readonly MODES = {
    [GameMode.MODE_1]: { baseRolls: 10, rollResetTimer: 60 * 60, marryResetTimer: 60 * 60 * 3 },
    [GameMode.MODE_2]: { baseRolls: 8, rollResetTimer: 60 * 60, marryResetTimer: 60 * 60 * 3 },
  }

  async getServerConfig(serverId: string) {
    const settings = await this.gameSettings.getServerConfig(serverId);

    const baseRules = this.MODES[settings.gameMode];

    return {
      gameMode: settings.gameMode,
      ...baseRules,
    }
  }

  async setGameMode(serverId: string, gameMode: GameMode) {
    return await this.gameSettings.setGameMode(serverId, gameMode);
  }
}