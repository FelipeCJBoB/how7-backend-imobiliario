# HOW VII — Backend Imobiliário

Serviços web (REST) para consulta de transações imobiliárias, desenvolvidos para a disciplina
**Hands On Work VII (29049)** — Análise e Desenvolvimento de Sistemas, UNIVALI, 2026/2.

O enunciado exige **os dois paradigmas**: orientação a objetos (classes de model e de controle,
modeladas em UML) e programação funcional (`map` / `filter` / `reduce` no processamento).
Filtros e agregações **não podem** usar `WHERE` nem `GROUP BY` no SQL — os dados são carregados
por inteiro e todo o processamento acontece na linguagem de programação.

O frontend (gráficos) não faz parte do escopo deste repositório.

> **Este repositório é um esqueleto.** Todos os arquivos já existem, mas estão **vazios** —
> contêm apenas comentários dizendo o que precisa ser feito e quem é o responsável.
> Todo o código é escrito por vocês.

- **Quadro Trello**: https://trello.com/b/xm1BF9Rm/how-vii-backend-imobiliario

## Equipe

Cada aluno escolhe qual **número de Integrante** quer ser e assume as duas tarefas daquele
número — uma na Etapa 1 e outra na Etapa 2. Todos escrevem JavaScript em pelo menos uma delas.

| # | Nome | GitHub | Etapa 1 | Etapa 2 |
|---|---|---|---|---|
| 1 | _a preencher_ | _a preencher_ | Banco de dados (`schema.sql` + `seed.sql`) | Endpoint A — soma por imóvel |
| 2 | _a preencher_ | _a preencher_ | Consulta SQL (`query_join.sql`) + OpenAPI | Endpoint B — total por mês/ano |
| 3 | _a preencher_ | _a preencher_ | Conexão e código do item (e) | Testes, prints e atualização do PDF |
| 4 | _a preencher_ | _a preencher_ | Classes de model e controle (POO) + UML | Vídeo de apresentação |
| 5 | _a preencher_ | _a preencher_ | Consolidação do PDF da Etapa 1 | Endpoint C — percentual por tipo |

## Arquitetura

```
Rota (Express)  →  Controller (classe)  →  Model (classes)  →  Conexão (mysql2)
   HTTP              map/filter/reduce       representa as        SELECT sem
                     = paradigma funcional   entidades = POO      WHERE/GROUP BY
```

A rota só recebe a requisição e devolve JSON. O cálculo fica no controller, que usa as
classes de model para representar os dados. É essa separação que entrega o requisito de
orientação a objetos do enunciado.

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
│   │   └── Pagamento.js
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
│   ├── uml/                      — Integrante 4  (diagrama de classes)
│   ├── prints/                    — prints dos testes (Etapa 2)
│   └── entrega/                    — PDFs enviados em cada etapa
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
da tarefa **Conexão e código do item (e)** — ele ainda não existe aqui de propósito.

## Ponto em aberto com o professor

O item (c) da Parte 2 pede *"valor percentual no total de vendas **(quantitativas)**"*, mas a
descrição do gráfico de pizza fala em *"percentual do **valor total** das vendas"*. São
resultados diferentes: percentual por soma de valores ou por contagem de vendas. Confirmem
antes de implementar o Endpoint C.
