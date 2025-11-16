import { Router } from "express";
import { getCountries, getAllContinents } from "../../services/dashboard/countries.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { search, continent, orderBy, page } = req.query;

    const filters = {
      search: search?.toString() || "",
      continentId: continent ? Number(continent) : undefined,
      orderBy: orderBy?.toString() || "nome",
      page: page ? Number(page) : 1,
    };

    const { countries, totalPages, currentPage } = await getCountries(filters);
    const continents = await getAllContinents();

    res.render("partials/dashboard/countries", {
      countries,
      continents,
      search: filters.search,
      continentSelected: filters.continentId || "",
      orderBy: filters.orderBy,
      totalPages,
      currentPage,
    });
  } catch (err) {
    console.error("Erro rota countries:", err);
    res.status(500).send("Erro ao carregar países");
  }
});

export default router;