import { getAllProducts, getAllCategories } from "./db.js";
const service = () => {
  return Object.freeze({
    getAllProducts,
    getAllCategories,
  });
};

// inyección de prisma
const exposeService = async (req, _, next) => {
  try {
    req.prisma = service();
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error });
  }
};

export default exposeService;
