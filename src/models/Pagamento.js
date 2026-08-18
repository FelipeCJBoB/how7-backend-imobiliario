// Classe de model Pagamento — tarefa "Classes de model e controle (POO)" (Integrante 4, Etapa 1).
// Passo a passo completo: cartões [E1] da sua lista no Trello.
//
// Representa a entidade pagamento do banco, junto do imóvel a que se refere.
//
// O que esta classe precisa ter:
//   1. Um constructor que receba id, data, valor e o imóvel (uma instância de Imovel)
//   2. ATENÇÃO: o mysql2 devolve DECIMAL como texto. Converta o valor com Number()
//      dentro do constructor — senão as somas da Etapa 2 vão concatenar em vez de somar.
//   3. Um método que devolva o mês/ano do pagamento no formato "MM/AAAA"
//   4. Um método estático que transforme uma linha da consulta com JOIN
//      em um objeto Pagamento já montado (o mapeamento pedido no plano de ensino)
//   5. Exportação da classe com module.exports
