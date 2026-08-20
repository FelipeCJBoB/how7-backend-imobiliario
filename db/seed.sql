-- Massa de dados — tarefa "Banco de dados" (Integrante 1, Etapa 1).
-- Passo a passo completo: cartões [E1] da sua lista no Trello.
--
-- O que este arquivo precisa ter:
--   1. INSERT dos tipos de imóvel
--   2. INSERT de no mínimo 8 imóveis, de tipos variados
--   3. INSERT de no mínimo 30 pagamentos, cobrindo no mínimo 5 meses distintos
--
-- Todo imóvel precisa ter pelo menos 1 pagamento.
-- A ordem importa: tipo_imovel, depois imovel, depois pagamento.

USE imobiliaria;

-- 1. Tipos de imóvel
INSERT INTO tipo_imovel (nome) VALUES
('Apartamento'),
('Casa'),
('Sala Comercial'),
('Terreno'),
('Galpão');

-- 2. Imóveis (8 no mínimo, tipos variados)
INSERT INTO imovel (descricao, tipo_imovel_id) VALUES
('Apartamento 100m2 em condomínio fechado', 1),
('Apartamento 60m2 no centro', 1),
('Casa 3 quartos com quintal', 2),
('Casa geminada 2 quartos', 2),
('Sala comercial 40m2 no centro', 3),
('Sala comercial em galeria', 3),
('Terreno 500m2 em bairro residencial', 4),
('Galpão industrial 800m2', 5);

-- 3. Pagamentos (30 no mínimo, cobrindo 5+ meses distintos)
INSERT INTO pagamento (data_pagamento, valor, imovel_id) VALUES
('2023-08-10', 5000.00, 1),
('2023-08-15', 4800.00, 2),
('2023-08-20', 3200.00, 3),
('2023-08-25', 3100.00, 4),
('2023-09-05', 2500.00, 5),
('2023-09-10', 2600.00, 6),
('2023-09-15', 7000.00, 7),
('2023-09-20', 9500.00, 8),
('2023-09-25', 5100.00, 1),
('2023-10-01', 4900.00, 2),
('2023-10-05', 3300.00, 3),
('2023-10-10', 3150.00, 4),
('2023-10-15', 2550.00, 5),
('2023-10-20', 2650.00, 6),
('2023-10-25', 7100.00, 7),
('2023-11-01', 9600.00, 8),
('2023-11-05', 5200.00, 1),
('2023-11-10', 5000.00, 2),
('2023-11-15', 3400.00, 3),
('2023-11-20', 3200.00, 4),
('2023-11-25', 2600.00, 5),
('2023-12-01', 2700.00, 6),
('2023-12-05', 7200.00, 7),
('2023-12-10', 9700.00, 8),
('2023-12-15', 5300.00, 1),
('2023-12-20', 5100.00, 2),
('2023-12-25', 3500.00, 3),
('2024-01-05', 3300.00, 4),
('2024-01-10', 2700.00, 5),
('2024-01-15', 2800.00, 6),
('2024-01-20', 7300.00, 7),
('2024-01-25', 9800.00, 8);