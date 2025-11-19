import { db } from "../../database/database";
import { Cidade, Pais } from "../../types/entities";

interface CityFilters {
  search?: string;
  countryId?: number;
  orderBy?: string;
  page?: number;
}

export async function getCities(filters: CityFilters) {
  const { search = "", countryId, orderBy = "nome", page = 1 } = filters;

  const limit = 10;
  const offset = (page - 1) * limit;
  const maxQueryLimit = 100;

  const validOrder: { [k: string]: string } = {
    nome: "ci.nome",
    populacao: "ci.populacao",
    latitude: "ci.latitude",
    longitude: "ci.longitude",
    pais: "p.nome",
  };
  const sortColumn = validOrder[orderBy] || "ci.nome";

  let where = "WHERE 1=1";
  const params: any[] = [];

  if (search) {
    where += " AND ci.nome LIKE ?";
    params.push(`%${search}%`);
  }

  if (countryId) {
    where += " AND ci.paisId = ?";
    params.push(countryId);
  }

  const [[{ total }]]: any = await db.query(
    `SELECT COUNT(*) AS total
     FROM cidades ci
     JOIN paises p ON p.id = ci.paisId
     ${where}`,
    params
  );

  const totalItems = Math.min(total, maxQueryLimit);
  const totalPages = Math.ceil(totalItems / limit);
  const citiesParams = [...params, limit, offset];

  const [cities]: any = await db.query(
    `SELECT ci.id, ci.nome, ci.populacao, ci.latitude, ci.longitude, ci.paisId, p.nome AS pais
     FROM cidades ci
     JOIN paises p ON p.id = ci.paisId
     ${where}
     ORDER BY ${sortColumn} ASC
     LIMIT ? OFFSET ?`,
    citiesParams
  );

  return {
    cities,
    totalItems,
    totalPages,
    currentPage: page,
  };
}

export async function getCityById(id: number) {
  const [rows]: any = await db.query(
    "SELECT id, nome, populacao, latitude, longitude, paisId FROM cidades WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

export async function createCity(data: {
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  paisId: number;
}) {
  const { nome, populacao, latitude, longitude, paisId } = data;
  await db.query(
    `INSERT INTO cidades (nome, populacao, latitude, longitude, paisId)
     VALUES (?, ?, ?, ?, ?)`,
    [nome, populacao, latitude, longitude, paisId]
  );
}

export async function updateCity(id: number, data: {
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  paisId: number;
}) {
  const { nome, populacao, latitude, longitude, paisId } = data;
  await db.query(
    `UPDATE cidades SET nome = ?, populacao = ?, latitude = ?, longitude = ?, paisId = ? WHERE id = ?`,
    [nome, populacao, latitude, longitude, paisId, id]
  );
}

export async function deleteCity(id: number) {
  await db.query("DELETE FROM cidades WHERE id = ?", [id]);
}

export async function getCountriesForAutocomplete(search: string): Promise<Pais[]> {
  const [rows]: any = await db.query(
    "SELECT id, nome FROM paises WHERE nome LIKE ? ORDER BY nome ASC LIMIT 10",
    [`%${search}%`]
  );
  return rows;
}