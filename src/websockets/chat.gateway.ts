import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { WebsocketExceptionFilter } from './ws-exception.filter';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway()
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway {
  @SubscribeMessage('chat')
  @UsePipes(new ValidationPipe())
  handleMessage(@MessageBody() message: ChatMessage) {
    console.log(message);
  }
}
