import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return {
      message: 'User updated successfully',
      user: {
        id,
        ...updateUserDto,
      },
    };
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    return {
      message: 'User removed successfully',
    };
  }
  async findUserEvents(id: string) {
    const participants = await this.prisma.participant.findMany({
      where: { userId: id },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            description: true,
            date: true,
            location: true,
            maxParticipants: true,
          },
        },
      },
    });
    return participants.map((p) => p.event);
  }
}
