import { db } from "../../database/database";

export async function getGeneralTotals() {
  const [[{ totalContinentes }]]: any = await db.query(
    "SELECT COUNT(*) AS totalContinentes FROM continentes"
  );
  const [[{ totalPaises }]]: any = await db.query(
    "SELECT COUNT(*) AS totalPaises FROM paises"
  );
  const [[{ totalCidades }]]: any = await db.query(
    "SELECT COUNT(*) AS totalCidades FROM cidades"
  );

  return { totalContinentes, totalPaises, totalCidades };
}