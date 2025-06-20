
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function CommuterContentPT() {
  const questionGroups = [
    [
      "Como o hotel-living pode beneficiar meu deslocamento diário?",
      "Quais são as economias de custos comparadas à habitação tradicional?",
      "Posso ficar em hotéis perto do meu local de trabalho?",
      "Quão flexíveis são os arranjos de reserva?"
    ],
    [
      "Que comodidades estão tipicamente incluídas?",
      "Como funciona o hotel-living para viajantes de negócios?",
      "Posso obter tarifas corporativas para estadias prolongadas?",
      "E quanto ao estacionamento e transporte?"
    ],
    [
      "Como lido com correspondência e pacotes?",
      "E quanto aos serviços de lavanderia e limpeza?",
      "Posso trabalhar do meu quarto de hotel?",
      "Quão estável é o wifi para trabalho remoto?"
    ],
    [
      "O que acontece durante as temporadas altas de viagem?",
      "Posso reservar múltiplas localizações para diferentes projetos?",
      "Como funciona a cobrança para estadias prolongadas?",
      "Que programas de fidelidade estão disponíveis?"
    ],
    [
      "Como mantenho o equilíbrio trabalho-vida?",
      "E quanto às instalações de academia e fitness?",
      "Posso realizar reuniões de negócios no hotel?",
      "Como me relaciono com outros profissionais do hotel-living?"
    ],
    [
      "Quais são as implicações fiscais?",
      "Como estabeleço residência para fins legais?",
      "Posso usar hotel-living para tarefas temporárias?",
      "Que documentação preciso para relatórios de despesas?"
    ],
    [
      "Como lido com emergências enquanto vivo em hotéis?",
      "E quanto aos cuidados de saúde e seguro?",
      "Posso trazer convidados para meu quarto de hotel?",
      "Como mantenho relacionamentos profissionais?"
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
