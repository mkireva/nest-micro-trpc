import { Inject, Injectable } from '@nestjs/common';
import { Score } from './score.interface';
import { CreateScoreRequest } from './dto/create-score-reuqest';
import { CLIENTS } from './clients/clients.constants';
import { Clients } from './clients/clients.interface';

@Injectable()
export class ScoresService {
  constructor(@Inject(CLIENTS) private readonly clients: Clients) {}

  private readonly scores: Score[] = [];

  getAllScores() {
    return this.scores;
  }

  deleteScoreById(id: string) {
    const index = this.scores.findIndex((score) => score.id === id);
    if (index !== -1) {
      this.scores.splice(index, 1);
      return true;
    }
    return false;
  }
  getScoreById(id: string) {
    return this.scores.find((score) => score.id === id);
  }

  updateScoreById(id: string, updatedScore: Score) {
    const index = this.scores.findIndex((score) => score.id === id);
    if (index !== -1) {
      this.scores[index] = { ...this.scores[index], ...updatedScore };
      return this.scores[index];
    }
    return null;
  }

  async createScore(request: CreateScoreRequest) {
    const newScore: Score = {
      ...request,
      id: Math.random().toString(36).substring(2, 15),
    };
    const payment = await this.clients.paymentsClient.payments.getPayment.query(
      {
        id: request.paymentId,
      },
    );
    // Use the payment somehow
    console.log(payment);
    this.scores.push(newScore);
    return newScore;
  }
}
