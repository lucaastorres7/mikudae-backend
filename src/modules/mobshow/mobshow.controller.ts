import { Body, Controller, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { MobshowService } from './mobshow.service';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { type AddPointsSchema, addPointsSchema, type CreateMobshowSchema, createMobshowSchema, type JoinMobshowSchema, joinMobshowSchema } from './schema/mobshow.schema';

@Controller('mobshow')
export class MobshowController {
  constructor(private readonly mobshowService: MobshowService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createMobshowSchema))
  async createMobshow(@Body() body: CreateMobshowSchema) {
    const mobshowSession = await this.mobshowService.createMobshow(body);

    return mobshowSession;
  }

  @Post('join')
  @UsePipes(new ZodValidationPipe(joinMobshowSchema))
  async joinMobshow(@Body() body: JoinMobshowSchema) {
    const participant = await this.mobshowService.joinMobshow(body);
    
    return participant;
  }
  
  @Patch(':id/start')
  async startMobshow(@Param('id') id: string) {
    const startedSession = await this.mobshowService.startMobshow(Number(id));

    return { message: 'Mobshow started successfully' };
  }

  @Post('score')
  @UsePipes(new ZodValidationPipe(addPointsSchema))
  async scoreMobshow(@Body() body: AddPointsSchema) {
    const scoredSession = await this.mobshowService.scoreMobshow(body);

    return { message: 'Points added successfully' };
  }

  @Post(':id/end')
  async endMobshow(@Param('id') id: string) {
    const endedSession = await this.mobshowService.endMobshow(Number(id));

    return { message: 'Mobshow ended successfully' };
  }

  @Get(':id/status') // Posta placar atual e etc
  async getMobshowStatus(@Param('id') id: string) {
    const status = await this.mobshowService.getMobshowStatus(Number(id));

    return status;
  }
}