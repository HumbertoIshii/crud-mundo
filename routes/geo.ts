import { Router } from "express";
import { db } from "../database/database";

const router = Router();

// Middleware para checar login
router.use((req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
});

// Página principal de gerenciamento
router.get("/", async (req, res) => {
  const [continentes]: any = await db.query("SELECT * FROM continentes");
  const [paises]: any = await db.query("SELECT * FROM paises");
  const [cidades]: any = await db.query("SELECT * FROM cidades");

  res.render("geo", { title: "Gerenciamento", continentes, paises, cidades });
});

// Exemplo: criar continente
router.post("/continentes", async (req, res) => {
  const { nome, descricao } = req.body;
  await db.query("INSERT INTO continentes (nome, descricao) VALUES (?, ?)", [nome, descricao]);
  res.redirect("/geo");
});

// Exemplo: excluir continente
router.post("/continentes/:id/delete", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM continentes WHERE id = ?", [id]);
  res.redirect("/geo");
});

export default router;
