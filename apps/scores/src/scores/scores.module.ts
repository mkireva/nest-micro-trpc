import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ClientsModule, DatabaseModule],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
