# HOW VII — Backend Imobiliário

Serviços web (REST) para consulta de transações imobiliárias, desenvolvidos para a disciplina
**Hands On Work VII (29049)** — Análise e Desenvolvimento de Sistemas, UNIVALI, 2026/2.

O enunciado exige **os dois paradigmas**: orientação a objetos (classes de model e de controle,
modeladas em UML) e programação funcional (`map` / `filter` / `reduce` no processamento).
Filtros e agregações **não podem** usar `WHERE` nem `GROUP BY` no SQL — os dados são carregados
por inteiro e todo o processamento acontece na linguagem de programação.

O frontend (gráficos) não faz parte do escopo deste repositório.

- **Quadro Trello**: https://trello.com/b/xm1BF9Rm/how-vii-backend-imobiliario

## Equipe

Cada aluno escolhe qual **número de Integrante** quer ser e assume as duas tarefas daquele
número — uma na Etapa 1 e outra na Etapa 2. Todos escrevem JavaScript em pelo menos uma delas.

| # | Nome | GitHub | Etapa 1 | Etapa 2 |
|---|---|---|---|---|
| 1 | Felipe Ramos Silva | [@FelipeCJBoB](https://github.com/FelipeCJBoB) | Banco de dados (`schema.sql` + `seed.sql`) | Endpoint A — soma por imóvel |
| 2 | _a preencher_ | _a preencher_ | Consulta SQL (`query_join.sql`) + OpenAPI | Endpoint B — total por mês/ano |
| 3 | _a preencher_ | _a preencher_ | Conexão e código do item (e) | Testes, prints e atualização do PDF |
| 4 | Fernando Menezes de Jesus | _a preencher_ | Classes de model e controle (POO) + UML | Vídeo de apresentação |
| 5 | Letícia | _a preencher_ | Consolidação do PDF da Etapa 1 | Endpoint C — percentual por tipo |

## Arquitetura

```
Rota (Express)  →  Controller (classe)  →  Model (classes)  →  Conexão (mysql2)
   HTTP              map/filter/reduce       representa as        SELECT sem
                     = paradigma funcional   entidades = POO      WHERE/GROUP BY
```

A rota só recebe a requisição e devolve JSON. O cálculo fica no controller, que usa as
classes de model para representar os dados. É essa separação que entrega o requisito de
orientação a objetos do enunciado.

## Endpoints

Todos respondem a `GET` e devolvem JSON.

| Rota | Retorna | Gráfico |
|---|---|---|
| `/api/soma-por-imovel` | Cada imóvel com a soma de todos os seus pagamentos | Barras |
| `/api/vendas-por-mes` | O total de vendas de cada mês/ano | Linhas |
| `/api/vendas-por-tipo` | O percentual de cada tipo de imóvel no total de vendas | Pizza |

A especificação completa, com exemplos de resposta, está em `docs/openapi.yaml`.

## Estrutura

```
how7-backend-imobiliario/
├── db/
│   ├── schema.sql              — Integrante 1  (estrutura das tabelas)
│   ├── seed.sql                 — Integrante 1  (massa de dados)
│   └── query_join.sql           — Integrante 2  (consulta com JOIN)
├── src/
│   ├── server.js                 — Integrante 3  (bootstrap do Express)
│   ├── db/connection.js          — Integrante 3  (pool de conexão MySQL)
│   ├── models/                    — Integrante 4  (POO: entidades do domínio)
│   │   ├── TipoImovel.js
│   │   ├── Imovel.js
│   │   ├── Pagamento.js
│   │   └── teste.js                 (demonstração das classes)
│   ├── controllers/               — POO: a lógica de cada serviço
│   │   ├── ImovelController.js       — Integrante 1  (Endpoint A)
│   │   ├── VendaMensalController.js  — Integrante 2  (Endpoint B)
│   │   └── TipoImovelController.js   — Integrante 5  (Endpoint C)
│   └── routes/                     — só recebem a requisição e devolvem JSON
│       ├── vendasPorImovel.js        — Integrante 1
│       ├── vendasPorMes.js           — Integrante 2
│       └── vendasPorTipo.js          — Integrante 5
├── docs/
│   ├── openapi.yaml             — Integrante 2  (especificação da API)
│   ├── modelos.md               — Integrante 4  (guia das classes de model)
│   ├── uml/                      — Integrante 4  (diagrama de classes)
│   ├── prints/                    — prints dos testes (Etapa 2)
│   └── entrega/                    — PDFs enviados em cada etapa
├── testes/                         — Integrante 3  (testes de conexão)
├── .env.example
├── .gitignore
└── package.json
```

## Preparando o ambiente

1. Instale o [Node.js](https://nodejs.org) (versão 20 ou superior), o
   [MySQL](https://dev.mysql.com/downloads/) e o [VS Code](https://code.visualstudio.com).
2. Clone o repositório:
   ```bash
   git clone https://github.com/FelipeCJBoB/how7-backend-imobiliario
   ```
3. Copie `.env.example` para `.env` e preencha com as credenciais do seu MySQL local.
   O `.env` nunca vai para o GitHub.
4. Rode `db/schema.sql` e depois `db/seed.sql` no MySQL Workbench (nessa ordem).
5. Confirme que o seu ambiente está igual ao do resto do grupo. O resultado deve ser **32**:
   ```sql
   SELECT COUNT(*) FROM pagamento;
   ```
6. Instale as dependências (`express`, `mysql2`, `dotenv`) e ligue o servidor:
   ```bash
   npm install
   npm start
   ```
   O servidor sobe em `http://localhost:3000`.

## Decisão sobre o item (c)

O item (c) da Parte 2 pede *"valor percentual no total de vendas **(quantitativas)**"*, mas a
descrição do gráfico de pizza fala em *"percentual do **valor total** das vendas"*. São
resultados diferentes. Por isso `/api/vendas-por-tipo` devolve as duas leituras:
`percentualPorValor` (sobre a soma dos valores) e `percentualPorQuantidade` (sobre o número
de vendas).
