import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { CharacterModule } from '@/modules/character/character.module';
import { ConfigModule } from '@nestjs/config';
import { SerieModule } from './modules/serie/serie.module';
import { RollModule } from './modules/roll/roll.module';
import { GameSettingsModule } from './modules/game-settings/game-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    PrismaModule, 
    CharacterModule, 
    SerieModule,
    RollModule,
    GameSettingsModule,
  ],
})
export class AppModule {}
