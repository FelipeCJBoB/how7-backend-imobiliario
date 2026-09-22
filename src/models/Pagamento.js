const Imovel = require('./Imovel');

class Pagamento {
    constructor(id, dataPagamento, valor, imovelId, imovel = null) {
        this.id = id;
        this.dataPagamento = dataPagamento;
        this.valor = Number(valor);
        this.imovelId = imovelId;
        this.imovel = imovel;
    }

    static fromDatabase(row) {
        if (row.id_venda !== undefined) {
            const imovel = Imovel.fromDatabase(row);
            return new Pagamento(
                Number(row.id_venda),
                row.data_do_pagamento,
                Number(row.valor_do_pagamento),
                imovel.id,
                imovel
            );
        }

        return new Pagamento(
            Number(row.id),
            row.data_pagamento,
            Number(row.valor),
            row.imovel_id !== undefined ? Number(row.imovel_id) : null
        );
    }
}

module.exports = Pagamento;
