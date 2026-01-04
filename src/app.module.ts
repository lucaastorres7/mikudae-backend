import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { CharacterModule } from '@/modules/character/character.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    PrismaModule, 
    CharacterModule, 
  ],
})
export class AppModule {}
