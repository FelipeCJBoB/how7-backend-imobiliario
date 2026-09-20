// Controle do Endpoint C — tarefa "Endpoint C" (Integrante 5, Etapa 2).
// Passo a passo completo: cartões [E2] da sua lista no Trello.
//
// Classe de controle que calcula o percentual de vendas por tipo de imóvel.
//
// O que esta classe precisa fazer:
//   1. Buscar os pagamentos usando a conexão de src/db/connection.js
//   2. Transformar as linhas em objetos Pagamento (classes de src/models/)
//   3. Somar o valor por tipo de imóvel usando reduce — sem WHERE e sem GROUP BY no SQL
//   4. Calcular o total geral e o percentual de cada tipo sobre esse total
//   5. Devolver uma lista com o tipo, o total e o percentual
//
// Usa POO (as classes de model) para representar os dados e programação
// funcional (reduce) para processá-los — os dois paradigmas do enunciado.
//
// ATENÇÃO: o item (c) do enunciado diz "total de vendas (quantitativas)", mas a
// descrição do gráfico diz "percentual do valor total das vendas". Confirmem com
// o professor se é percentual por VALOR somado ou por QUANTIDADE de vendas.
const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');
const Pagamento = require('../models/Pagamento');

const QUERY_JOIN = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'query_join.sql'),
  'utf8'
);

class TipoImovelController {
  static async percentualPorTipo() {
    const [rows] = await pool.query(QUERY_JOIN);
    const pagamentos = rows.map((row) => Pagamento.fromDatabase(row));

    const acumuladoPorTipo = pagamentos.reduce((acumulado, pagamento) => {
      const tipo = pagamento.imovel.tipoImovel.nome;

      if (!acumulado[tipo]) {
        acumulado[tipo] = { totalValor: 0, quantidadeVendas: 0 };
      }

      acumulado[tipo].totalValor += pagamento.valor;
      acumulado[tipo].quantidadeVendas += 1;

      return acumulado;
    }, {});

    const valorGeral = Object.values(acumuladoPorTipo)
      .reduce((soma, item) => soma + item.totalValor, 0);
    const quantidadeGeral = Object.values(acumuladoPorTipo)
      .reduce((soma, item) => soma + item.quantidadeVendas, 0);

    return Object.entries(acumuladoPorTipo).map(([tipo, dados]) => ({
      tipoImovel: tipo,
      totalValor: Math.round(dados.totalValor * 100) / 100,
      percentualPorValor: Math.round((dados.totalValor / valorGeral) * 100 * 100) / 100,
      quantidadeVendas: dados.quantidadeVendas,
      percentualPorQuantidade: Math.round((dados.quantidadeVendas / quantidadeGeral) * 100 * 100) / 100,
    }));
  }
}

module.exports = TipoImovelController;