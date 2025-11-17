import { db } from "../../database/database";
import { Continente } from "../../types/entities";

export async function getAllContinents(): Promise<Continente[]> {
  const [rows]: any = await db.query(
    "SELECT id, nome, descricao FROM continentes ORDER BY nome ASC"
  );
  return rows;
}

export async function getContinentById(id: number): Promise<Continente | null> {
  const [rows]: any = await db.query(
    "SELECT id, nome, descricao FROM continentes WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

export async function createContinent(nome: string, descricao: string): Promise<void> {
  await db.query(
    "INSERT INTO continentes (nome, descricao) VALUES (?, ?)",
    [nome, descricao]
  );
}

export async function updateContinent(id: number, nome: string, descricao: string): Promise<void> {
  await db.query(
    "UPDATE continentes SET nome = ?, descricao = ? WHERE id = ?",
    [nome, descricao, id]
  );
}

export async function deleteContinent(id: number): Promise<void> {
  await db.query(
    "DELETE FROM continentes WHERE id = ?",
    [id]
  );
}