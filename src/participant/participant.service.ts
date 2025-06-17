import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto, userId: string) {
    const { eventId } = createParticipantDto;

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.participants.length >= event.maxParticipants) {
      throw new BadRequestException(
        'Registration limit reached for this event',
      );
    }

    const participant = await this.prisma.participant.create({
      data: {
        ...createParticipantDto,

        userId,
      },
    });

    return {
      message: 'Participant registered successfully',
      participant,
    };
  }

  async findAll() {
    return await this.prisma.participant.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.participant.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    await this.prisma.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
    return `This action updates a #${id} participant`;
  }

  async remove(id: string) {
    await this.prisma.participant.delete({
      where: { id },
    });
    return {
      message: 'Participant removed successfully',
    };
  }
}
