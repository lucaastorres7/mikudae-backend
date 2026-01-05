import { BadRequestException, Injectable } from '@nestjs/common';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Category, Gender } from '@prisma/client';
import { IRollRepository } from './roll.interface';

@Injectable()
export class RollService {
  constructor(
    private readonly config: GameSettingsService,
    private readonly roll: IRollRepository,
  ) {}

  async executeRoll(playerId: string, serverId: string, genderFilter?: Gender, categoryFilter?: Category) {
    const config = await this.config.getServerConfig(serverId);

    const now = new Date();
    const lastRollReset = new Date(now);

    // O reset é em 00 minutos, então se já passou dos 00 minutos, o reset já ocorreu e o usuário pode rodar
    if (now.getMinutes() <= config.rollResetMinute) {
      lastRollReset.setHours(now.getHours() - 1); 
    }
    lastRollReset.setMinutes(config.rollResetMinute);
    lastRollReset.setSeconds(0);
    lastRollReset.setMilliseconds(0);


    const playerRolls = await this.roll.checkPlayerRolls(playerId, lastRollReset, now);

    if (playerRolls >= config.baseRolls) {
      const nextReset = new Date(lastRollReset);
      nextReset.setHours(nextReset.getHours() + 1);

      const minutesUntilReset = Math.ceil((nextReset.getTime() - now.getTime()) / (1000 * 60));

      return {
        rollSuccess: false,
        message: `No rolls left! Reset in ${minutesUntilReset} minutes.`,
        rollsLimit: config.baseRolls,
        remainingRolls: 0,
        minutesUntilReset,
      }
    }

    const character = await this.roll.getRandomCharacter(genderFilter, categoryFilter);
    const updatedRollsCount = await this.roll.updateRollsCount(playerId);

    const remainingRolls = config.baseRolls - updatedRollsCount;

    return { rollSuccess: true, remainingRolls, character};
  }
}