import { Router } from "express";
import { getContinentsList } from "../../services/dashboard/continents.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const continentes = await getContinentsList();
    res.json(continentes);
  } catch (error) {
    console.error("Erro na rota continents:", error);
    res.status(500).json({ error: "Erro ao carregar continentes" });
  }
});

export default router;
