import { db } from "../../database/database";

interface CityFilters {
  search?: string; // busca pelo nome da cidade
  searchCountryContinent?: string; // busca por país ou continente
  orderBy?: string;
  page?: number;
}

export async function getCities(filters: CityFilters) {
  const { search = "", searchCountryContinent = "", orderBy = "nome", page = 1 } = filters;

  const limit = 10;
  const offset = (page - 1) * limit;
  const maxQueryLimit = 100;

  const validOrder: Record<string, string> = {
    nome: "ci.nome",
    populacao: "ci.populacao",
    latitude: "ci.latitude",
    longitude: "ci.longitude",
    pais: "p.nome",
    continente: "c.nome",
  };

  const sortColumn = validOrder[orderBy] || "ci.nome";

  let where = "WHERE 1=1";
  const params: any[] = [];

  if (search) {
    where += " AND ci.nome LIKE ?";
    params.push(`%${search}%`);
  }

  if (searchCountryContinent) {
    where += " AND (p.nome LIKE ? OR c.nome LIKE ?)";
    params.push(`%${searchCountryContinent}%`, `%${searchCountryContinent}%`);
  }

  const [[{ total }]]: any = await db.query(
    `
    SELECT COUNT(*) AS total
    FROM cidades ci
    JOIN paises p ON ci.paisId = p.id
    JOIN continentes c ON c.id = p.continenteId
    ${where}
  `,
    params
  );

  const totalItems = Math.min(total, maxQueryLimit);
  const totalPages = Math.ceil(totalItems / limit);

  const [cities]: any = await db.query(
    `
    SELECT 
      ci.id,
      ci.nome,
      ci.populacao,
      ci.latitude,
      ci.longitude,
      p.nome AS pais,
      c.nome AS continente
    FROM cidades ci
    JOIN paises p ON ci.paisId = p.id
    JOIN continentes c ON c.id = p.continenteId
    ${where}
    ORDER BY ${sortColumn} ASC
    LIMIT ? OFFSET ?
  `,
    [...params, limit, offset]
  );

  return {
    cities,
    totalItems,
    totalPages,
    currentPage: page,
  };
}