import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import * as schema from './schema';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) { }

  @Get()
  getScores() {
    return this.scoresService.getScores();
  }

  @Get('without-uploads')
  getScoresWithoutUploads() {
    return this.scoresService.getScoresWithoutUploads();
  }

  @Get(':id')
  async getScoreById(@Param('id') id: string) {
    return this.scoresService.getScore(parseInt(id));
  }

  @Get(':id/with-uploads')
  async getScoreWithUploads(@Param('id') id: string) {
    return this.scoresService.getScoreWithUploads(parseInt(id));
  }

  @Post()
  async createScore(@Body() request: typeof schema.scores.$inferInsert) {
    return this.scoresService.createScore(request);
  }

  @Patch(':id')
  async updateScore(
    @Param('id') scoreId: string,
    @Body() request: Partial<typeof schema.scores.$inferInsert>,
  ) {
    return this.scoresService.updatePost(parseInt(scoreId), request);
  }

  @Delete(':id')
  deleteScoreById(@Param('id') id: string) {
    return this.scoresService.deleteScore(parseInt(id));
  }
}
