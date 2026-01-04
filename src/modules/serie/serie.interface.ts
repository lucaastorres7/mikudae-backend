import { CreateSerieSchema } from './schema/serie.schema';

export abstract class ISerieRepository {
  abstract create(data: CreateSerieSchema): Promise<any>;
  abstract findById(id: number): Promise<any>;
  abstract findByName(name: string): Promise<any>;
  abstract addCharacterToSerie(serieId: number, characterId: number): Promise<any>;
}