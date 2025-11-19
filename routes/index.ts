import { Router } from "express";
import { getGeneralTotals } from "../services/dashboard/general.service";
import { getContinentsList } from "../services/dashboard/continents.service";
import { getCountries } from "../services/dashboard/countries.service";
import { getCities } from "../services/dashboard/cities.service";
import { getMapMarkers } from "../services/external/map.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const general = await getGeneralTotals();
    const continentes = await getContinentsList();

    const countryFilters = {
      search: req.query.search?.toString() || "",
      continentId: req.query.continent ? Number(req.query.continent) : undefined,
      orderBy: req.query.orderBy?.toString() || "nome",
      page: req.query.countryPage ? Number(req.query.countryPage) : 1,
    };

    const countriesData = await getCountries(countryFilters);

    const cityFilters = {
      search: req.query.citySearch?.toString() || "",
      searchCountryContinent: req.query.cityCountryContinent?.toString() || "",
      orderBy: req.query.cityOrderBy?.toString() || "nome",
      page: req.query.cityPage ? Number(req.query.cityPage) : 1,
    };

    const citiesData = await getCities(cityFilters);

    const markers = await getMapMarkers();

    res.render("index", {
      title: "Dashboard",
      ...general,
      continents: continentes,

      // Países
      ...countriesData,
      search: countryFilters.search,
      continentSelected: countryFilters.continentId || "",
      orderBy: countryFilters.orderBy,

      // Cidades
      cities: citiesData.cities,
      citySearch: cityFilters.search,
      cityCountryContinent: cityFilters.searchCountryContinent,
      cityOrderBy: cityFilters.orderBy,
      cityCurrentPage: citiesData.currentPage,
      cityTotalPages: citiesData.totalPages,

      // Marcadores do mapa
      markers,

      page: "dashboard",
    });
  } catch (err) {
    console.error("Erro rota index:", err);
    res.status(500).send("Erro ao carregar dashboard");
  }
});

export default router;