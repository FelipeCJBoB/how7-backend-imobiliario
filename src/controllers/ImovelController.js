const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');
const Pagamento = require('../models/Pagamento');

const QUERY_JOIN = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'query_join.sql'),
  'utf8'
);

class ImovelController {
  static async somaPorImovel() {
    const [rows] = await pool.query(QUERY_JOIN);
    const pagamentos = rows.map((row) => Pagamento.fromDatabase(row));

    const totaisPorImovel = pagamentos.reduce((acumulado, pagamento) => {
      const { id, descricao } = pagamento.imovel;

      if (!acumulado[id]) {
        acumulado[id] = {
          codigo_imovel: id,
          descricao_imovel: descricao,
          total_vendas: 0,
        };
      }

      acumulado[id].total_vendas += pagamento.valor;
      return acumulado;
    }, {});

    return Object.values(totaisPorImovel).map((item) => ({
      ...item,
      total_vendas: Math.round(item.total_vendas * 100) / 100,
    }));
  }
}

module.exports = ImovelController;
