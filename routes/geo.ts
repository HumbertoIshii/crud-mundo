import { Router, Request, Response } from "express";
import { getContinentsList } from "../services/dashboard/continents.service";
import adminContinentsRouter from "./admin/continents";

const router = Router();

// Middleware de autenticação
router.use((req: Request, res, next) => {
  if (!req.session || !req.session.user) return res.redirect("/login");
  next();
});

// Página principal de administração
router.get("/", async (req: Request, res) => {
  try {
    // Lista todos os continentes (mesmo service usado no dashboard)
    const continents = await getContinentsList();

    res.render("geo", { page: "admin", continents });
  } catch (err) {
    console.error("Erro ao carregar geo:", err);
    res.status(500).send("Erro ao carregar página de administração");
  }
});

// Sub-rotas de admin
router.use("/continents", adminContinentsRouter);

export default router;