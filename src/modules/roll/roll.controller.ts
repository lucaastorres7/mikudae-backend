import { Body, Controller, HttpStatus, Post, Res, UsePipes } from '@nestjs/common';
import { RollService } from './roll.service';
import { rollSchema, type RollSchema } from './schema/roll.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { type Response } from 'express';

@Controller('rolls')
export class RollController {
  constructor(private readonly rollService: RollService) {}

  @Post('wa')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollWaifuAnime(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'WAIFU'
    const categoryFilter = 'ANIME';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('wg')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollWaifuGame(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'WAIFU'
    const categoryFilter = 'GAME';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('wx')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollWaifuBoth(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'WAIFU'
    const categoryFilter = 'BOTH';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('ha')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollHusbandoAnime(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'HUSBANDO'
    const categoryFilter = 'ANIME';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('hg')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollHusbandoGame(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'HUSBANDO'
    const categoryFilter = 'GAME';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('hx')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollHusbandoBoth(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'HUSBANDO'
    const categoryFilter = 'BOTH';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('ma')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollBothAnime(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'BOTH'
    const categoryFilter = 'ANIME';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('mg')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollBothGame(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'BOTH'
    const categoryFilter = 'GAME';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('mx')
  @UsePipes(new ZodValidationPipe(rollSchema))
  async rollBothBoth(@Body() body: RollSchema, @Res() res: Response) {
    const { playerId, serverId } = body;
    const genderFilter = 'BOTH'
    const categoryFilter = 'BOTH';

    const result = await this.rollService.executeRoll(playerId, serverId, genderFilter, categoryFilter);

    return res.status(HttpStatus.OK).json(result);
  }
}