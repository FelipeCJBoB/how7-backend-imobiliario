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
