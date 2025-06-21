
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function OnlineWorkerContentPT() {
  const questionGroups = [
    [
      "Quão confiável é a internet do hotel para trabalho remoto?",
      "Posso configurar um espaço de trabalho produtivo em quartos de hotel?",
      "E quanto à qualidade de videochamadas e níveis de ruído?",
      "Como lido com diferentes fusos horários enquanto vivo em hotéis?"
    ],
    [
      "Que equipamento devo trazer para trabalho remoto?",
      "Como mantenho o equilíbrio trabalho-vida em espaços pequenos?",
      "Posso imprimir documentos e lidar com necessidades de negócios?",
      "Que opções de internet de backup estão disponíveis?"
    ],
    [
      "Como lido com reuniões de clientes e chamadas profissionais?",
      "E quanto ao envio e recebimento de materiais de trabalho?",
      "Posso reivindicar deduções fiscais por espaço de trabalho em hotel?",
      "Como mantenho relacionamentos profissionais remotamente?"
    ],
    [
      "Que considerações de cibersegurança devo ter?",
      "Como protejo dados de trabalho sensíveis em redes de hotel?",
      "Posso usar centros de negócios de hotel efetivamente?",
      "E quanto ao acesso a VPNs da empresa e sistemas seguros?"
    ],
    [
      "Como lido com configurações de múltiplos monitores?",
      "Que soluções ergonômicas funcionam em quartos de hotel?",
      "Posso instalar software e aplicações necessárias?",
      "Como lido com licenças de software entre locações?"
    ],
    [
      "E quanto à colaboração com equipes distribuídas?",
      "Como participo na cultura da empresa remotamente?",
      "Posso participar de conferências e eventos de networking?",
      "Como lido com avaliações de desempenho e crescimento profissional?"
    ],
    [
      "Que planos de contingência devo ter para falhas técnicas?",
      "Como faço backup de dados importantes de trabalho regularmente?",
      "Que opções de hotspot móvel funcionam melhor?",
      "Como lido com quedas de energia e problemas de conectividade?"
    ]
  ];

  return (
    <div className="space-y-8 text-white">
      {questionGroups.map((questions, index) => (
        <QuestionGroup key={index} questions={questions} />
      ))}
    </div>
  );
}
