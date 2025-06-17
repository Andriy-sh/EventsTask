import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, PrismaService, JwtStrategy],
})
export class ParticipantModule {}
