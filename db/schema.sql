CREATE DATABASE IF NOT EXISTS imobiliaria
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE imobiliaria;

SET NAMES utf8mb4;

CREATE TABLE tipo_imovel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);
CREATE TABLE imovel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    tipo_imovel_id INT NOT NULL,
    FOREIGN KEY (tipo_imovel_id) REFERENCES tipo_imovel(id)
);
CREATE TABLE pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_pagamento DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    imovel_id INT NOT NULL,
    FOREIGN KEY (imovel_id) REFERENCES imovel(id)
);
