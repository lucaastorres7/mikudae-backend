import { BadRequestException, Injectable } from '@nestjs/common';
import { IRollRepository } from '../roll.interface';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class RollRepository implements IRollRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkPlayerRolls(playerId: string, lastRollReset: Date, now: Date): Promise<any> {
    let player = await this.prisma.player.findUnique({
      where: { id: playerId },
    })

    if (!player || lastRollReset > player.lastInteraction) {
      player = await this.prisma.player.upsert({
        where: { id: playerId },
        create: {
          id: playerId,
          rollsCount: 0,
          lastInteraction: now,
        },
        update: {
          rollsCount: 0,
          lastInteraction: now,
        },
      }); 
    }

    return player.rollsCount;
  }

  async updateRollsCount(playerId: string): Promise<any> {
    const updatedPlayer = await this.prisma.player.update({
      where: { id: playerId },
      data: { rollsCount: { increment: 1 } }
    })

    return updatedPlayer.rollsCount;
  }

  async getRandomCharacter(genderFilter?: string, categoryFilter?: string): Promise<any> {
    const filter: any = {};
    
    if (genderFilter == 'BOTH') {
      filter.gender = ['WAIFU', 'HUSBANDO', 'BOTH'];
    } else if (genderFilter) {
      filter.gender = [genderFilter, 'BOTH'];
    }

    if (categoryFilter == 'BOTH') {
      filter.category = ['ANIME', 'GAME', 'BOTH'];
    } else if (categoryFilter) {  
      filter.category = [categoryFilter, 'BOTH'];
    } 

    const characterNumber = await this.prisma.character.count({
      where: {
        gender: { in: filter.gender },
        category: { in: filter.category },
      }
    })

    if (characterNumber === 0) {
      throw new BadRequestException('No characters found with the specified filters');
    }

    const randomIndex = Math.floor(Math.random() * characterNumber);

    const character = await this.prisma.character.findFirst({
      where: {
        gender: { in: filter.gender },
        category: { in: filter.category },
      },
      skip: randomIndex,
      include: {  
        series: {
          include: { serie: true }
        }
      }
    })

    if (!character) {
      throw new BadRequestException('Error during roll');
    }

    return character;
  }
} 