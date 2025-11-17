import { Router, Request, Response } from "express";

const router = Router();

router.use((req: Request, res: Response, next) => {
  if (!req.session || !req.session.user) return res.redirect("/login");
  next();
});

router.get("/", async (req, res) => {
  res.render("geo", { page: "admin" });
});

export default router;