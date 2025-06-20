
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function FreeSoulContentPT() {
  const questionGroups = [
    [
      "Como o hotel-living apoia um estilo de vida nômade?",
      "Que localizações estão disponíveis mundialmente?",
      "Posso reservar viagens espontâneas e estadias prolongadas?",
      "Como gerencio meus pertences enquanto viajo?"
    ],
    [
      "Quais são as considerações legais e de visto?",
      "Como lido com bancos e finanças internacionalmente?",
      "Posso manter minha carreira profissional sendo nômade?",
      "E quanto à cobertura de saúde no exterior?"
    ],
    [
      "Como construo comunidade sendo nômade digital?",
      "Que oportunidades de networking estão disponíveis?",
      "Posso me conectar com outros nômades do hotel-living?",
      "Como combato o isolamento e a solidão?"
    ],
    [
      "Que requisitos tecnológicos preciso?",
      "Quão confiável é a conectividade com a internet?",
      "Posso configurar um espaço de trabalho produtivo?",
      "E quanto ao gerenciamento de fuso horário para trabalho?"
    ],
    [
      "Como lido com variações sazonais de preços?",
      "Que recompensas de fidelidade posso ganhar?",
      "Há descontos em grupo para comunidades nômades?",
      "Como faço orçamento para hotel-living a longo prazo?"
    ],
    [
      "E quanto às barreiras linguísticas em diferentes países?",
      "Como me adapto a diferentes normas culturais?",
      "Posso obter recomendações e orientação local?",
      "Que considerações de segurança devo ter em mente?"
    ],
    [
      "Como mantenho relacionamentos pessoais?",
      "E quanto a encontros e conexões românticas?",
      "Posso trazer convidados ou companheiros de viagem?",
      "Como lido com visitas familiares e obrigações?"
    ],
    [
      "Quais são os impactos ambientais do hotel-living?",
      "Como posso viajar de forma mais sustentável?",
      "Há opções de hotéis ecológicos?",
      "Que programas de compensação de carbono estão disponíveis?"
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
