const pool = require('../db/connection');
const Pagamento = require('../models/Pagamento');

class VendaMensalController {
    static async vendasPorMes() {
        const [rows] = await pool.query(`
            SELECT id, data_pagamento, valor, imovel_id
            FROM pagamento
        `);

        const pagamentos = rows.map(row => Pagamento.fromDatabase(row));

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

        return Object.entries(vendasPorMes).map(([mesAno, total]) => ({
            mesAno,
            total: Number(total.toFixed(2))
        }));
    }
}

module.exports = VendaMensalController;
