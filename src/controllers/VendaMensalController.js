const pool = require('../db/connection');
const Pagamento = require('../models/Pagamento');

class VendaMensalController {

    static async vendasPorMes() {

        // Busca todos os pagamentos.
        // O agrupamento será feito em JavaScript com reduce,
        // sem WHERE e sem GROUP BY no SQL.
        const [rows] = await pool.query(`
            SELECT id, data_pagamento, valor, imovel_id
            FROM pagamento
        `);

        // Transforma cada linha do banco em um objeto Pagamento.
        const pagamentos = rows.map(row => Pagamento.fromDatabase(row));

        // Agrupa os pagamentos por MM/AAAA e soma os valores.
        const vendasPorMes = pagamentos.reduce((acumulador, pagamento) => {

            const data = new Date(pagamento.dataPagamento);

            const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
            const ano = data.getUTCFullYear();

            const periodo = `${mes}/${ano}`;

            if (!acumulador[periodo]) {
                acumulador[periodo] = 0;
            }

            acumulador[periodo] += pagamento.valor;

            return acumulador;

        }, {});

        // Transforma o objeto agrupado em uma lista.
        return Object.entries(vendasPorMes).map(([mesAno, total]) => ({
            mesAno,
            total: Number(total.toFixed(2))
        }));
    }
}

module.exports = VendaMensalController;