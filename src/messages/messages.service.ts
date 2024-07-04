import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Iqbal', text: 'Hello, good morning all!' }];
  clientToUser = {};

  create(createMessageDto: CreateMessageDto): Message {
    const message = { ...createMessageDto };
    this.messages.push(message);
    console.log('All messages:', this.messages); // Log all messages for debugging
    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(cliendId: string) {
    return this.clientToUser[cliendId];
  }
}
