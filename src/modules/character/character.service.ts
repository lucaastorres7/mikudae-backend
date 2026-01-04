import { Injectable } from '@nestjs/common';
import { ICharacterRepository } from './character.interface';
import { CreateCharacterSchema } from './schema/character.schema';

@Injectable()
export class CharacterService {
  constructor(private readonly character: ICharacterRepository) {}

  createCharacter(body: CreateCharacterSchema) {
    return this.character.createCharacter(body);
  }

  getCharacterById(id: number) {
    return this.character.getCharacterById(id);
  }

  getCharacterByName(name: string) {
    return this.character.getCharacterByName(name);
  }
}