import { Module } from '@nestjs/common';
import { RollController } from './roll.controller';
import { RollService } from './roll.service';
import { GameSettingsModule } from '../game-settings/game-settings.module';
import { PrismaService } from '@/prisma/prisma.service';
import { IRollRepository } from './roll.interface';
import { RollRepository } from './db/db-roll.repository';

@Module({
  imports: [GameSettingsModule],
  controllers: [RollController],
  providers: [
    RollService, 
    PrismaService, 
    { provide: IRollRepository, useClass: RollRepository }
  ],
})
export class RollModule {}