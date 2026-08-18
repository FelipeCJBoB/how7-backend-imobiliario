// Controle do Endpoint A — tarefa "Endpoint A" (Integrante 1, Etapa 2).
// Passo a passo completo: cartões [E2] da sua lista no Trello.
//
// Classe de controle que calcula o total pago por imóvel.
//
// O que esta classe precisa fazer:
//   1. Buscar os pagamentos usando a conexão de src/db/connection.js
//   2. Transformar as linhas em objetos Pagamento (classes de src/models/)
//   3. Somar o valor por imóvel usando reduce — sem WHERE e sem GROUP BY no SQL
//   4. Devolver uma lista com id, descrição e total de cada imóvel
//
// Usa POO (as classes de model) para representar os dados e programação
// funcional (reduce) para processá-los — os dois paradigmas do enunciado.
