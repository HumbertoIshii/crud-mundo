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
  `nome` VARCHAR(255) NOT NULL,
  `descricao` TEXT
);

CREATE TABLE `paises` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `populacao` INT,
  `idioma_oficial` VARCHAR(255),
  `moeda` VARCHAR(255),
  `continenteId` INT NOT NULL,
  `sigla` VARCHAR(10),
  `bandeira` VARCHAR(255),
  INDEX `idx_paises_continenteId` (`continenteId`),
  CONSTRAINT `fk_paises_continente`
    FOREIGN KEY (`continenteId`) REFERENCES `continentes`(`id`)
    ON DELETE CASCADE
);

CREATE TABLE `cidades` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `populacao` INT,
  `latitude` FLOAT,
  `longitude` FLOAT,
  `paisId` INT NOT NULL,
  INDEX `idx_cidades_paisId` (`paisId`),
  CONSTRAINT `fk_cidades_pais`
    FOREIGN KEY (`paisId`) REFERENCES `paises`(`id`)
    ON DELETE CASCADE
);