-- Consulta com JOIN — tarefa "Consulta SQL e OpenAPI" (Integrante 2, Etapa 1).
-- Passo a passo completo: cartões [E1] da sua lista no Trello.
--
-- O que este arquivo precisa ter:
--   Uma única consulta que devolve uma linha por pagamento, já com os dados
--   do imóvel e do tipo, usando INNER JOIN entre as 3 tabelas.
--
-- As colunas do resultado, nomeadas com AS exatamente assim:
--   id_venda, data_do_pagamento, valor_do_pagamento,
--   codigo_imovel, descricao_imovel, tipo_imovel
--
-- Esta é a consulta que o backend inteiro reaproveita na Etapa 2.


SELECT
    pagamento.id AS id_venda,
    pagamento.data_pagamento AS data_do_pagamento,
    pagamento.valor AS valor_do_pagamento,
    imovel.id AS codigo_imovel,
    imovel.descricao AS descricao_imovel,
    tipo_imovel.nome AS tipo_imovel
FROM pagamento
INNER JOIN imovel
    ON pagamento.imovel_id = imovel.id
INNER JOIN tipo_imovel
    ON imovel.tipo_imovel_id = tipo_imovel.id;