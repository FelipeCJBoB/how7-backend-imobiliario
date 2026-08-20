-- Estrutura do banco — tarefa "Modelagem & DDL" (Integrante 1, Etapa 1).
-- Passo a passo completo: cartões [E1] da sua lista no Trello.
--
-- O que este arquivo precisa ter:
--   1. Criação do banco imobiliaria
--   2. CREATE TABLE de tipo_imovel (id, nome)
--   3. CREATE TABLE de imovel (id, descricao, tipo_imovel_id -> FK tipo_imovel)
--   4. CREATE TABLE de pagamento (id, data_pagamento, valor, imovel_id -> FK imovel)
--
-- A ordem importa: uma tabela só pode referenciar outra que já existe.

CREATE DATABASE IF NOT EXISTS imobiliaria;
USE imobiliaria;
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