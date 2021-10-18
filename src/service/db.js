import prisma from "@prisma/client";
const { PrismaClient } = prisma;
const db = new PrismaClient();

//middleware example (in documentation)
db.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return result;
});

async function getAllCategories() {
  const categories = await db.category.findMany();
  return categories;
}

async function getAllProducts(conditions) {
  if (!conditions) conditions = { take: 20 };
  const products = await db.product.findMany(conditions);
  return products;
}

async function findProductsBySearch(search) {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: search,
      },
    },
  });
}

export { getAllProducts, getAllCategories };
