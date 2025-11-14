import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../database/database";

const router = Router();

// Página de login
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Login POST
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const [rows]: any = await db.query("SELECT * FROM admins WHERE usuario = ?", [usuario]);
    const admin = rows[0];

    if (admin && (await bcrypt.compare(senha, admin.senha))) {
      req.session.user = { id: admin.id, usuario: admin.usuario };
      return res.redirect("/geo");
    }

    res.render("login", { title: "Login", error: "Usuário ou senha incorretos." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

export default router;
