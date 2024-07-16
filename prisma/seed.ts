import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'example@gmail.com', password: await encryptPassword('123456') },
    { email: 'test@gmail.com', password: await encryptPassword('123456') },
    { email: 'trader@gmail.com', password: await encryptPassword('123456') },
    { email: 'buyer@gmail.com', password: await encryptPassword('123456') },
    { email: 'seller@gmail.com', password: await encryptPassword('123456') },
  ];

  const shares = [
    { symbol: 'ABC', latestPrice: 5000 },
    { symbol: 'XYZ', latestPrice: 10000 },
    { symbol: 'QRS', latestPrice: 40000 },
    { symbol: 'STR', latestPrice: 1000 },
  ];

  await prisma.user.createMany({ data: users });
  await prisma.share.createMany({ data: shares });
}

async function encryptPassword(password: string): Promise<string> {
  const salt = await genSalt();
  const hashPassword = await hash(password, salt);
  return hashPassword;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
