
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function StillRentingContentPT() {
  const questionGroups = [
    [
      "Quanto posso economizar mudando do aluguel para o hotel-living?",
      "Quais são os custos ocultos do aluguel tradicional?",
      "Como as tarifas de hotel se comparam aos pagamentos mensais de aluguel?",
      "Posso quebrar meu contrato de locação para começar o hotel-living?"
    ],
    [
      "E quanto aos custos de utilidades e internet?",
      "Como lido com meu depósito de segurança e obrigações de locação?",
      "O que acontece com meus móveis e pertences?",
      "Posso experimentar o hotel-living por um mês antes de me comprometer?"
    ],
    [
      "Como explico o hotel-living para amigos e família?",
      "E quanto à entrega de correspondência e endereço permanente?",
      "Como lido com as implicações fiscais e residência?",
      "Posso manter o mesmo estilo de vida e rotinas?",
      "E quanto às mudanças de estacionamento e transporte?"
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
