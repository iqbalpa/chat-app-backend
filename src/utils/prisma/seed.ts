import prisma from './prisma';
import { PasswordHelper } from '../hash/password-hash.helper';

interface User {
  name: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'password123',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    password: 'password123',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    password: 'password123',
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    password: 'password123',
  },
  {
    name: 'Eva Martinez',
    email: 'eva.martinez@example.com',
    password: 'password123',
  },
  {
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    password: 'password123',
  },
  {
    name: 'Grace Lee',
    email: 'grace.lee@example.com',
    password: 'password123',
  },
  {
    name: 'Hank Adams',
    email: 'hank.adams@example.com',
    password: 'password123',
  },
  {
    name: 'Ivy Clark',
    email: 'ivy.clark@example.com',
    password: 'password123',
  },
  {
    name: 'Jack Lewis',
    email: 'jack.lewis@example.com',
    password: 'password123',
  },
  {
    name: 'Kate Walker',
    email: 'kate.walker@example.com',
    password: 'password123',
  },
  {
    name: 'Liam Young',
    email: 'liam.young@example.com',
    password: 'password123',
  },
  {
    name: 'Mia King',
    email: 'mia.king@example.com',
    password: 'password123',
  },
  {
    name: 'Noah Scott',
    email: 'noah.scott@example.com',
    password: 'password123',
  },
  {
    name: 'Olivia White',
    email: 'olivia.white@example.com',
    password: 'password123',
  },
  {
    name: 'Paul Hall',
    email: 'paul.hall@example.com',
    password: 'password123',
  },
  {
    name: 'Quinn Allen',
    email: 'quinn.allen@example.com',
    password: 'password123',
  },
  {
    name: 'Rachel Harris',
    email: 'rachel.harris@example.com',
    password: 'password123',
  },
  {
    name: 'Sam Baker',
    email: 'sam.baker@example.com',
    password: 'password123',
  },
  {
    name: 'Tina Nelson',
    email: 'tina.nelson@example.com',
    password: 'password123',
  },
];

const seed = async (users: User[]) => {
  console.log('seeding data...');
  for (let user of users) {
    const hashedPass = await PasswordHelper.hash(user.password);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPass,
      },
    });
  }
};

seed(users)
  .then(() => console.log('seeding data finished'))
  .catch(() => console.log('failed to seed data'));
