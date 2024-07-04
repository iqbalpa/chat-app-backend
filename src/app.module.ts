import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [AuthModule, UsersModule, FriendsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
