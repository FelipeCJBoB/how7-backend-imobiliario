// Controle do Endpoint B — tarefa "Endpoint B" (Integrante 2, Etapa 2).
// Passo a passo completo: cartões [E2] da sua lista no Trello.
//
// Classe de controle que calcula o total de vendas por mês/ano.
//
// O que esta classe precisa fazer:
//   1. Buscar os pagamentos usando a conexão de src/db/connection.js
//   2. Transformar as linhas em objetos Pagamento (classes de src/models/)
//   3. Agrupar por "MM/AAAA" e somar o valor usando reduce — sem WHERE e sem GROUP BY no SQL
//   4. Devolver uma lista com o mês/ano e o total de cada período
//
// Usa POO (as classes de model) para representar os dados e programação
// funcional (reduce) para processá-los — os dois paradigmas do enunciado.
