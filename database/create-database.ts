import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import readline from "readline";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
};

const connection = mysql.createConnection(dbConfig);

const createDatabaseAndTables = `
CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
USE ${process.env.DB_NAME};

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(191) NOT NULL UNIQUE,
  senha VARCHAR(191) NOT NULL
);

CREATE TABLE IF NOT EXISTS continentes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(191) NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS paises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(191) NOT NULL,
  populacao INT NOT NULL,
  idioma_oficial VARCHAR(191) NOT NULL,
  moeda VARCHAR(191) NOT NULL,
  continenteId INT NOT NULL,
  INDEX idx_paises_continenteId (continenteId),
  CONSTRAINT fk_paises_continente FOREIGN KEY (continenteId)
    REFERENCES continentes(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(191) NOT NULL,
  populacao INT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  paisId INT NOT NULL,
  INDEX idx_cidades_paisId (paisId),
  CONSTRAINT fk_cidades_pais FOREIGN KEY (paisId)
    REFERENCES paises(id)
    ON DELETE CASCADE
);
`;

function main() {
  connection.query(createDatabaseAndTables, (err) => {
    if (err) {
      console.error("Erro ao criar banco de dados/tabelas:", err);
      process.exit(1);
    }

    console.log("Banco de dados e tabelas criados/verificados com sucesso.");

    const db = mysql.createConnection({
      ...dbConfig,
      database: process.env.DB_NAME,
    });

    rl.question("Defina o nome de usuário do administrador: ", (usuario) => {
      rl.question("Defina a senha do administrador: ", async (senha) => {
        try {
          const hash = await bcrypt.hash(senha, 10);

          db.query(
            "INSERT INTO admins (usuario, senha) VALUES (?, ?)",
            [usuario, hash],
            (err) => {
              if (err) {
                if ((err as any).code === "ER_DUP_ENTRY") {
                  console.log("Usuário já existe, nenhuma alteração feita.");
                } else {
                  throw err;
                }
              } else {
                console.log("Administrador criado com sucesso!");
              }

              finalizar(db);
            }
          );
        } catch (error) {
          console.error("Erro ao criar administrador:", error);
          finalizar(db);
        }
      });
    });
  });
}


function finalizar(db: mysql.Connection) {
  rl.close();
  db.end();
  connection.end();
  console.log("Conexões encerradas. Processo finalizado.");
  process.exit(0);
}

main();
