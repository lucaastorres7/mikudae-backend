import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { type CreateCharacterSchema, createCharacterSchema } from './schema/character.schema';
import { CharacterService } from './character.service';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get(':id')
  getCharacterById(@Param('id') id: string) {
    return this.characterService.getCharacterById(Number(id));
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCharacterSchema))
  createCharacter(@Body() body: CreateCharacterSchema) {
    return this.characterService.createCharacter(body);
  }
}