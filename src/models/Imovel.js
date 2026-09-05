// src/models/Imovel.js
// Modelo de domínio da tabela `imovel` (schema.sql).
// Colunas reais: id (INT), descricao (VARCHAR(200)), tipo_imovel_id (FK -> tipo_imovel).

const TipoImovel = require('./TipoImovel');

class Imovel {
    /**
     * @param {number} id            - PK auto_increment.
     * @param {string} descricao     - Descrição do imóvel.
     * @param {number} tipoImovelId  - Chave estrangeira para tipo_imovel.
     * @param {TipoImovel|null} tipoImovel - Objeto TipoImovel associado (opcional).
     */
    constructor(id, descricao, tipoImovelId, tipoImovel = null) {
        this.id = id;
        this.descricao = descricao;
        this.tipoImovelId = tipoImovelId;
        this.tipoImovel = tipoImovel;
    }

    /**
     * Transforma uma linha crua do banco (mysql2) em um objeto Imovel.
     * Suporta tanto a tabela `imovel` pura quanto a linha do JOIN
     * (query_join.sql), que traz `codigo_imovel`, `descricao_imovel` e `tipo_imovel`.
     * @param {object} row
     * @returns {Imovel}
     */
    static fromDatabase(row) {
        // Caso venha da linha do JOIN (query_join.sql)
        if (row.codigo_imovel !== undefined) {
            const tipo = row.tipo_imovel !== undefined
                ? new TipoImovel(null, row.tipo_imovel)
                : null;
            return new Imovel(
                Number(row.codigo_imovel),
                row.descricao_imovel,
                tipo ? tipo.id : null,
                tipo
            );
        }

        // Caso venha da tabela `imovel` pura
        return new Imovel(
            Number(row.id),
            row.descricao,
            row.tipo_imovel_id !== undefined ? Number(row.tipo_imovel_id) : null
        );
    }
}

module.exports = Imovel;
