import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma.service';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [AuthModule, UsersModule, EventsModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
