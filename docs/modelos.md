# 📦 Camada de Modelos (POO) — Guia para o grupo

Estas classes são a **base dos 3 endpoints**. Os Integrantes 1, 2 e 5 devem
**importar** estas classes nos controllers em vez de manipular a linha crua do
banco na mão. Assim o POO fica consistente e ninguém precisa improvisar.

> Modelado sobre o `schema.sql` (Integrante 1) e a consulta `query_join.sql`
> (Integrante 2). Veja o diagrama em `docs/uml/`.

---

## 🧩 As 3 classes

| Classe        | Arquivo             | Tabela / origem     |
|---------------|---------------------|---------------------|
| `TipoImovel`  | `TipoImovel.js`     | `tipo_imovel`       |
| `Imovel`      | `Imovel.js`         | `imovel`            |
| `Pagamento`   | `Pagamento.js`      | `pagamento`         |

Cada classe tem:
- um **`constructor`** com os atributos;
- um método estático **`fromDatabase(row)`** que transforma uma linha crua do
  banco (mysql2) em um objeto de domínio.

---

## ⚠️ O detalhe que resolve um bug nos 3 endpoints

O driver **mysql2 devolve `DECIMAL` como TEXTO** (`"5000.00"`, não `5000`).

O `constructor` do `Pagamento` já faz `this.valor = Number(valor)`, então
**você nunca precisa converter valor na mão**. Sempre que passar a linha pelo
`Pagamento.fromDatabase(row)`, o `valor` sai como `number`.

```js
typeof pagamento.valor // => "number"  ✔
```

---

## 🚀 Como importar (CommonJS)

```js
const TipoImovel = require('../models/TipoImovel');
const Imovel     = require('../models/Imovel');
const Pagamento  = require('../models/Pagamento');
```

> Ajuste o caminho `../models/...` conforme a pasta do seu controller.

---

## 📖 Uso nos controllers

### 1) Endpoint que lista pagamentos usando o JOIN (`query_join.sql`)

As classes já entendem as colunas do JOIN
(`id_venda`, `data_do_pagamento`, `valor_do_pagamento`, `codigo_imovel`,
`descricao_imovel`, `tipo_imovel`). Basta mapear cada linha:

```js
const [rows] = await connection.query(SQL_DO_JOIN);

const pagamentos = rows.map(row => Pagamento.fromDatabase(row));

// Cada item já vem com o Imovel e o TipoImovel aninhados:
// pagamentos[0].valor            -> number
// pagamentos[0].imovel.descricao -> string
// pagamentos[0].imovel.tipoImovel.nome -> string
res.json(pagamentos);
```

### 2) Endpoint que lê a tabela `pagamento` pura

```js
const [rows] = await connection.query(
  'SELECT id, data_pagamento, valor, imovel_id FROM pagamento'
);

const pagamentos = rows.map(row => Pagamento.fromDatabase(row));
res.json(pagamentos);
```

### 3) Endpoint de imóveis

```js
const [rows] = await connection.query(
  'SELECT id, descricao, tipo_imovel_id FROM imovel'
);

const imoveis = rows.map(row => Imovel.fromDatabase(row));
res.json(imoveis);
```

### 4) Endpoint de tipos

```js
const [rows] = await connection.query('SELECT id, nome FROM tipo_imovel');
const tipos = rows.map(row => TipoImovel.fromDatabase(row));
res.json(tipos);
```

---

## 🗺️ De onde cada atributo vem

| Coluna SQL                 | Atributo do objeto              |
|----------------------------|---------------------------------|
| `tipo_imovel.id`           | `TipoImovel.id`                 |
| `tipo_imovel.nome`         | `TipoImovel.nome`               |
| `imovel.id`                | `Imovel.id`                     |
| `imovel.descricao`         | `Imovel.descricao`              |
| `imovel.tipo_imovel_id`    | `Imovel.tipoImovelId` (FK)      |
| `pagamento.id`             | `Pagamento.id`                  |
| `pagamento.data_pagamento` | `Pagamento.dataPagamento`       |
| `pagamento.valor` DECIMAL  | `Pagamento.valor` (via Number()) |
| `pagamento.imovel_id`      | `Pagamento.imovelId` (FK)       |

---

## ✅ Testar a camada

```bash
node src/models/teste.js
```

Saída esperada (resumo): os objetos impressos e
`typeof pagamento.valor => number`, provando a conversão do DECIMAL.
