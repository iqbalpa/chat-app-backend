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

  async findHistoryByRoomId(roomId: string): Promise<Message[]> {
    const myRoomMessages: Message[] = await prisma.message.findMany({
      where: {
        roomId,
      },
    });
    const ids = roomId.split('-');
    const friendRoomId: string = `${ids[1]}-${ids[0]}`;
    const friendRoomMessages: Message[] = await prisma.message.findMany({
      where: {
        roomId: friendRoomId,
      },
    });
    let messages: Message[] = myRoomMessages.concat(friendRoomMessages);
    messages.sort((a, b) => a.date.getTime() - b.date.getTime());
    return messages;
  }
}
