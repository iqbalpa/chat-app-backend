import { Injectable, Request } from '@nestjs/common';
import prisma from 'src/utils/prisma/prisma';

@Injectable()
export class FriendsService {
  async addFriend(@Request() request, friendId: number) {
    const user = request['user'];
    await prisma.friend.create({
      data: {
        userId: user.id,
        friendId: friendId,
      },
    });
    await prisma.friend.create({
      data: {
        userId: friendId,
        friendId: user.id,
      },
    });
  }
}
