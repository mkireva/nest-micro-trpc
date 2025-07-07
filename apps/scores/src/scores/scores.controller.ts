import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScoreRequest } from './dto/create-score-reuqest';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  getAllScores() {
    return this.scoresService.getAllScores();
  }

  @Get(':id')
  getScoreById(@Param('id') id: string) {
    return this.scoresService.getScoreById(id);
  }

  @Post()
  async createScore(@Body() request: CreateScoreRequest) {
    return this.scoresService.createScore(request);
  }
}
