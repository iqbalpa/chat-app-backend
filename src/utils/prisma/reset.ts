import prisma from './prisma';

const reset = async () => {
  await prisma.friend.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.message.deleteMany({});
};

reset()
  .then(() => console.log('reset database success!'))
  .catch(() => console.log('failed to reset database'));
