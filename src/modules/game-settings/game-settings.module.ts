import { Module } from '@nestjs/common';
import { GameSettingsService } from './game-settings.service';
import { PrismaService } from '@/prisma/prisma.service';
import { IGameSettingsRepository } from './game-settings.interface';
import { GameSettingsRepository } from './db/game-settings.repository';
import { GameSettingsController } from './game-settings.controller';

@Module({
  controllers: [GameSettingsController],
  providers: [
    GameSettingsService, 
    PrismaService, 
    { provide: IGameSettingsRepository, useClass: GameSettingsRepository }
  ],
  exports: [GameSettingsService],
})
export class GameSettingsModule {}