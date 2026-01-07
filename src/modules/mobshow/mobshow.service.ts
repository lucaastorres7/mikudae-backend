import { Injectable } from '@nestjs/common';
import { AddPointsSchema, CreateMobshowSchema, JoinMobshowSchema } from './schema/mobshow.schema';
import { IMobshowRepository } from './mobshow.interface';

@Injectable()
export class MobshowService {
  constructor(private readonly mobshow: IMobshowRepository) {}

  async createMobshow(data: CreateMobshowSchema) {
    const session = await this.mobshow.createMobshow(data);
    
    return session;
  }

  async joinMobshow(data: JoinMobshowSchema) {
    const session = await this.mobshow.joinMobshow(data);

    return session;
  }

  async startMobshow(id: number) {
    const startedSession = await this.mobshow.startMobshow(id);
    
    return startedSession;
  }

  async scoreMobshow(data: AddPointsSchema) {
    const scoredSession = await this.mobshow.scoreMobshow(data);

    return scoredSession;
  }

  async endMobshow(mobshowId: number) {
    const endedSession = await this.mobshow.endMobshow(mobshowId);

    return endedSession;
  }

  async getMobshowStatus(mobshowId: number) {
    const status = await this.mobshow.getMobshowStatus(mobshowId);

    console.log('STATUS', status);

    const { id, hostId, participants, winner } = status;

    const orderedPlayers = participants.sort((a, b) => b.score - a.score);

    return { id, hostId, winner, players: orderedPlayers };
  }
}