import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './scores/clients/clients.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ClientsModule,
    ScoresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
