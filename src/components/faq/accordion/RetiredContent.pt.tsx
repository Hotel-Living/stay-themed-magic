
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function RetiredContentPT() {
  const questionGroups = [
    [
      "Como o hotel-living pode beneficiar aposentados com renda fixa?",
      "Quais são as vantagens sociais do hotel-living para aposentados?",
      "Como mantenho a cobertura de saúde enquanto vivo em hotéis?",
      "Posso obter descontos para idosos em estadias prolongadas?"
    ],
    [
      "E quanto às considerações do Medicare e seguros?",
      "Como lido com medicamentos prescritos enquanto viajo?",
      "Posso manter relacionamentos com meus médicos atuais?",
      "Que serviços médicos de emergência estão disponíveis?"
    ],
    [
      "Como me mantenho conectado com família e netos?",
      "Que atividades sociais estão disponíveis para idosos?",
      "Posso encontrar comunidades apropriadas para minha idade em hotéis?",
      "Como combato a solidão e isolamento?"
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
