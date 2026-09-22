const TipoImovel = require('./TipoImovel');
const Imovel = require('./Imovel');
const Pagamento = require('./Pagamento');

console.log('=== 1) Linhas das tabelas puras ===');

const tipoRow = { id: 1, nome: 'Apartamento' };
const imovelRow = { id: 1, descricao: 'Apartamento 100m2 em condomínio fechado', tipo_imovel_id: 1 };
const pagamentoRow = { id: 1, data_pagamento: '2023-08-10', valor: '5000.00', imovel_id: 1 };

const tipo = TipoImovel.fromDatabase(tipoRow);
const imovel = Imovel.fromDatabase(imovelRow);
const pagamento = Pagamento.fromDatabase(pagamentoRow);

console.log(tipo);
console.log(imovel);
console.log(pagamento);
console.log('typeof pagamento.valor =>', typeof pagamento.valor, '(deve ser "number")');

console.log('\n=== 2) Linha do JOIN (query_join.sql) ===');

const joinRow = {
    id_venda: 10,
    data_do_pagamento: '2023-09-25',
    valor_do_pagamento: '5100.00',
    codigo_imovel: 1,
    descricao_imovel: 'Apartamento 100m2 em condomínio fechado',
    tipo_imovel: 'Apartamento'
};

const pagamentoJoin = Pagamento.fromDatabase(joinRow);
console.log(pagamentoJoin);
console.log('imóvel aninhado =>', pagamentoJoin.imovel);
console.log('typeof valor =>', typeof pagamentoJoin.valor, '(deve ser "number")');
