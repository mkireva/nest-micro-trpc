import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Delete(':id')
  deleteScoreById(@Param('id') id: string) {
    return this.scoresService.deleteScoreById(id);
  }

  @Post()
  async createScore(@Body() request: CreateScoreRequest) {
    return this.scoresService.createScore(request);
  }

  @Put(':id')
  updateScoreById(
    @Param('id') id: string,
    @Body() updatedScore: CreateScoreRequest,
  ) {
    const score = { ...updatedScore, id };
    return this.scoresService.updateScoreById(id, score);
  }
}
