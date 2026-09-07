import { prisma } from "../prisma/PrismaClient.js";

async function main() {
  const categories = await prisma.category.findMany();

  console.log(categories);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
