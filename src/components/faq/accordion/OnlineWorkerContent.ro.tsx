
import React from "react";
import { QuestionGroup } from "./QuestionGroup";

export function OnlineWorkerContentRO() {
  const questionGroups = [
    [
      "Cât de fiabil este internetul hotelului pentru munca la distanță?",
      "Pot configura un spațiu de lucru productiv în camerele de hotel?",
      "Cum stau cu calitatea video call-urilor și nivelurile de zgomot?",
      "Cum gestionez diferitele fusuri orare în timp ce trăiesc în hoteluri?"
    ],
    [
      "Ce echipament ar trebui să aduc pentru munca la distanță?",
      "Cum mențin echilibrul muncă-viață în spații mici?",
      "Pot imprima documente și gestiona nevoile de afaceri?",
      "Ce opțiuni de internet de rezervă sunt disponibile?"
    ],
    [
      "Cum gestionez întâlnirile cu clienții și apelurile profesionale?",
      "Cum stau cu expedirea și primirea materialelor de lucru?",
      "Pot revendica deduceri fiscale pentru spațiul de lucru din hotel?",
      "Cum mențin relațiile profesionale la distanță?"
    ],
    [
      "Ce considerații de cybersecurity ar trebui să am?",
      "Cum protejez datele sensibile de lucru pe rețelele hotelului?",
      "Pot folosi centrele de afaceri ale hotelului eficient?",
      "Cum stau cu accesarea VPN-urilor companiei și sistemelor sigure?"
    ],
    [
      "Cum gestionez configurațiile cu monitoare multiple?",
      "Ce soluții ergonomice funcționează în camerele de hotel?",
      "Pot instala software și aplicații necesare?",
      "Cum gestionez licențele software între locații?"
    ],
    [
      "Cum stau cu colaborarea cu echipe distribuite?",
      "Cum particip la cultura companiei la distanță?",
      "Pot participa la conferințe și evenimente de networking?",
      "Cum gestionez evaluările de performanță și creșterea carierei?"
    ],
    [
      "Ce planuri de contingență ar trebui să am pentru defecțiuni tehnice?",
      "Cum fac backup regulat la datele importante de lucru?",
      "Ce opțiuni de hotspot mobil funcționează cel mai bine?",
      "Cum gestionez pene de curent și probleme de conectivitate?"
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
