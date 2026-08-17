# HOW VII — Backend Imobiliário

Serviços web (REST) para consulta de transações imobiliárias, desenvolvidos para a disciplina
**Hands On Work VII (29049)** — Análise e Desenvolvimento de Sistemas, UNIVALI, 2026/2.

Backend puro: acessa o banco relacional, carrega os dados na íntegra e processa tudo em
memória com `map` / `filter` / `reduce` — nada de `WHERE` ou `GROUP BY` no SQL. O frontend
(gráficos) não faz parte do escopo deste repositório.

- **Plano de projeto** (cronograma, divisão de tarefas, guia passo a passo): ver link fixado no quadro Trello
- **Quadro Trello**: https://trello.com/b/xm1BF9Rm/how-vii-backend-imobili%C3%A1rio

## Equipe

Cada aluno escolhe qual **número de Integrante** quer ser e assume as duas tarefas daquele
número — uma na Etapa 1 e outra na Etapa 2. Preencham o nome e o usuário GitHub num Pull Request.

| Integrante | Nome | Usuário GitHub | Etapa 1 | Etapa 2 |
|---|---|---|---|---|
| 1 | _a preencher_ | _a preencher_ | Banco de Dados | Endpoint B — total por mês/ano |
| 2 | _a preencher_ | _a preencher_ | Consulta SQL | Endpoint C — percentual por tipo |
| 3 | _a preencher_ | _a preencher_ | Integração backend | Testes & atualização do PDF |
| 4 | _a preencher_ | _a preencher_ | Especificação OpenAPI | Vídeo de apresentação |
| 5 | _a preencher_ | _a preencher_ | Consolidação do PDF | Endpoint A — soma por imóvel |

## Estrutura

```
how7-backend-imobiliario/
├── db/
│   ├── schema.sql        — DDL das tabelas (tarefa "Banco de Dados")
│   ├── seed.sql           — massa de dados (tarefa "Banco de Dados")
│   └── query_join.sql     — consulta com JOIN (tarefa "Consulta SQL")
├── src/
│   ├── server.js           — bootstrap do Express (pronto para uso)
│   ├── db/connection.js    — pool de conexão mysql2 (pronto para uso)
│   └── routes/              — 1 arquivo por endpoint (tarefa de cada Endpoint A/B/C)
├── docs/
│   ├── openapi.yaml         — especificação OpenAPI (tarefa "Especificação OpenAPI")
│   ├── prints/               — prints das respostas REST (tarefa "Testes & PDF")
│   └── entrega/               — PDFs enviados em cada etapa
├── .env.example
└── README.md
```

Cada arquivo com um comentário `TODO` corresponde a uma tarefa do quadro Trello — o
passo a passo detalhado de como preenchê-lo está no checklist do cartão correspondente e no
Plano de Projeto.

## Como rodar localmente

1. Instale o [Node.js](https://nodejs.org) (versão 20 ou superior) e o [MySQL](https://dev.mysql.com/downloads/) na sua máquina.
2. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/FelipeCJBoB/how7-backend-imobiliario.git
   cd how7-backend-imobiliario
   npm install
   ```
3. Copie `.env.example` para `.env` e preencha com as credenciais do seu MySQL local:
   ```bash
   cp .env.example .env
   ```
4. Crie o banco e rode os scripts, na ordem, no MySQL Workbench (ou `mysql < arquivo.sql`):
   `db/schema.sql` → `db/seed.sql`.
5. Confirme que o ambiente está sincronizado com o resto do grupo:
   ```sql
   SELECT COUNT(*) FROM pagamento; -- todo mundo deve ver o mesmo número
   ```
6. Rode o servidor:
   ```bash
   npm start
   ```

## Regra de ouro

Filtros e agregações **não podem** usar `WHERE` nem `GROUP BY` no SQL. Os dados são
carregados por inteiro (`SELECT *` na consulta com JOIN) e todo o processamento acontece na
linguagem de programação, com `map` / `filter` / `reduce`.
