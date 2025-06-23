
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function WhyHotelLivingSectionRO() {
  const accordionOptions = [
    {
      value: "retired",
      label: "Pensionar?",
      content: (
        <div className="space-y-4">
          <p>Ești obosit să plătești chirie sau ipotecă pentru o casă pe care abia o folosești? Locuirea în hotel oferă soluția perfectă pentru pensionari care vor să își maximizeze anii de aur.</p>
          <p><strong>Beneficii pentru pensionari:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fără responsabilități de întreținere - concentrează-te pe a te bucura de viață</li>
            <li>Oportunități sociale și activități incluse</li>
            <li>Servicii profesionale de curățenie și mese</li>
            <li>Locații privilegiate lângă atracții culturale și îngrijire medicală</li>
            <li>Aranjamente flexibile - călătorește când vrei</li>
          </ul>
        </div>
      )
    },
    {
      value: "online-worker",
      label: "Lucrător Online?",
      content: (
        <div className="space-y-4">
          <p>Transformă-ți rutina de lucru de acasă într-o aventură de lucru de oriunde. Locuirea în hotel oferă infrastructura perfectă pentru profesioniștii digitali.</p>
          <p><strong>Perfect pentru lucrătorii la distanță:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internet de mare viteza fiabil și spații de lucru dedicate</li>
            <li>Mediu profesional departe de distragerile de acasă</li>
            <li>Oportunități de networking cu alți profesioniști</li>
            <li>Toate utilitățile și serviciile incluse într-un preț</li>
            <li>Avantaje fiscale pentru cazarea de afaceri</li>
          </ul>
        </div>
      )
    },
    {
      value: "commuter",
      label: "Departe de muncă?",
      content: (
        <div className="space-y-4">
          <p>Evită stresul navetei zilnice și locuiește unde lucrezi. Locuirea în hotel lângă locul de muncă poate revoluționa echilibrul dintre viața profesională și personală.</p>
          <p><strong>Avantaje pentru navetitori:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Elimină timpul și costurile de călătorie zilnică</li>
            <li>Reduce stresul și îmbunătățește performanța la muncă</li>
            <li>Mai mult timp pentru activități personale și relații</li>
            <li>Servicii profesionale ca spălătoria și mesele sunt gestionate</li>
            <li>Aranjamente flexibile pentru diferite programe de lucru</li>
          </ul>
        </div>
      )
    },
    {
      value: "free-soul",
      label: "Suflet Liber?",
      content: (
        <div className="space-y-4">
          <p>Eliberează-te de constrângerile locuinței tradiționale. Locuirea în hotel oferă libertatea supremă pentru cei care refuză să fie legați.</p>
          <p><strong>Beneficii de libertate:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fără angajamente pe termen lung sau contracte obligatorii</li>
            <li>Explorează diferite cartiere și orașe cu ușurință</li>
            <li>Posesiuni minime, experiențe maxime</li>
            <li>Întâlnește oameni diverși din întreaga lume</li>
            <li>Trăiește spontan fără responsabilități de proprietate</li>
          </ul>
        </div>
      )
    },
    {
      value: "hotel",
      label: "Hotel?",
      content: (
        <div className="space-y-4">
          <p>Cauți să revoluționezi modelul de afaceri al hotelului tău? Fă parteneriat cu noi pentru a transforma camerele goale în fluxuri de venituri consistente.</p>
          <p><strong>Beneficii pentru hoteluri:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ocupare garantată și venituri stabile</li>
            <li>Costuri reduse de marketing și rezervări</li>
            <li>Screening și management profesional al oaspeților</li>
            <li>Menține operațiunile hoteliere în timp ce maximizezi veniturile</li>
            <li>Alătură-te unei rețele în creștere de proprietăți inovatoare</li>
          </ul>
        </div>
      )
    },
    {
      value: "society",
      label: "Societate?",
      content: (
        <div className="space-y-4">
          <p>Locuirea în hotel reprezintă o soluție sustenabilă la provocările locuințelor, promovând folosirea eficientă a resurselor și construirea comunității.</p>
          <p><strong>Beneficii societale:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reducerea expansiunii urbane și impactului asupra mediului</li>
            <li>Folosirea eficientă a infrastructurii existente</li>
            <li>Conexiuni comunitare îmbunătățite și interacțiune socială</li>
            <li>Beneficii economice pentru afacerile locale și turism</li>
            <li>Soluție inovatoare la criza accesibilității locuințelor</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#5A1876] via-[#6B1E88] to-[#7C2A9A] py-12 mb-8 rounded-2xl">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#FEF7CD]">
          De ce să locuiești în hoteluri?
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
