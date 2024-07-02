import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async addFriend(@Request() request, @Body('friendId') friendId: number) {
    return this.friendsService.addFriend(request, friendId);
  }
}
