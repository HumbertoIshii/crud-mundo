import { Router } from "express";
import { db } from "../database/database";

const router = Router();

router.get("/", async (req, res) => {
  const [[{ totalContinentes }]]: any = await db.query("SELECT COUNT(*) AS totalContinentes FROM continentes");
  const [[{ totalPaises }]]: any = await db.query("SELECT COUNT(*) AS totalPaises FROM paises");
  const [[{ totalCidades }]]: any = await db.query("SELECT COUNT(*) AS totalCidades FROM cidades");

  res.render("index", {
    title: "Dashboard",
    totalContinentes,
    totalPaises,
    totalCidades,
  });
});

export default router;