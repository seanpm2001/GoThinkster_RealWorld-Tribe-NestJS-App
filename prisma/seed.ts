import { PrismaClient, Role } from '@prisma/client';
import * as process from "process";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: Role.SUPER_ADMIN },
    update: {},
    create: {
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'SUPER_ADMIN',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
