
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function WhyHotelLivingSectionPT() {
  const accordionOptions = [
    {
      value: "retired",
      label: "Aposentado?",
      content: (
        <div className="space-y-4">
          <p>Está cansado de pagar aluguel ou hipoteca por uma casa que mal usa? Viver em hotéis oferece a solução perfeita para aposentados que querem maximizar seus anos dourados.</p>
          <p><strong>Benefícios para aposentados:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sem responsabilidades de manutenção - foque em aproveitar a vida</li>
            <li>Oportunidades sociais e atividades incorporadas</li>
            <li>Serviços profissionais de limpeza e refeições</li>
            <li>Localizações privilegiadas perto de atrações culturais e cuidados de saúde</li>
            <li>Arranjos flexíveis - viaje quando quiser</li>
          </ul>
        </div>
      )
    },
    {
      value: "online-worker",
      label: "Trabalhador Online?",
      content: (
        <div className="space-y-4">
          <p>Transforme sua rotina de trabalho em casa em uma aventura de trabalho de qualquer lugar. Viver em hotéis fornece a infraestrutura perfeita para profissionais digitais.</p>
          <p><strong>Perfeito para trabalhadores remotos:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internet de alta velocidade confiável e espaços de trabalho dedicados</li>
            <li>Ambiente profissional longe das distrações de casa</li>
            <li>Oportunidades de networking com outros profissionais</li>
            <li>Todos os utilitários e serviços incluídos em um preço</li>
            <li>Vantagens fiscais para acomodação de negócios</li>
          </ul>
        </div>
      )
    },
    {
      value: "commuter",
      label: "Longe do trabalho?",
      content: (
        <div className="space-y-4">
          <p>Pule o estresse do deslocamento diário e viva onde trabalha. Viver em hotéis perto do seu local de trabalho pode revolucionar seu equilíbrio trabalho-vida.</p>
          <p><strong>Vantagens para viajantes:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Eliminar tempo e custos de viagem diária</li>
            <li>Reduzir estresse e melhorar desempenho no trabalho</li>
            <li>Mais tempo para atividades pessoais e relacionamentos</li>
            <li>Serviços profissionais como lavanderia e refeições tratados</li>
            <li>Arranjos flexíveis para diferentes horários de trabalho</li>
          </ul>
        </div>
      )
    },
    {
      value: "free-soul",
      label: "Alma Livre?",
      content: (
        <div className="space-y-4">
          <p>Liberte-se das limitações da habitação tradicional. Viver em hotéis oferece a máxima liberdade para aqueles que se recusam a ser amarrados.</p>
          <p><strong>Benefícios de liberdade:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sem compromissos de longo prazo ou contratos vinculativos</li>
            <li>Explorar diferentes bairros e cidades facilmente</li>
            <li>Posses mínimas, experiências máximas</li>
            <li>Conhecer pessoas diversas de todo o mundo</li>
            <li>Viver espontaneamente sem responsabilidades de propriedade</li>
          </ul>
        </div>
      )
    },
    {
      value: "hotel",
      label: "Hotel?",
      content: (
        <div className="space-y-4">
          <p>Procurando revolucionar seu modelo de negócio hoteleiro? Faça parceria conosco para transformar quartos vazios em fluxos de receita consistentes.</p>
          <p><strong>Benefícios para hotéis:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ocupação garantida e renda estável</li>
            <li>Custos reduzidos de marketing e reservas</li>
            <li>Triagem e gestão profissional de hóspedes</li>
            <li>Manter operações hoteleiras enquanto maximiza receita</li>
            <li>Junte-se a uma rede crescente de propriedades inovadoras</li>
          </ul>
        </div>
      )
    },
    {
      value: "society",
      label: "Sociedade?",
      content: (
        <div className="space-y-4">
          <p>Viver em hotéis representa uma solução sustentável para desafios habitacionais, promovendo uso eficiente de recursos e construção de comunidade.</p>
          <p><strong>Benefícios sociais:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Redução da expansão urbana e impacto ambiental</li>
            <li>Uso eficiente da infraestrutura existente</li>
            <li>Conexões comunitárias aprimoradas e interação social</li>
            <li>Benefícios econômicos para negócios locais e turismo</li>
            <li>Solução inovadora para crise de acessibilidade habitacional</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#5A1876] via-[#6B1E88] to-[#7C2A9A] py-12 mb-8 rounded-2xl">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#FEF7CD]">
          Por que Viver em Hotéis?
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {accordionOptions.map((option) => (
            <AccordionItem 
              key={option.value} 
              value={option.value}
              className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 group"
            >
              <AccordionTrigger 
                className="px-6 py-4 text-[#FEF7CD] hover:text-white group-hover:bg-white/5 rounded-lg transition-all duration-200"
                titleClassName="text-lg font-semibold"
              >
                {option.label}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-[#E5D5F0]">
                {option.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
