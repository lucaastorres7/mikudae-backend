import { Controller, Get, Param, Post } from '@nestjs/common';
import { GameSettingsService } from './game-settings.service';
import { GameMode } from '@prisma/client';

@Controller('game-settings')
export class GameSettingsController {
  constructor(private readonly gameSettingsService: GameSettingsService) {}

  @Get(':serverId/config')
  async getServerConfig(@Param('serverId') serverId: string) {
    return await this.gameSettingsService.getServerConfig(serverId);
  }

  @Post(':serverId/game-mode/:gameMode')
  async setGameMode(
    @Param('serverId') serverId: string,
    @Param('gameMode') gameMode: string,
  ) {
    return await this.gameSettingsService.setGameMode(serverId, gameMode as GameMode);
  }
}