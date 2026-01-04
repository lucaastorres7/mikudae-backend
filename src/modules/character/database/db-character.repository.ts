import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICharacterRepository } from '../character.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCharacterSchema } from '../schema/character.schema';



@Injectable()
export class CharacterRepository implements ICharacterRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async createCharacter(data: CreateCharacterSchema): Promise<any> {
    const characterExists = await this.prisma.character.findFirst({
      where: { name: data.name },
    });

    if (characterExists) {
      throw new BadRequestException('This character already exists');
    }

    const character = await this.prisma.character.create({
      data,
    });

    return character;
  }

  async getCharacterById(id: number): Promise<any> {
    const character = await this.prisma.character.findUnique({
      where: { id },
      include: {
        series: {
          include: {
            serie: true,
          }
        }
      }
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }

  async getCharacterByName(name: string): Promise<any> {
    const character = await this.prisma.character.findFirst({
      where: { name },
      include: {
        series: {
          include: {
            serie: true,
          }
        }
      }
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }
}