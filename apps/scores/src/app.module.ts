import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './scores/clients/clients.module';
import { ScoresModule } from './scores/scores.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ClientsModule,
    ScoresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
