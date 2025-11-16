import { db } from "../../database/database";

interface CountryFilters {
  search?: string;
  continentId?: number;
  orderBy?: string;
  page?: number;
}

export async function getCountries(filters: CountryFilters) {
  const { search = "", continentId, orderBy = "nome", page = 1 } = filters;

  const limit = 10;
  const offset = (page - 1) * limit;

  const maxQueryLimit = 100;

  const validOrder = {
    nome: "p.nome",
    populacao: "p.populacao",
    idioma: "p.idioma_oficial",
    moeda: "p.moeda",
    continente: "c.nome",
  };

  const sortColumn = validOrder[orderBy] || "p.nome";

  let where = "WHERE 1=1";
  const params: any[] = [];

  if (search) {
    where += " AND p.nome LIKE ?";
    params.push(`%${search}%`);
  }

  if (continentId) {
    where += " AND p.continenteId = ?";
    params.push(continentId);
  }

  const [[{ total }]]: any = await db.query(
    `
    SELECT COUNT(*) AS total
    FROM paises p
    JOIN continentes c ON c.id = p.continenteId
    ${where}
  `,
    params
  );

  const totalItems = Math.min(total, maxQueryLimit);
  const totalPages = Math.ceil(totalItems / limit);

  const countriesParams = [...params, limit, offset];

  const [countries]: any = await db.query(
    `
    SELECT 
      p.id,
      p.nome,
      p.populacao,
      p.idioma_oficial,
      p.moeda,
      c.nome AS continente
    FROM paises p
    JOIN continentes c ON c.id = p.continenteId
    ${where}
    ORDER BY ${sortColumn} ASC
    LIMIT ? OFFSET ?
  `,
    countriesParams
  );

  return {
    countries,
    totalItems,
    totalPages,
    currentPage: page,
  };
}

export async function getAllContinents() {
  const [rows]: any = await db.query(
    "SELECT id, nome FROM continentes ORDER BY nome ASC"
  );
  return rows;
}