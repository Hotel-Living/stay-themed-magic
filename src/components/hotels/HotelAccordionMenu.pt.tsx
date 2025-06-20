
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelAccordionMenuPT() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1 - Os benefícios
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">100% de ocupação durante todo o ano</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    As taxas de ocupação podem atingir 100% durante todo o ano
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Zero quartos vazios significa lucro máximo
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Ocupação completa mesmo durante períodos tradicionalmente lentos
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Fluxo de receita constante sem baixas sazonais
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Menores custos operacionais</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Apenas um dia útil para todos os check-ins/check-outs. Zero lacunas entre estadas
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Taxas de rotatividade reduzidas significam menores custos de limpeza
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Estadas prolongadas (8, 16, 24 e 32 dias) reduzem despesas operacionais
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Processos simplificados de check-in/out economizam tempo da equipe
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Maior estabilidade da equipe</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Ocupação constante = emprego durante todo o ano
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Menor rotatividade de pessoal reduz custos de contratação e treinamento
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Maior satisfação dos funcionários com horários estáveis
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Receitas adicionais de atividades temáticas</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Novas fontes de receita através de eventos especializados
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Oportunidades de merchandising vinculadas aos temas do hotel
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Ofertas de serviços estendidos geram maior gasto
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2 – Comparamos sistemas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="grid md:grid-cols-2 gap-6 py-6">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-red-300 text-center">MODELO TRADICIONAL</h4>
                <div className="space-y-3">
                  <p className="text-sm text-red-200">• Check-ins e check-outs constantes</p>
                  <p className="text-sm text-red-200">• Mais limpeza, lavanderia e rotatividade</p>
                  <p className="text-sm text-red-200">• Maior carga de trabalho na recepção</p>
                  <p className="text-sm text-red-200">• Ocupação imprevisível</p>
                  <p className="text-sm text-red-200">• Lacunas entre reservas = Noites vazias = Receita perdida</p>
                  <p className="text-sm text-red-200">• Temporadas altas e baixas. Pessoal entra e sai</p>
                  <p className="text-sm text-red-200">• Pessoal desmotivado, não treinável, sem profissionalismo</p>
                  <p className="text-sm text-red-200">• Hóspedes vão e vêm. Sem conexão, sem fidelidade</p>
                  <p className="text-sm text-red-200">• Reservas frias, isoladas. Uma após a outra</p>
                  <p className="text-sm text-red-200">• Apartamentos de aluguel ganham com preços mais baixos</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-green-300 text-center">MODELO HOTEL LIVING</h4>
                <div className="space-y-3">
                  <p className="text-sm text-green-200">• Dias fixos de check-in/check-out = Operações mais fluidas</p>
                  <p className="text-sm text-green-200">• Menos limpeza, menos transições</p>
                  <p className="text-sm text-green-200">• Recepção mais eficiente e otimizada</p>
                  <p className="text-sm text-green-200">• Estadas mais longas = Maior ocupação</p>
                  <p className="text-sm text-green-200">• Zero noites vazias = Lucro máximo</p>
                  <p className="text-sm text-green-200">• Alta temporada o ano todo. Pessoal estável</p>
                  <p className="text-sm text-green-200">• Pessoal motivado, treinável, profissional</p>
                  <p className="text-sm text-green-200">• Hóspedes se sentem em casa e retornam</p>
                  <p className="text-sm text-green-200">• Não apenas reservas: comunidades</p>
                  <p className="text-sm text-green-200">• Elegância. Humanidade. Serviços. Hotéis vencem</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3 – Não apenas preenchemos quartos
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Pessoas agrupadas por afinidades
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Zero acaso. 100% conexões
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Hotéis para pertencer, não apenas para hospedar
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Estamos transformando a sociedade
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Continue with remaining accordion items following the same pattern */}
        
      </Accordion>
    </div>
  );
}
