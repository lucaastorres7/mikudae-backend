import { Injectable } from '@nestjs/common';
import { IMobshowRepository } from '../mobshow.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { AddPointsSchema, CreateMobshowSchema, JoinMobshowSchema } from '../schema/mobshow.schema';

@Injectable()
export class MobshowRepository implements IMobshowRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMobshow(data: CreateMobshowSchema): Promise<any> {
    const { channelId, hostId, serverId } = data;

    const mobshow = await this.prisma.mobSession.create({
      data: {
        channelId,
        hostId,
        serverId,
      }
    })

    return mobshow;
  }

  async joinMobshow(data: JoinMobshowSchema): Promise<any> {
    const { playerId, sessionId } = data;

    const participant = await this.prisma.mobParticipant.create({
      data: {
        sessionId,
        playerId,
      }
    })

    return participant;
  }

  async startMobshow(id: number): Promise<any> {
    const activeSession = await this.prisma.mobSession.update({
      where: {
        id
      },
      data: {
        status: 'ACTIVE'
      }
    })

    return activeSession;
  }
  
  async scoreMobshow(data: AddPointsSchema): Promise<any> {
    const { playersId, points, sessionId } = data;

    await this.prisma.$transaction(
      playersId.map((playerId) => 
        this.prisma.mobParticipant.update({
          where: { sessionId_playerId: { sessionId, playerId } },
          data: {
            score: { increment: points }
          }
        }))
    )
  }

  async endMobshow(id: number): Promise<any> {
    const players = await this.prisma.mobParticipant.findMany({
      where: {
        sessionId: id
      },
      orderBy: {
        score: 'desc'
      },
    })

    let winner = players[0].playerId;

    if (players[0].score === players[1].score) {
      winner = 'Empate';
    }

    const endedSession = await this.prisma.mobSession.update({
      where: {
        id
      },
      data: {
        status: 'FINISHED',
        winner
      }
    })

    return {
      ...endedSession,
      players,
    }
  }

  async getMobshowStatus(id: number): Promise<any> {
    const status = await this.prisma.mobSession.findUnique({
      where: {
        id
      },
      include: {
        participants: true
      }
    })

    return status;
  }
}