import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { CharacterModule } from '@/modules/character/character.module';
import { ConfigModule } from '@nestjs/config';
import { SerieModule } from './modules/serie/serie.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    PrismaModule, 
    CharacterModule, 
    SerieModule,
  ],
})
export class AppModule {}
