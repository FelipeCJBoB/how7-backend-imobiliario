# Diagrama de Classes — Sistema Imobiliária

Modelado sobre o `schema.sql` (Integrante 1). As classes de domínio espelham
as tabelas `tipo_imovel`, `imovel` e `pagamento`.

```mermaid
classDiagram
    class TipoImovel {
        -number id
        -string nome
        +constructor(id, nome)
        +fromDatabase(row)$ TipoImovel
    }

    class Imovel {
        -number id
        -string descricao
        -number tipoImovelId
        -TipoImovel tipoImovel
        +constructor(id, descricao, tipoImovelId, tipoImovel)
        +fromDatabase(row)$ Imovel
    }

    class Pagamento {
        -number id
        -Date dataPagamento
        -number valor
        -number imovelId
        -Imovel imovel
        +constructor(id, dataPagamento, valor, imovelId, imovel)
        +fromDatabase(row)$ Pagamento
    }

    TipoImovel "1" <-- "0..*" Imovel : tipo_imovel_id
    Imovel "1" <-- "0..*" Pagamento : imovel_id
```

## Correspondência tabela → classe

| Tabela SQL      | Coluna            | Classe / Atributo             |
|-----------------|-------------------|-------------------------------|
| `tipo_imovel`   | `id`              | `TipoImovel.id`               |
| `tipo_imovel`   | `nome`            | `TipoImovel.nome`             |
| `imovel`        | `id`              | `Imovel.id`                   |
| `imovel`        | `descricao`       | `Imovel.descricao`            |
| `imovel`        | `tipo_imovel_id`  | `Imovel.tipoImovelId` (FK)    |
| `pagamento`     | `id`              | `Pagamento.id`                |
| `pagamento`     | `data_pagamento`  | `Pagamento.dataPagamento`     |
| `pagamento`     | `valor` DECIMAL   | `Pagamento.valor` (Number())  |
| `pagamento`     | `imovel_id`       | `Pagamento.imovelId` (FK)     |
