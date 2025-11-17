import { Router } from "express";
import { getCities } from "../../services/dashboard/cities.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { search, orderBy, page } = req.query;

    const filters = {
      search: search?.toString() || "",
      orderBy: orderBy?.toString() || "nome",
      page: page ? Number(page) : 1,
    };

    const { cities, totalPages, currentPage } = await getCities(filters);

    res.render("partials/dashboard/cities", {
      cities,
      search: filters.search,
      orderBy: filters.orderBy,
      totalPages,
      currentPage,
    });
  } catch (err) {
    console.error("Erro rota cities:", err);
    res.status(500).send("Erro ao carregar cidades");
  }
});

export default router;