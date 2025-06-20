
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function HotelContentPT() {
  const questionGroups = [
    [
      "Como meu hotel pode se juntar à rede Hotel-Living?",
      "Quais são os requisitos para hotéis participantes?",
      "Como funciona o modelo de compartilhamento de receita?",
      "Que treinamento a equipe precisa para hóspedes de longa permanência?"
    ],
    [
      "Como lidamos com preços de estadia prolongada?",
      "Que comodidades devemos fornecer para hóspedes de hotel-living?",
      "Como gerenciamos inventário para reservas de longo prazo?",
      "Que protocolos de limpeza são necessários?"
    ],
    [
      "Como avaliamos potenciais hóspedes de longo prazo?",
      "Que contratos de locação são necessários?",
      "Como lidamos com reclamações e problemas de hóspedes?",
      "Que procedimentos de emergência devem estar em vigor?"
    ],
    [
      "Como fazemos marketing para o demográfico de hotel-living?",
      "Que parcerias podem ajudar a atrair hóspedes?",
      "Como otimizamos nossa presença online?",
      "Que estratégias promocionais funcionam melhor?"
    ],
    [
      "Como lidamos com processamento de pagamentos para estadias prolongadas?",
      "Que considerações de seguro existem?",
      "Como gerenciamos fluxo de caixa com reservas mais longas?",
      "Que implicações fiscais devemos estar cientes?"
    ],
    [
      "Como mantemos qualidade de serviço para hóspedes de longo prazo?",
      "Que ajustes de agendamento de equipe são necessários?",
      "Como lidamos com manutenção e reparos?",
      "Que comodidades de hóspedes requerem reabastecimento regular?"
    ],
    [
      "Como criamos comunidade entre hóspedes de hotel-living?",
      "Que espaços sociais e atividades devemos fornecer?",
      "Como lidamos com conflitos entre hóspedes?",
      "Que considerações de privacidade são importantes?"
    ],
    [
      "Como rastreamos e analisamos métricas de desempenho?",
      "Que ferramentas de relatório estão disponíveis?",
      "Como medimos satisfação do hóspede?",
      "Que indicadores-chave de desempenho importam mais?"
    ],
    [
      "Como lidamos com flutuações sazonais de demanda?",
      "Que estratégias ajudam a manter ocupação durante todo o ano?",
      "Como precificamos competitivamente em diferentes mercados?",
      "Que fatores de localização afetam o sucesso?"
    ],
    [
      "Que integrações tecnológicas são necessárias?",
      "Como gerenciamos sistemas de reserva eficientemente?",
      "Que aplicativos móveis ou plataformas devemos usar?",
      "Como garantimos segurança e privacidade de dados?"
    ],
    [
      "Como lidamos com hóspedes internacionais e regulamentações?",
      "Que requisitos de visto e legais se aplicam?",
      "Como gerenciamos questões de câmbio de moeda?",
      "Que considerações culturais são importantes?"
    ],
    [
      "Como escalamos nossas operações de hotel-living?",
      "Que oportunidades de expansão existem?",
      "Como replicamos sucesso através de propriedades?",
      "Que requisitos de investimento devemos planejar?"
    ],
    [
      "Como garantimos retenção e fidelidade do hóspede?",
      "Que programas de recompensas funcionam para estadias prolongadas?",
      "Como lidamos com indicações e avaliações de hóspedes?",
      "Que estratégias de comunicação constroem relacionamentos?"
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
