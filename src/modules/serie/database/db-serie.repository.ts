import { BadRequestException, Injectable } from '@nestjs/common';
import { ISerieRepository } from '../serie.interface';
import { CreateSerieSchema } from '../schema/serie.schema';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SerieRepository implements ISerieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSerieSchema): Promise<any> {
    const serieExists = await this.prisma.serie.findFirst({
      where: {
        name: data.name,
      },
    });

    if (serieExists) {
      throw new BadRequestException('Serie already exists');
    }

    const serie = await this.prisma.serie.create({
      data,
    });
    
    return serie;
  }

  async findById(id: number): Promise<any> {
    const serie = await this.prisma.serie.findUnique({
      where: {
        id,
      },
      include: {
        characters: {
          include: {
            character: true,
          }
        },
      }
    });

    if (!serie) {
      throw new BadRequestException('Serie not found');
    }

    return serie;
  }

  async findByName(name: string): Promise<any> {
    const serie = await this.prisma.serie.findFirst({
      where: {
        name,
      },
      include: {
        characters: {
          include: {
            character: true,
          }
        }
      }
    });

    if (!serie) {
      throw new BadRequestException('Serie not found');
    }

    return serie;
  } 

  async addCharacterToSerie(serieId: number, characterId: number): Promise<any> {
    const serie = await this.prisma.serie.findUnique({
      where: {
        id: serieId,
      },
    });

    if (!serie) {
      throw new BadRequestException('Serie not found');
    }

    const character = await this.prisma.character.findUnique({
      where: {
        id: characterId,
      },
    });

    if (!character) {
      throw new BadRequestException('Character not found');
    }

    const updatedSerie = await this.prisma.serie.update({
      where: {
        id: serieId,
      },
      data: {
        characters: {
          create: {
            characterId: characterId,
          }
        }
      },
      include: {
        characters: {
          include: {
            character: true,
          }
        }
      }
    });

    return updatedSerie;
  }
}