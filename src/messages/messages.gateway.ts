import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() dto: CreateMessageDto) {
    const message = await this.messagesService.create({
      name: dto.name,
      text: dto.text,
      roomId: dto.roomId,
    });
    this.server.to(dto.roomId).to(dto.friendRoomId).emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findHistoryMessages')
  async findHistoryByRoomId(@MessageBody('roomId') roomId: string) {
    console.log(roomId);
    const messages = await this.messagesService.findHistoryByRoomId(roomId);
    console.log(messages);
    this.server.emit('history', messages);
    return messages;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(roomId);
    client.join(roomId);
    console.log(`${client.id} joined room ${roomId}`);
  }
}
