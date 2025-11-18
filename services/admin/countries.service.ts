// services/admin/countries.service.ts
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

  const validOrder: { [k: string]: string } = {
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
      p.sigla,
      p.bandeira,
      p.continenteId,
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

export async function getCountryById(id: number) {
  const [rows]: any = await db.query(
    "SELECT id, nome, populacao, idioma_oficial, moeda, continenteId, sigla, bandeira FROM paises WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

export async function createCountry(data: {
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  continenteId: number;
  sigla?: string | null;
  bandeira?: string | null;
}) {
  const { nome, populacao, idioma_oficial, moeda, continenteId, sigla = null, bandeira = null } = data;
  await db.query(
    `INSERT INTO paises (nome, populacao, idioma_oficial, moeda, continenteId, sigla, bandeira)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nome, populacao, idioma_oficial, moeda, continenteId, sigla, bandeira]
  );
}

export async function updateCountry(id: number, data: {
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  continenteId: number;
  sigla?: string | null;
  bandeira?: string | null;
}) {
  const { nome, populacao, idioma_oficial, moeda, continenteId, sigla = null, bandeira = null } = data;
  await db.query(
    `UPDATE paises SET nome = ?, populacao = ?, idioma_oficial = ?, moeda = ?, continenteId = ?, sigla = ?, bandeira = ? WHERE id = ?`,
    [nome, populacao, idioma_oficial, moeda, continenteId, sigla, bandeira, id]
  );
}

export async function deleteCountry(id: number) {
  await db.query("DELETE FROM paises WHERE id = ?", [id]);
}

export async function getAllContinentsForSelect() {
  const [rows]: any = await db.query("SELECT id, nome FROM continentes ORDER BY nome ASC");
  return rows;
}