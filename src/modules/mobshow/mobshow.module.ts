import { Module } from '@nestjs/common';
import { MobshowController } from './mobshow.controller';
import { MobshowService } from './mobshow.service';
import { PrismaService } from '@/prisma/prisma.service';
import { IMobshowRepository } from './mobshow.interface';
import { MobshowRepository } from './db/db-mobshow.repository';

@Module({
  controllers: [MobshowController],
  providers: [
    MobshowService, 
    PrismaService, 
    { provide: IMobshowRepository, useClass: MobshowRepository }],
})
export class MobshowModule {}