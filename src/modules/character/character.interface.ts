import { CreateCharacterSchema } from './schema/character.schema';

export abstract class ICharacterRepository {
  abstract createCharacter(data: CreateCharacterSchema): Promise<any>;
  abstract getCharacterById(id: number): Promise<any>;
}