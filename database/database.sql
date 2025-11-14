-- =========================
-- Banco de Dados CRUD Mundo
-- =========================

CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario` VARCHAR(191) NOT NULL UNIQUE,
  `senha` VARCHAR(191) NOT NULL
);

CREATE TABLE `continentes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(191) NOT NULL,
  `descricao` TEXT NOT NULL
);

CREATE TABLE `paises` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(191) NOT NULL,
  `populacao` INT NOT NULL,
  `idioma_oficial` VARCHAR(191) NOT NULL,
  `moeda` VARCHAR(191) NOT NULL,
  `continenteId` INT NOT NULL,
  INDEX `idx_paises_continenteId` (`continenteId`),
  CONSTRAINT `fk_paises_continente`
    FOREIGN KEY (`continenteId`) REFERENCES `continentes`(`id`)
    ON DELETE CASCADE
);

CREATE TABLE `cidades` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(191) NOT NULL,
  `populacao` INT NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `paisId` INT NOT NULL,
  INDEX `idx_cidades_paisId` (`paisId`),
  CONSTRAINT `fk_cidades_pais`
    FOREIGN KEY (`paisId`) REFERENCES `paises`(`id`)
    ON DELETE CASCADE
);

/*
===========================================
ENTIDADES, ATRIBUTOS E RELAÇÕES
===========================================

1. ENTIDADE: Admin
   - Atributos:
     • id (INT, PK, autoincremento)
     • usuario (VARCHAR, único)
     • senha (VARCHAR)
   - Relações: Nenhuma

2. ENTIDADE: Continente
   - Atributos:
     • id (INT, PK, autoincremento)
     • nome (VARCHAR)
     • descricao (TEXT)
   - Relações:
     • 1 Continente → N Países  (relação 1:N)

3. ENTIDADE: Pais
   - Atributos:
     • id (INT, PK, autoincremento)
     • nome (VARCHAR)
     • populacao (INT)
     • idioma_oficial (VARCHAR)
     • moeda (VARCHAR)
     • continenteId (INT, FK → Continente.id)
   - Relações:
     • N Países → 1 Continente  (pertence a)
     • 1 País → N Cidades       (relação 1:N)

4. ENTIDADE: Cidade
   - Atributos:
     • id (INT, PK, autoincremento)
     • nome (VARCHAR)
     • populacao (INT)
     • latitude (FLOAT)
     • longitude (FLOAT)
     • paisId (INT, FK → Pais.id)
   - Relações:
     • N Cidades → 1 País  (pertence a)

-------------------------------------------
RESUMO DAS RELAÇÕES:
-------------------------------------------
- Continente 1 → N Países
- País 1 → N Cidades
- Admin é independente (sem relações)
-------------------------------------------
*/
