import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";
import path from "path";

import indexRoutes from "./routes/index";
import authRoutes from "./routes/auth";
import geoRoutes from "./routes/geo";

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "segredo",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/geo", geoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
