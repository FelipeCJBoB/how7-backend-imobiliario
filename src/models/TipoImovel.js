class TipoImovel {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    static fromDatabase(row) {
        return new TipoImovel(
            Number(row.id),
            row.nome
        );
    }
}

module.exports = TipoImovel;
