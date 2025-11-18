// routes/geo.ts
import { Router, Request, Response } from "express";
import adminContinentsRouter from "./admin/continents";
import adminCountriesRouter from "./admin/countries";
import { getContinentsList } from "../services/dashboard/continents.service";
import { getCountries } from "../services/admin/countries.service";

const router = Router();

// Middleware de autenticação (todas as rotas de /geo)
router.use((req: Request, res: Response, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const continents = await getContinentsList();

    const countryFilters = {
      search: req.query.search?.toString() || "",
      continentId: req.query.continent ? Number(req.query.continent) : undefined,
      orderBy: req.query.orderBy?.toString() || "nome",
      page: req.query.countryPage ? Number(req.query.countryPage) : 1,
    };
    const countriesData = await getCountries(countryFilters);

    res.render("geo", {
      page: "admin",
      continents,
      countries: countriesData.countries,
      totalPages: countriesData.totalPages,
      currentPage: countriesData.currentPage,
      search: countryFilters.search,
      continentSelected: countryFilters.continentId || "",
      orderBy: countryFilters.orderBy,
    });
  } catch (err) {
    console.error("Erro ao carregar geo:", err);
    res.status(500).send("Erro ao carregar página de administração");
  }
});

// Sub-rotas de admin
router.use("/continents", adminContinentsRouter);
router.use("/countries", adminCountriesRouter);

export default router;