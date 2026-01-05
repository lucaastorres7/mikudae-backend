import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { RollService } from './roll.service';
import { rollSchema, type RollSchema } from './schema/roll.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

@Controller('rolls')
export class RollController {
  constructor(private readonly rollService: RollService) {}

  @Post('wa')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollWaifuAnime(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'WAIFU'
    const categoryFilter = 'ANIME';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('wg')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollWaifuGame(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'WAIFU'
    const categoryFilter = 'GAME';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('wx')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollWaifuBoth(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'WAIFU'
    const categoryFilter = 'BOTH';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('ha')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollHusbandoAnime(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'HUSBANDO'
    const categoryFilter = 'ANIME';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('hg')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollHusbandoGame(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'HUSBANDO'
    const categoryFilter = 'GAME';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('hx')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollHusbandoBoth(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'HUSBANDO'
    const categoryFilter = 'BOTH';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('ma')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollBothAnime(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'BOTH'
    const categoryFilter = 'ANIME';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('mg')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollBothGame(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'BOTH'
    const categoryFilter = 'GAME';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }

  @Post('mx')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollBothBoth(@Body() body: RollSchema) {
    const { playerId, serverId } = body;
    const genderFilter = 'BOTH'
    const categoryFilter = 'BOTH';

    return this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);
  }
}