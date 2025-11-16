import { db } from "../../database/database";

export async function getContinentsList() {
  const [continentes]: any = await db.query(
    "SELECT id, nome, descricao FROM continentes ORDER BY nome ASC"
  );

  return continentes;
}