# HOW VII — Backend Imobiliário

Serviços web (REST) para consulta de transações imobiliárias, desenvolvidos para a disciplina
**Hands On Work VII (29049)** — Análise e Desenvolvimento de Sistemas, UNIVALI, 2026/2.

Backend puro: acessa o banco relacional, carrega os dados na íntegra e processa tudo em
memória com `map` / `filter` / `reduce` — nada de `WHERE` ou `GROUP BY` no SQL. O frontend
(gráficos) não faz parte do escopo deste repositório.

> **Este repositório é um esqueleto.** Todos os arquivos já existem, mas estão **vazios** —
> contêm apenas comentários dizendo o que precisa ser feito. Todo o código é escrito por vocês.

- **Quadro Trello**: https://trello.com/b/xm1BF9Rm/how-vii-backend-imobiliario

## Equipe

Cada aluno escolhe qual **número de Integrante** quer ser e assume as duas tarefas daquele
número — uma na Etapa 1 e outra na Etapa 2. Preencham o nome e o usuário GitHub num Pull Request.

| Integrante | Nome | Usuário GitHub | Etapa 1 | Etapa 2 |
|---|---|---|---|---|
| 1 | _a preencher_ | _a preencher_ | Modelagem & DDL | Endpoint C — percentual por tipo |
| 2 | _a preencher_ | _a preencher_ | Dados & Consulta SQL | Endpoint B — total por mês/ano |
| 3 | _a preencher_ | _a preencher_ | Integração backend | Endpoint A — soma por imóvel |
| 4 | _a preencher_ | _a preencher_ | Especificação OpenAPI | Vídeo de apresentação |
| 5 | _a preencher_ | _a preencher_ | Consolidação do PDF | Testes, prints & atualização do PDF |

## Estrutura

```
how7-backend-imobiliario/
├── db/
│   ├── schema.sql          — Integrante 1  (estrutura das tabelas)
│   ├── seed.sql             — Integrante 2  (massa de dados)
│   └── query_join.sql       — Integrante 2  (consulta com JOIN)
├── src/
│   ├── server.js             — Integrante 3  (bootstrap do Express)
│   ├── db/connection.js      — Integrante 3  (pool de conexão MySQL)
│   └── routes/
│       ├── vendasPorImovel.js — Integrante 3  (GET /api/soma-por-imovel)
│       ├── vendasPorMes.js    — Integrante 2  (GET /api/vendas-por-mes)
│       └── vendasPorTipo.js   — Integrante 1  (GET /api/vendas-por-tipo)
├── docs/
│   ├── openapi.yaml           — Integrante 4  (especificação da API)
│   ├── prints/                 — prints dos testes (Etapa 2)
│   └── entrega/                 — PDFs enviados em cada etapa
├── .env.example
└── .gitignore
```

Cada arquivo abre com um comentário listando o que precisa conter. O passo a passo detalhado
está nos cartões da sua lista no Trello.

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
5. Confirme que o seu ambiente está igual ao do resto do grupo:
   ```sql
   SELECT COUNT(*) FROM pagamento;
   ```
   Todo mundo deve ver o mesmo número.

O `package.json` e a instalação das dependências (`express`, `mysql2`, `dotenv`) fazem parte
da tarefa **Integração backend** — ele ainda não existe aqui de propósito.

## Regra de ouro

Filtros e agregações **não podem** usar `WHERE` nem `GROUP BY` no SQL. Os dados são
carregados por inteiro e todo o processamento acontece na linguagem de programação, com
`map` / `filter` / `reduce`.
