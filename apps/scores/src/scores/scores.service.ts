import { Inject, Injectable } from '@nestjs/common';
import { Score } from './score.interface';
import { CLIENTS } from './clients/clients.constants';
import { Clients } from './clients/clients.interface';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { eq } from 'drizzle-orm';


@Injectable()
export class ScoresService {
  constructor(
    @Inject(CLIENTS) private readonly clients: Clients,
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) { }

  private readonly scores: Score[] = [];

  async getScores() {
    return this.database.query.scores.findMany(
      { with: { user: true }, },
    );
  }


  getScore(scoreId: number) {
    return this.database.query.scores.findFirst({
      where: eq(schema.scores.id, scoreId)
    })
  }

  private formatDateForDb(date: any): string | null {
    if (date == null) return null;
    if (date instanceof Date) return date.toISOString().split('T')[0];
    if (typeof date === 'string') return date;
    return new Date(date).toISOString().split('T')[0];
  }

  async createScore(request: typeof schema.scores.$inferInsert) {
    // Only fetch payment if paymentId is provided
    if (request.paymentId) {
      const payment = await this.clients.paymentsClient.payments.getPayment.query(
        {
          id: request.paymentId,
        },
      );
      // Use the payment somehow
      console.log(payment);
    }

    const newScore = await this.database
      .insert(schema.scores)
      .values({
        ...request,
        createDate: this.formatDateForDb(request.createDate),
      })
      .returning();
    return newScore;
  }

  async updatePost(scoreId: number, score: typeof schema.scores.$inferInsert) {
    const result = this.database
      .update(schema.scores)
      .set(score)
      .where(eq(schema.scores.id, scoreId))
      .returning();
    return result
  }


  async deleteScore(scoreId: number) {
    const result = await this.database
      .delete(schema.scores)
      .where(eq(schema.scores.id, scoreId))
      .returning();
      

    return result.length > 0;
  }
}
