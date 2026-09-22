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
