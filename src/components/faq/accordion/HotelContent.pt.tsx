
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function HotelContentPT() {
  const questionGroups = [
    [
      "Por que limitar sua receita a estadias curtas tradicionais quando hóspedes de longa permanência oferecem estabilidade?",
      "Por que lidar com rotatividade constante quando hóspedes Hotel-Living se tornam residentes leais de longo prazo?",
      "Por que depender do turismo sazonal quando você pode ter ocupação durante todo o ano?",
      "Por que competir apenas por viajantes de férias quando você pode capturar o crescente mercado de nômades digitais?"
    ],
    [
      "Por que deixar quartos vazios durante baixa temporada quando Hotel-Living os preenche consistentemente?",
      "Por que se estressar com limpeza diária quando hóspedes de longa permanência requerem serviço menos frequente?",
      "Por que lidar com check-ins e check-outs constantes quando você pode ter hóspedes estáveis e estabelecidos?",
      "Por que perder a oportunidade de fazer parte do futuro da hospitalidade?"
    ],
    [
      "Por que operar com altos custos operacionais quando estadias de longa permanência são mais lucrativas?",
      "Por que limitar o potencial do seu hotel quando Hotel-Living pode transformar seu modelo de negócio?",
      "Por que competir no mercado saturado de curta permanência quando você pode pioneirar a revolução da longa permanência?",
      "Por que assistir outros hotéis lutarem quando você pode liderar o caminho na inovação da hospitalidade?"
    ],
    [
      "Por que se contentar em ser apenas mais um hotel quando você pode se tornar um destino de estilo de vida?",
      "Por que perder a chance de construir relacionamentos duradouros com hóspedes que se tornam membros da comunidade?",
      "Por que permanecer preso no modelo antigo de hospitalidade quando Hotel-Living representa o futuro?",
      "Por que esperar pela mudança quando você pode ser a mudança que transforma a indústria?"
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
