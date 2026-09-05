// src/models/TipoImovel.js
// Modelo de domínio da tabela `tipo_imovel` (schema.sql).
// Colunas reais: id (INT), nome (VARCHAR(50)).

class TipoImovel {
    /**
     * @param {number} id   - PK auto_increment.
     * @param {string} nome - Nome do tipo (ex.: "Apartamento", "Casa").
     */
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    /**
     * Transforma uma linha crua do banco (mysql2) em um objeto TipoImovel.
     * @param {object} row - Linha retornada pela query.
     * @returns {TipoImovel}
     */
    static fromDatabase(row) {
        return new TipoImovel(
            Number(row.id),
            row.nome
        );
    }
}

module.exports = TipoImovel;
