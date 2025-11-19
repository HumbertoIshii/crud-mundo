import { Router, Request, Response } from "express";
import {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  getAllContinentsForSelect,
} from "../../services/admin/countries.service";
import { lookupCountryByName } from "../../services/external/restCountries.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const filters = {
      search: req.query.search?.toString() || "",
      continentId: req.query.continent ? Number(req.query.continent) : undefined,
      orderBy: req.query.orderBy?.toString() || "nome",
      page: req.query.page ? Number(req.query.page) : 1,
    };
    const data = await getCountries(filters);
    res.json(data);
  } catch (err) {
    console.error("Erro listar countries admin:", err);
    res.status(500).send("Erro listar países");
  }
});

router.get("/lookup", async (req: Request, res: Response) => {
  const name = req.query.name?.toString() || "";
  if (!name) return res.status(400).json({ error: "Nome do país obrigatório", found: false });
  try {
    const result = await lookupCountryByName(name);
    if (!result.found) return res.status(404).json({ found: false });
    return res.json(result);
  } catch (err) {
    console.error("Erro lookup country:", err);
    return res.status(500).json({ error: "Erro ao buscar país", found: false });
  }
});

// CREATE
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { nome, populacao, idioma_oficial, moeda, continenteId, sigla, bandeira } = req.body;

    if (!continenteId || isNaN(Number(continenteId))) {
      return res.status(400).send("Nenhum continente foi selecionado.");
    }

    await createCountry({
      nome,
      populacao: Number(populacao) || 0,
      idioma_oficial,
      moeda,
      continenteId: Number(continenteId),
      sigla: sigla || null,
      bandeira: bandeira || null,
    });
    res.redirect("/geo");
  } catch (err) {
    console.error("Erro criar país:", err);
    res.status(500).send("Erro ao criar país");
  }
});

// UPDATE
router.post("/edit/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nome, populacao, idioma_oficial, moeda, continenteId, sigla, bandeira } = req.body;
    await updateCountry(id, {
      nome,
      populacao: Number(populacao) || 0,
      idioma_oficial,
      moeda,
      continenteId: Number(continenteId),
      sigla: sigla || null,
      bandeira: bandeira || null,
    });
    res.redirect("/geo");
  } catch (err) {
    console.error("Erro atualizar país:", err);
    res.status(500).send("Erro ao atualizar país");
  }
});

// DELETE
router.post("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteCountry(id);
    res.redirect("/geo");
  } catch (err) {
    console.error("Erro deletar país:", err);
    res.status(500).send("Erro ao deletar país");
  }
});

export default router;