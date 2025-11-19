import { Router, Request, Response } from "express";
import {
  getCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  getCountriesForAutocomplete,
} from "../../services/admin/cities.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const filters = {
      search: req.query.search?.toString() || "",
      countryId: req.query.countryId ? Number(req.query.countryId) : undefined,
      orderBy: req.query.orderBy?.toString() || "nome",
      page: req.query.page ? Number(req.query.page) : 1,
    };
    const data = await getCities(filters);
    res.json(data);
  } catch (err) {
    console.error("Erro listar cidades admin:", err);
    res.status(500).send("Erro listar cidades");
  }
});


router.get("/autocomplete-country", async (req: Request, res: Response) => {
  try {
    const name = req.query.name?.toString() || "";
    if (!name) return res.json([]);
    const countries = await getCountriesForAutocomplete(name);
    res.json(countries);
  } catch (err) {
    console.error("Erro autocomplete countries:", err);
    res.status(500).json([]);
  }
});

// CREATE
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { nome, populacao, latitude, longitude, paisId } = req.body;
    if (!paisId || isNaN(Number(paisId))) return res.status(400).send("País inválido");
    await createCity({
      nome,
      populacao: Number(populacao) || 0,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      paisId: Number(paisId),
    });
    res.redirect("/geo");
  } catch (err) {
    console.error("Erro criar cidade:", err);
    res.status(500).send("Erro ao criar cidade");
  }
});

// UPDATE
router.post("/edit/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nome, populacao, latitude, longitude, paisId } = req.body;
    await updateCity(id, {
      nome,
      populacao: Number(populacao) || 0,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      paisId: Number(paisId),
    });
    res.redirect("/geo");
  } catch (err) {
    console.error("Erro atualizar cidade:", err);
    res.status(500).send("Erro ao atualizar cidade");
  }
});

// DELETE
router.post("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteCity(id);
    res.redirect("/geo");
  } catch (err) {
    console.error("Erro deletar cidade:", err);
    res.status(500).send("Erro ao deletar cidade");
  }
});

export default router;