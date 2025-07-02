import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// NOTA: O esquema de cores e formatação de duas linhas são mantidos conforme especificação anterior.
const TAB_BG = "bg-[#3C1865]";
const ACTIVE_TAB_BG = "bg-[#3C1865]";
const ACTIVE_TEXT = "text-white";

export const ModelRatesTabs: React.FC = () => {
  // Mover o estado da aba para este componente para que a refatoração não quebre o layout ou lógica.
  const [modelTab, setModelTab] = useState<string>("read-this"); // padrão

  const tabs = [{
    value: "read-this",
    label: <span dangerouslySetInnerHTML={{ __html: "POR FAVOR<br />LEIA ISTO" }} />
  }, {
    value: "3star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTÉIS<br />3 ESTRELAS" }} />
  }, {
    value: "4star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTÉIS<br />4 ESTRELAS" }} />
  }, {
    value: "5star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTÉIS<br />5 ESTRELAS" }} />
  }, {
    value: "download",
    label: <span dangerouslySetInnerHTML={{ __html: "BAIXAR<br />CALCULADORA" }} />
  }];

  return <Tabs value={modelTab} onValueChange={setModelTab} className="w-full">
      <TabsList className="flex w-full mb-6 gap-1 rounded-xl shadow-lg bg-transparent">
        {tabs.map(tab => <TabsTrigger key={tab.value} value={tab.value} className={`
              flex-1 font-bold text-xs md:text-base uppercase tracking-tight font-sans whitespace-pre-line text-center rounded-none px-1 md:px-4 py-4 transition-all font-condensed
              leading-snug
              ${modelTab === tab.value ? `${ACTIVE_TAB_BG} ${ACTIVE_TEXT}` : `bg-transparent text-white data-[state=active]:${ACTIVE_TAB_BG} data-[state=active]:${ACTIVE_TEXT}`}
            `} style={{
        fontStretch: "condensed",
        whiteSpace: "pre-line",
        minHeight: "52px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 1.15
      }}>
            <span style={{
          display: "block",
          whiteSpace: "pre-line",
          lineHeight: "1.13",
          fontSize: "inherit"
        }}>{tab.label}</span>
          </TabsTrigger>)}
      </TabsList>
      {/* Conteúdo da aba POR FAVOR LEIA ISTO */}
      <TabsContent value="read-this" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg" style={{
        background: "none",
        color: "#fff"
      }}>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              1️⃣ O que é o modelo Hotel-Living e por que é mais rentável que o turismo tradicional?
            </div>
            <div className="text-white/80 text-[15px]">
              Hotel-Living redefine a ocupação hoteleira direcionando-se a hóspedes que ficam entre 8-32 dias em vez de 1-3 noites. Esta abordagem aumenta a retenção de hóspedes, reduz custos de aquisição e minimiza a complexidade operacional da rotatividade constante.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              2️⃣ Quais são as principais vantagens competitivas sobre hotéis tradicionais?
            </div>
            <div className="text-white/80 text-[15px]">
              Estadias estendidas reduzem custos de marketing, diminuem frequências de limpeza, aumentam a receita por quarto disponível (RevPAR) e proporcionam fluxo de caixa previsível. Os hóspedes desenvolvem lealdade ao local e são mais propensos a retornar.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              3️⃣ Como a especialização temática melhora as reservas?
            </div>
            <div className="text-white/80 text-[15px]">
              Ao oferecer experiências alinhadas com os interesses dos hóspedes (culinárias, bem-estar, trabalho remoto, artes, etc.), hotéis atraem hóspedes motivados dispostos a pagar tarifas premium por estadias mais longas que combinem com seu estilo de vida ou objetivos.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              4️⃣ Qual é a estratégia de preços recomendada para Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Implementar descontos progressivos: cobrar tarifas padrão para estadias de 8 dias, descontos moderados para estadias de 16 dias e descontos atrativos para estadias de 32 dias. Isso encoraja compromissos mais longos mantendo a rentabilidade.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              5️⃣ Como calcular tarifas ótimas de quarto para diferentes durações?
            </div>
            <div className="text-white/80 text-[15px]">
              Use as calculadoras estratégicas nas abas seguintes. Cada categoria de hotel (3, 4, 5 estrelas) tem recomendações específicas para equilibrar preços competitivos com máxima rentabilidade baseada em custos operacionais e demografia alvo.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              6️⃣ Quais segmentos de hóspedes são mais rentáveis para Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Trabalhadores remotos, nômades digitais, viajantes de negócios em projetos estendidos, profissionais em realocação e hóspedes motivados por temas (entusiastas culinários, buscadores de bem-estar, etc.) representam os segmentos de maior valor.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              7️⃣ Como implementar este modelo sem interromper operações existentes?
            </div>
            <div className="text-white/80 text-[15px]">
              Comece dedicando 20-30% dos quartos a pacotes Hotel-Living enquanto mantém reservas tradicionais. Aumente gradualmente a alocação baseada na análise de demanda e rentabilidade.
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              8️⃣ Quais são as métricas-chave para monitorar o sucesso?
            </div>
            <div className="text-white/80 text-[15px]">
              Acompanhe a duração média de estadia (ALOS), receita por quarto disponível (RevPAR), custo de aquisição de cliente (CAC), porcentagem de hóspedes repetidos e pontuações de satisfação do hóspede para estadias estendidas vs. reservas tradicionais.
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conteúdo da aba HOTÉIS 3 ESTRELAS */}
      <TabsContent value="3star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Dicas Estratégicas para Hotéis 3 Estrelas</span>
            <span className="block mb-4">
              Hotéis de 3 estrelas têm a maior oportunidade de se diferenciarem através da especialização temática e construção de comunidade em torno dos interesses dos hóspedes.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ FOQUE EM EXPERIÊNCIAS TEMÁTICAS AUTÊNTICAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hotéis de 3 estrelas têm sucesso oferecendo experiências genuínas e imersivas em vez de comodidades de luxo:
              <ul className="list-disc pl-6 mt-2">
                <li>Workshops culinários com chefs locais</li>
                <li>Programas de bem-estar com instrutores qualificados</li>
                <li>Imersão linguística com falantes nativos</li>
                <li>Workshops de artesanato</li>
                <li>Seminários de desenvolvimento profissional</li>
              </ul>
              <div className="mt-2">
                Foque em experiências que criem valor duradouro e justifiquem estadias mais longas através de aprendizado e crescimento pessoal.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ CONSTRUA COMUNIDADE ENTRE HÓSPEDES COM INTERESSES COMPARTILHADOS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Crie espaços sociais e programas que conectem hóspedes em torno de temas comuns:
              <ul className="list-disc pl-6 mt-2">
                <li>Atividades em grupo diárias relacionadas ao tema do hotel</li>
                <li>Espaços de trabalho compartilhados para trabalhadores remotos e nômades digitais</li>
                <li>Horas sociais vespertinas com conversas baseadas em temas</li>
                <li>Projetos colaborativos entre hóspedes e compartilhamento de habilidades</li>
                <li>Eventos de integração com a comunidade local</li>
              </ul>
              <div className="mt-2">
                Quando hóspedes formam conexões, ficam mais tempo e retornam com maior frequência, aumentando o valor vitalício.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ OTIMIZE PREÇOS PARA ESTADIAS MAIS LONGAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Implemente preços progressivos que recompensem o compromisso:
              <ul className="list-disc pl-6 mt-2">
                <li>Estadias de 8 dias: Tarifa completa ou desconto mínimo (5-10%)</li>
                <li>Estadias de 16 dias: Desconto moderado (15-20%)</li>
                <li>Estadias de 32 dias: Desconto atrativo (25-30%)</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ REDUZA CUSTOS OPERACIONAIS ATRAVÉS DE ESTADIAS ESTENDIDAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Estadias mais longas naturalmente reduzem despesas operacionais principais:
              <ul className="list-disc pl-6 mt-2">
                <li>Frequência de limpeza: a cada 3-4 dias em vez de diariamente</li>
                <li>Menores custos de lavanderia e suprimentos por hóspede-noite</li>
                <li>Reduzido processamento de recepção e check-in/out</li>
                <li>Diminuídos custos de marketing e comissões de reserva</li>
              </ul>
              <div className="mt-2">
                Essas economias podem ser reinvestidas em melhorar experiências temáticas e satisfação do hóspede.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ APROVEITE PARCERIAS LOCAIS PARA EXPERIÊNCIAS AUTÊNTICAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Parcerie com negócios locais para melhorar ofertas temáticas:
              <ul className="list-disc pl-6 mt-2">
                <li>Restaurantes locais para experiências culinárias autênticas</li>
                <li>Workshops artesanais e centros culturais</li>
                <li>Estúdios de fitness e profissionais de bem-estar</li>
                <li>Instituições educacionais para programas de idiomas e habilidades</li>
                <li>Redes profissionais para eventos de desenvolvimento empresarial</li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conteúdo da aba HOTÉIS 4 ESTRELAS */}
      <TabsContent value="4star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Dicas Estratégicas para Hotéis 4 Estrelas</span>
            <span className="block mb-4">
              Hotéis de 4 estrelas podem equilibrar conforto premium com experiências temáticas acessíveis para atrair hóspedes afluentes buscando estadias estendidas.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ COMBINE CONFORTO COM ESTADIAS PROPOSITAIS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hóspedes de 4 estrelas esperam acomodações de qualidade além de experiências significativas:
              <ul className="list-disc pl-6 mt-2">
                <li>Configurações premium de espaço de trabalho para viajantes de negócios</li>
                <li>Instalações de bem-estar e fitness de alta qualidade</li>
                <li>Programas culinários sofisticados com chefs renomados</li>
                <li>Imersão cultural com guias e educadores especialistas</li>
                <li>Desenvolvimento profissional com líderes da indústria</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ DIRECIONE PROFISSIONAIS AFLUENTES E BUSCADORES DE ESTILO DE VIDA</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Foque marketing em hóspedes que valorizam tanto conforto quanto desenvolvimento pessoal:
              <ul className="list-disc pl-6 mt-2">
                <li>Executivos de negócios em projetos estendidos</li>
                <li>Entusiastas de bem-estar buscando experiências transformadoras</li>
                <li>Profissionais criativos em sabáticos ou retiros</li>
                <li>Aposentados afluentes explorando novos destinos e interesses</li>
                <li>Empreendedores participando de programas intensivos ou masterclasses</li>
              </ul>
              <div className="mt-2">
                Esses hóspedes estão dispostos a pagar tarifas premium por estadias que combinem luxo com crescimento pessoal ou profissional.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ FOQUE EM "LUXO INTELIGENTE" EM VEZ DE EXTRAVAGÂNCIA</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hóspedes de 4 estrelas buscam luxo de maneiras inteligentes e acessíveis:
              <ul className="list-disc pl-6 mt-2">
                <li>Projete espaços reflexivos sem excessos exagerados.</li>
                <li>Ofereça upgrades que adicionem conforto genuíno (camas de alta qualidade, isolamento acústico, cortinas blackout, tecnologia melhorada, etc.).</li>
                <li>Toques ecológicos, centrados no hóspede e focados em bem-estar serão valorizados.</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ IMPLEMENTE PREÇOS ESCALONADOS PARA MÁXIMA RECEITA</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hotéis de 4 estrelas podem exigir tarifas base mais altas com descontos estratégicos:
              <ul className="list-disc pl-6 mt-2">
                <li>Estadias de 8 dias: Tarifa premium com amenidades exclusivas</li>
                <li>Estadias de 16 dias: 10-15% de desconto com serviços aprimorados</li>
                <li>Estadias de 32 dias: 20-25% de desconto com tratamento VIP</li>
              </ul>
              <div className="mt-2">
                Tarifas base mais altas compensam os descontos enquanto estadias mais longas reduzem custos operacionais e aumentam a receita geral.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ CRIE EXPERIÊNCIAS EXCLUSIVAS QUE JUSTIFIQUEM PREÇOS PREMIUM</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Desenvolva ofertas únicas que hóspedes não consigam encontrar em outro lugar:
              <ul className="list-disc pl-6 mt-2">
                <li>Acesso a eventos exclusivos, restaurantes ou locais culturais</li>
                <li>Sessões privadas com especialistas renomados em vários campos</li>
                <li>Itinerários personalizados baseados em interesses e objetivos do hóspede</li>
                <li>Parcerias premium com marcas de luxo e provedores de serviços</li>
                <li>Serviços de concierge que se estendem além de ofertas hoteleiras tradicionais</li>
              </ul>
              <div className="mt-2">
                Essas experiências criam estadias memoráveis que hóspedes estão dispostos a repetir e recomendar a outros.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conteúdo da aba HOTÉIS 5 ESTRELAS */}
      <TabsContent value="5star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Dicas Estratégicas para Hotéis 5 Estrelas</span>
            <span className="block mb-4">
              Hotéis de 5 estrelas podem posicionar estadias estendidas como experiências residenciais de luxo para indivíduos de ultra alto patrimônio líquido e clientela exclusiva.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ POSICIONE O HOTEL COMO UMA EXPERIÊNCIA RESIDENCIAL DE LUXO</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hotéis de 5 estrelas podem apresentar a estadia não como uma "reserva temporária" mas como uma residência temporária de luxo. Hóspedes apreciarão:
              <ul className="list-disc pl-6 mt-2">
                <li>Serviços completos do hotel disponíveis diariamente</li>
                <li>Privacidade combinada com atenção personalizada</li>
                <li>Conforto superior comparado a apartamentos ou vilas convencionais</li>
                <li>Localização prestigiosa, segurança e reputação</li>
              </ul>
              <div className="mt-2">
                O modelo de preços pode refletir a exclusividade, oferecendo vantagens claras comparado à complexidade de alugar propriedades privadas.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ DIRECIONE UM PERFIL DE AUDIÊNCIA MUITO SELETO</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Os hóspedes ideais para estadias Hotel-Living de 5 estrelas incluem:
              <ul className="list-disc pl-6 mt-2">
                <li>Executivos de negócios internacionais</li>
                <li>Aposentados ricos testando novos destinos</li>
                <li>Empreendedores precisando de períodos de residência flexíveis</li>
                <li>VIPs buscando discrição e conforto</li>
                <li>Famílias se realocando temporariamente por razões de negócios ou pessoais</li>
              </ul>
              <div className="mt-2">
                Esses hóspedes valorizam flexibilidade, consistência de serviço e a capacidade de viver por semanas ou meses em completo conforto sem obrigações de aluguel de longo prazo.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ USE OPÇÕES TEMÁTICAS LIMITADAS E DE ALTO NÍVEL QUANDO RELEVANTE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Diferente dos hotéis de 3 ou 4 estrelas, propriedades de 5 estrelas podem não requerer temas baseados em afinidades para atrair hóspedes. Contudo, se aplicados, temas devem combinar com o posicionamento de luxo:
              <ul className="list-disc pl-6 mt-2">
                <li>Programas privados de bem-estar médico</li>
                <li>Residências de coaching executivo</li>
                <li>Masterclasses de arte ou vinho de luxo</li>
                <li>Imersão linguística ou cultural privada com tutores exclusivos</li>
                <li>Retiros de desenvolvimento pessoal</li>
              </ul>
              <div className="mt-2">
                Qualquer oferta temática deve reforçar exclusividade e atenção personalizada, não participação em massa.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ PROMOVA DURAÇÕES DE ESTADIA FLEXÍVEIS PARA ADEQUAR CRONOGRAMAS VIP</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hóspedes de 5 estrelas frequentemente apreciam flexibilidade completa:
              <ul className="list-disc pl-6 mt-2">
                <li>Estadias de "teste" de 8 dias</li>
                <li>Períodos de vida confortável de 16 a 32 dias</li>
                <li>Opções para estender ou repetir estadias sem problemas</li>
              </ul>
              <div className="mt-2">
                A flexibilidade do Hotel-Living permite que hóspedes VIP adaptem sua estadia baseada em necessidades privadas, profissionais ou familiares.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ ENTREGUE QUALIDADE DE SERVIÇO SEM COMPROMISSOS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Este segmento de hóspedes exige serviço impecável:
              <ul className="list-disc pl-6 mt-2">
                <li>Serviços personalizados de concierge e mordomo 24/7</li>
                <li>Serviço antecipatório que excede expectativas</li>
                <li>Coordenação perfeita de todas as solicitações e preferências do hóspede</li>
                <li>Discrição absoluta e proteção de privacidade</li>
                <li>Resolução imediata de quaisquer problemas ou preocupações</li>
              </ul>
              <div className="mt-2">
                Preços premium são justificados entregando experiências que superam até mesmo as mais altas expectativas dos hóspedes.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conteúdo da aba BAIXAR CALCULADORA */}
      <TabsContent value="download" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg text-white" style={{
        background: "none"
      }}>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Baixar Calculadora Estratégica</h3>
            <p className="text-white/80 mb-6">
              Acesse nossa calculadora abrangente em Excel para modelar tarifas e rentabilidade para sua categoria específica de hotel e condições de mercado.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">PREVISIBILIDADE – RESPONSABILIDADE – EFICIÊNCIA</h4>
                <p className="text-white/90 text-sm">
                  O modelo Hotel-Living transforma a hospitalidade tradicional focando em estadias estendidas que criam fluxos de receita previsíveis, fomentam gestão responsável de recursos e maximizam eficiência operacional.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">HÓSPEDES HOTEL-LIVING NÃO SÃO TURISTAS TRANSITÓRIOS</h4>
                <p className="text-white/90 text-sm">
                  Nossos hóspedes buscam experiências significativas, conexão comunitária e estadias propositais que se alinhem com seus objetivos de desenvolvimento pessoal ou profissional. Esta abordagem cria maior satisfação e lealdade do hóspede.
                </p>
              </div>
              <div className="text-center mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Baixar Calculadora (Excel)
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>;
};