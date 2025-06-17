import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto, creatorId: string) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        creatorId,
      },
    });
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        participants: {
          select: {
            user: {
              select: {
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
    return {
      message: 'Event updated successfully',
      event: updatedEvent,
    };
  }

  async remove(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    await this.prisma.event.delete({ where: { id } });
    return {
      message: 'Event removed successfully',
    };
  }
}
