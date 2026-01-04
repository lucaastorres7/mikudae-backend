import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ISerieRepository } from './serie.interface';
import { SerieController } from './serie.controller';
import { SerieService } from './serie.service';
import { SerieRepository } from './database/db-serie.repository';

@Module({
  controllers: [SerieController],
  providers: [SerieService,
    PrismaService,
    {provide: ISerieRepository, useClass: SerieRepository}
  ],
})
export class SerieModule {}
