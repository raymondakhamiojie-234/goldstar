import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import bcrypt from 'bcrypt';

neonConfig.webSocketConstructor = ws;

const DATABASE_URL = "postgresql://neondb_owner:npg_Xwhd7MGORxF5@ep-frosty-rice-b4fethyr-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@goldstar.com';
  const plainPassword = 'goldstaradmin';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      name: 'Gold Star Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Admin user created or updated!`);
  console.log(`Email: ${admin.email}`);
  console.log(`Password: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
