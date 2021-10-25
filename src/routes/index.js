import { Router } from "express";
const router = Router();

/* GET home page. */


router.get("/categories", async function (req, res) {
  try {
    const results = await req.prisma.getAllCategories();
    return res.json({ data: results, message: "oc" });
  } catch (e) {
    console.error("err", err);
    return res.status(500).send({ error: "Failed due to Server error!" });
  }
});

router.get("/products", async function (req, res) {
  try {
    const { search, categorie, discount, priceRange, page } = req.query;

    const take = 20
    const conditions = {};

    if (page && parseInt(page)) {
      conditions.skip = parseInt(page-1)*take
    }

    conditions.take = take

    conditions.where = {}

    if (search && search !== "") {
      conditions.where.name = { contains: search };
    }

    if (categorie && categorie !== "all") {
      conditions.where.category = { equals: parseInt(categorie) };
    }

    if (discount && discount !== "all") {
      conditions.where.discount = { gte: parseInt(discount) };
    }

    if (priceRange && priceRange !== "all") {
      const [infLimit, supLimit] = priceRange.split("-");
      conditions.where.price = {
        gte: parseInt(infLimit),
      };

      if (supLimit != 0) conditions.where.price.lte = parseInt(supLimit);
    }
    console.log(conditions)
    const results = await req.prisma.getAllProducts(conditions);
    return res.json({ data: results, message: "oc" });
  } catch (e) {
    console.error("e", e);
    return res.status(500).send({ error: "Failed due to Server error!" });
  }
});
router.get("*", function (_, res) {
  return res.json({ message: "api route" });
});
export default router;
