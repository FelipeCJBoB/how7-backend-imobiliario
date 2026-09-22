const TipoImovel = require('./TipoImovel');

class Imovel {
    constructor(id, descricao, tipoImovelId, tipoImovel = null) {
        this.id = id;
        this.descricao = descricao;
        this.tipoImovelId = tipoImovelId;
        this.tipoImovel = tipoImovel;
    }

    static fromDatabase(row) {
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

        return new Imovel(
            Number(row.id),
            row.descricao,
            row.tipo_imovel_id !== undefined ? Number(row.tipo_imovel_id) : null
        );
    }
}

module.exports = Imovel;
