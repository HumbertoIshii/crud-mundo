import { Router } from "express";
import { getGeneralTotals } from "../../services/dashboard/general.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const totals = await getGeneralTotals();
    res.json(totals);
  } catch (error) {
    console.error("Erro na rota general:", error);
    res.status(500).json({ error: "Erro ao carregar totais" });
  }
});

export default router;