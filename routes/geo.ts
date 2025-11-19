import { Router, Request, Response } from "express";
import adminContinentsRouter from "./admin/continents";
import adminCountriesRouter from "./admin/countries";
import citiesRouter from "./admin/cities";
import { getContinentsList } from "../services/dashboard/continents.service";
import { getCountries } from "../services/admin/countries.service";
import { getCities } from "../services/admin/cities.service";
import { db } from "../database/database";

const router = Router();

router.use((req: Request, res: Response, next) => {
  if (!req.session || !req.session.user) return res.redirect("/login");
  next();
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const continents = await getContinentsList();

    // Filtros de países
    const countryFilters = {
      search: req.query.search?.toString() || "",
      continentId: req.query.continent ? Number(req.query.continent) : undefined,
      orderBy: req.query.orderBy?.toString() || "nome",
      page: req.query.countryPage ? Number(req.query.countryPage) : 1,
    };
    const countriesData = await getCountries(countryFilters);

    // Filtros de cidades
    const cityFilters = {
      search: req.query.citySearch?.toString() || "",
      countryId: req.query.countryId ? Number(req.query.countryId) : undefined,
      continentId: req.query.cityCountryContinent ? Number(req.query.cityCountryContinent) : undefined,
      orderBy: req.query.cityOrderBy?.toString() || "nome",
      page: req.query.cityPage ? Number(req.query.cityPage) : 1,
    };
    const citiesData = await getCities(cityFilters);

    // Lista completa de países para autocomplete nos modais
    const [countriesList]: any = await db.query("SELECT id, nome FROM paises ORDER BY nome ASC");

    // Renderiza a view geo.ejs
    res.render("geo", {
      page: "admin",
      continents,
      countries: countriesData.countries,
      totalPages: countriesData.totalPages,
      currentPage: countriesData.currentPage,
      search: countryFilters.search,
      continentSelected: countryFilters.continentId || "",
      orderBy: countryFilters.orderBy,
      cities: citiesData.cities,
      cityTotalPages: citiesData.totalPages,
      cityCurrentPage: citiesData.currentPage,
      citySearch: cityFilters.search,
      countrySelected: cityFilters.countryId || "",
      cityOrderBy: cityFilters.orderBy,
      cityCountryContinent: cityFilters.continentId || "",
      countriesList,
    });
  } catch (err) {
    console.error("Erro ao carregar geo:", err);
    res.status(500).send("Erro ao carregar página de administração");
  }
});

router.use("/continents", adminContinentsRouter);
router.use("/countries", adminCountriesRouter);
router.use("/cities", citiesRouter);

export default router;