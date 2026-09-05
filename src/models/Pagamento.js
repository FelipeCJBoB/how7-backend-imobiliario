// src/models/Pagamento.js
// Modelo de domínio da tabela `pagamento` (schema.sql).
// Colunas reais: id (INT), data_pagamento (DATE), valor (DECIMAL(10,2)), imovel_id (FK -> imovel).
//
// ATENÇÃO: o driver mysql2 devolve DECIMAL como TEXTO ("5000.00").
// Por isso o constructor converte `valor` com Number() — resolve de uma vez
// o bug que apareceria nos 3 endpoints.

const Imovel = require('./Imovel');

class Pagamento {
    /**
     * @param {number} id            - PK auto_increment.
     * @param {string|Date} dataPagamento - Data do pagamento.
     * @param {number} valor         - Valor já convertido para número.
     * @param {number} imovelId      - Chave estrangeira para imovel.
     * @param {Imovel|null} imovel   - Objeto Imovel associado (opcional).
     */
    constructor(id, dataPagamento, valor, imovelId, imovel = null) {
        this.id = id;
        this.dataPagamento = dataPagamento;
        this.valor = Number(valor); // DECIMAL vem como texto -> vira número
        this.imovelId = imovelId;
        this.imovel = imovel;
    }

    /**
     * Transforma uma linha crua do banco (mysql2) em um objeto Pagamento.
     * Suporta tanto a tabela `pagamento` pura quanto a linha do JOIN
     * (query_join.sql), que traz `id_venda`, `data_do_pagamento`,
     * `valor_do_pagamento` + dados do imóvel.
     * @param {object} row
     * @returns {Pagamento}
     */
    static fromDatabase(row) {
        // Caso venha da linha do JOIN (query_join.sql)
        if (row.id_venda !== undefined) {
            const imovel = Imovel.fromDatabase(row);
            return new Pagamento(
                Number(row.id_venda),
                row.data_do_pagamento,
                Number(row.valor_do_pagamento), // DECIMAL como texto -> número
                imovel.id,
                imovel
            );
        }

        // Caso venha da tabela `pagamento` pura
        return new Pagamento(
            Number(row.id),
            row.data_pagamento,
            Number(row.valor), // DECIMAL como texto -> número
            row.imovel_id !== undefined ? Number(row.imovel_id) : null
        );
    }
}

module.exports = Pagamento;
