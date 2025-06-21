
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function SocietyContentPT() {
  const questionGroups = [
    [
      "Como o hotel-living impacta as comunidades locais?",
      "Quais são os benefícios econômicos para cidades e regiões?",
      "Como isso afeta os mercados imobiliários tradicionais?",
      "Que impactos ambientais o hotel-living tem?"
    ],
    [
      "Como os hotéis se adaptam a residentes de longo prazo?",
      "Que mudanças são necessárias nas regulamentações de hospitalidade?",
      "Como isso cria novas oportunidades de emprego?",
      "Que melhorias de infraestrutura são necessárias?"
    ],
    [
      "Como o hotel-living muda o desenvolvimento urbano?",
      "Quais são as implicações fiscais para municípios?",
      "Como isso afeta os sistemas de transporte público?",
      "Que novos serviços emergem do hotel-living?"
    ],
    [
      "Como as comunidades integram residentes de hotel-living?",
      "Quais são as implicações sociais deste estilo de vida?",
      "Como isso afeta bairros tradicionais?",
      "Que novos modelos de negócio emergem?"
    ],
    [
      "Como o hotel-living impacta sistemas de saúde?",
      "Que mudanças são necessárias nos sistemas educacionais?",
      "Como isso afeta votação e participação cívica?",
      "Que estruturas legais precisam de atualização?"
    ],
    [
      "Como isso muda as indústrias de varejo e serviços?",
      "Que impacto tem nos sistemas alimentares locais?",
      "Como os serviços de emergência se adaptam?",
      "Que novos modelos de seguro são necessários?"
    ],
    [
      "Como o hotel-living afeta a preservação cultural?",
      "Que impacto tem nas tradições locais?",
      "Como as comunidades religiosas se adaptam?",
      "Que mudanças ocorrem em organizações comunitárias?"
    ],
    [
      "Como isso afeta relacionamentos intergeracionais?",
      "Que impacto tem nas estruturas familiares?",
      "Como os sistemas educacionais precisam evoluir?",
      "Que novos sistemas de apoio social emergem?"
    ],
    [
      "Como o hotel-living muda o planejamento de aposentadoria?",
      "Que impacto tem na acumulação de riqueza?",
      "Como os padrões de herança mudam?",
      "Que novos produtos financeiros são necessários?"
    ],
    [
      "Como isso afeta padrões de migração global?",
      "Que impacto tem nas relações internacionais?",
      "Como as políticas de visto e imigração precisam ser atualizadas?",
      "Que novas considerações diplomáticas surgem?"
    ],
    [
      "Como o hotel-living muda o equilíbrio trabalho-vida?",
      "Que impacto tem na produtividade?",
      "Como as empresas se adaptam a equipes distribuídas?",
      "Que novas abordagens de gestão são necessárias?"
    ],
    [
      "Como isso afeta a infraestrutura tecnológica?",
      "Que impacto tem na privacidade de dados?",
      "Como as necessidades de cibersegurança mudam?",
      "Que novos serviços digitais emergem?"
    ],
    [
      "Como o hotel-living muda padrões de viagem?",
      "Que impacto tem nas indústrias do turismo?",
      "Como os sistemas de transporte se adaptam?",
      "Que novas soluções de mobilidade são necessárias?"
    ],
    [
      "Como isso afeta a sustentabilidade ambiental?",
      "Que impacto tem no consumo de recursos?",
      "Como os sistemas de gestão de resíduos mudam?",
      "Que novas tecnologias verdes são necessárias?"
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
