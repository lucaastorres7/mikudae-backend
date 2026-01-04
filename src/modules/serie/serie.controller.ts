import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { SerieService } from './serie.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { type CreateSerieSchema, createSerieSchema } from './schema/serie.schema';

@Controller('series')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSerieSchema))
  createSerie(@Body() body: CreateSerieSchema) {
    return this.serieService.createSerie(body);
  }

  @Get(':id')
  getSerieById(@Param('id') id: string) {
    return this.serieService.getSerieById(Number(id));
  }

  @Get()
  getSerieByName(@Query('name') name: string) {
    return this.serieService.getSerieByName(name);
  }

  @Post(':serieId/characters/:characterId')
  addCharacterToSerie(@Param('serieId') serieId: string, @Param('characterId') characterId: string) {
    return this.serieService.addCharacterToSerie(Number(serieId), Number(characterId));
  }
}