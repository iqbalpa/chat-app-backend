import { Injectable, Request } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/utils/prisma/prisma';

@Injectable()
export class FriendsService {
  async addFriend(@Request() request, friendId: number): Promise<void> {
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

  async getFriends(@Request() request): Promise<User[]> {
    const userId = request['user'].id;
    const friendIds = await prisma.friend.findMany({
      where: { userId: userId },
      select: { friendId: true },
    });
    const friendIdsList: number[] = friendIds.map((friend) => friend.friendId);
    const friends: User[] = await prisma.user.findMany({
      where: {
        id: {
          in: friendIdsList,
        },
      },
    });
    const friendsWoPassword: User[] = friends.map((friend) => {
      friend.password = '';
      return friend;
    });
    return friendsWoPassword;
  }
}
