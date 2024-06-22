import {
  OnModuleInit,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { WebsocketExceptionFilter } from './ws-exception.filter';
import { Server, Socket } from 'socket.io';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway({
  cors: { origin: '*' },
})
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`connected to socket: ${socket.id}`);
    });
  }

  @SubscribeMessage('sendMessage')
  @UsePipes(new ValidationPipe())
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() _client: Socket,
  ) {
    this.server.emit('receiveMessage', {
      ...message,
      time: new Date().toString(),
    });
  }
}
