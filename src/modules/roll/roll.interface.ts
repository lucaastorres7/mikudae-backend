export abstract class IRollRepository {
  abstract getRandomCharacter(genderFilter?: string, categoryFilter?: string): Promise<any>;
  abstract checkPlayerRolls(playerId: string, lastRollReset: Date, now: Date): Promise<any>;
  abstract updateRollsCount(playerId: string): Promise<any>
}