import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterRepository } from './database/db-character.repository';
import { ICharacterRepository } from './character.interface';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService,
    PrismaService,
    {provide: ICharacterRepository, useClass: CharacterRepository}
  ],
})
export class CharacterModule {}
