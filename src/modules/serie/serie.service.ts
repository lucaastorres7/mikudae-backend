import { Injectable } from '@nestjs/common';
import { ISerieRepository } from './serie.interface';
import { CreateSerieSchema } from './schema/serie.schema';

@Injectable()
export class SerieService {
  constructor(private readonly serie: ISerieRepository) {}

  createSerie(body: CreateSerieSchema) {
    return this.serie.create(body);
  }

  getSerieById(id: number) {
    return this.serie.findById(id);
  }

  getSerieByName(name: string) {
    return this.serie.findByName(name);
  }

  addCharacterToSerie(serieId: number, characterId: number) {
    return this.serie.addCharacterToSerie(serieId, characterId);
  }
}