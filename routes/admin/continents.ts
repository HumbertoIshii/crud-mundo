import { Router } from "express";
import {
  getAllContinents,
  getContinentById,
  createContinent,
  updateContinent,
  deleteContinent,
} from "../../services/admin/continents.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const continents = await getAllContinents();
    res.render("geo", { title: "Administração - Continentes", continents });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar continentes");
  }
});

// Criar continente
router.post("/create", async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    await createContinent(nome, descricao);
    res.redirect("/geo");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar continente");
  }
});

// Editar continente
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    await updateContinent(Number(id), nome, descricao);
    res.redirect("/geo");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar continente");
  }
});

// Deletar continente
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteContinent(Number(id));
    res.redirect("/geo");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar continente");
  }
});

export default router;