import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '@prisma/client';
import prisma from 'src/utils/prisma/prisma';

@Injectable()
export class MessagesService {
  async create(dto: Omit<CreateMessageDto, 'friendRoomId'>): Promise<Message> {
    const message: Message = await prisma.message.create({
      data: dto,
    });
    return message;
  }

  async findAll(): Promise<Message[]> {
    const messages: Message[] = await prisma.message.findMany({});
    return messages;
  }
}
