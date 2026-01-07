import { AddPointsSchema, CreateMobshowSchema, JoinMobshowSchema } from './schema/mobshow.schema';

export abstract class IMobshowRepository {
  abstract createMobshow(data: CreateMobshowSchema): Promise<any>;
  abstract joinMobshow(data: JoinMobshowSchema): Promise<any>;
  abstract startMobshow(id: number): Promise<any>;
  abstract scoreMobshow(data: AddPointsSchema): Promise<any>;
  abstract endMobshow(id: number): Promise<any>;
  abstract getMobshowStatus(id: number): Promise<any>;
}