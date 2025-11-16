import { Router } from "express";
import { getGeneralTotals } from "../services/dashboard/general.service";
import { getContinentsList } from "../services/dashboard/continents.service";
import { getCountries } from "../services/dashboard/countries.service";

const router = Router();

router.get("/", async (req, res) => {
  const general = await getGeneralTotals();
  const continentes = await getContinentsList();

  // Filtros da área de países
  const filters = {
    search: req.query.search?.toString() || "",
    continentId: req.query.continent ? Number(req.query.continent) : undefined,
    orderBy: req.query.orderBy?.toString() || "nome",
    page: req.query.page ? Number(req.query.page) : 1,
  };

  const countriesData = await getCountries(filters);

  res.render("index", {
    title: "Dashboard",
    ...general,
    continents: continentes,
    ...countriesData,
    search: filters.search,
    continentSelected: filters.continentId || "",
    orderBy: filters.orderBy,
    page: "dashboard",
  });
});

export default router;