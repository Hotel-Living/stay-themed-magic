import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// NOTĂ: Schema de culori și formatarea pe două linii sunt păstrate conform specificației anterioare.
const TAB_BG = "bg-[#3C1865]";
const ACTIVE_TAB_BG = "bg-[#3C1865]";
const ACTIVE_TEXT = "text-white";

export const ModelRatesTabs: React.FC = () => {
  // Mutăm starea tab-ului în această componentă pentru ca refactorizarea să nu rupă layout-ul sau logica.
  const [modelTab, setModelTab] = useState<string>("read-this"); // implicit

  const tabs = [{
    value: "read-this",
    label: <span dangerouslySetInnerHTML={{ __html: "VĂ ROG<br />CITIȚI ACEASTA" }} />
  }, {
    value: "3star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTELURI<br />3 STELE" }} />
  }, {
    value: "4star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTELURI<br />4 STELE" }} />
  }, {
    value: "5star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTELURI<br />5 STELE" }} />
  }, {
    value: "download",
    label: <span dangerouslySetInnerHTML={{ __html: "DESCĂRCARE<br />CALCULATOR" }} />
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
      {/* Conținutul tab-ului VĂ ROG CITIȚI ACEASTA */}
      <TabsContent value="read-this" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg" style={{
        background: "none",
        color: "#fff"
      }}>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              1️⃣ Ce este modelul Hotel-Living și de ce este mai profitabil decât turismul tradițional?
            </div>
            <div className="text-white/80 text-[15px]">
              Hotel-Living redefinește ocuparea hotelieră vizând oaspeți care stau 8-32 de zile în loc de 1-3 nopți. Această abordare crește reținerea oaspeților, reduce costurile de achiziție și minimizează complexitatea operațională a schimbării constante.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              2️⃣ Care sunt principalele avantaje competitive față de hotelurile tradiționale?
            </div>
            <div className="text-white/80 text-[15px]">
              Șederile extinse reduc costurile de marketing, scad frecvențele de curățenie, cresc veniturile pe cameră disponibilă (RevPAR) și oferă flux de numerar previzibil. Oaspeții dezvoltă loialitate față de locație și sunt mai predispuși să se întoarcă.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              3️⃣ Cum îmbunătățește specializarea tematică rezervările?
            </div>
            <div className="text-white/80 text-[15px]">
              Prin oferirea de experiențe aliniate cu interesele oaspeților (culinare, wellness, muncă la distanță, arte, etc.), hotelurile atrag oaspeți motivați dispuși să plătească tarife premium pentru șederi mai lungi care se potrivesc cu stilul lor de viață sau obiectivele.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              4️⃣ Care este strategia de prețuri recomandată pentru Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Implementați reduceri progresive: perceperea tarifelor standard pentru șederi de 8 zile, reduceri moderate pentru șederi de 16 zile și reduceri atractive pentru șederi de 32 de zile. Aceasta încurajează angajamente mai lungi menținând profitabilitatea.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              5️⃣ Cum să calculați tarifele optime ale camerelor pentru diferite durate?
            </div>
            <div className="text-white/80 text-[15px]">
              Folosiți calculatoarele strategice din tab-urile următoare. Fiecare categorie de hotel (3, 4, 5 stele) are recomandări specifice pentru echilibrarea prețurilor competitive cu profitabilitatea maximă bazată pe costurile operaționale și demografia țintă.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              6️⃣ Care segmente de oaspeți sunt cele mai profitabile pentru Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Lucrătorii la distanță, nomazi digitali, călători de afaceri în proiecte extinse, profesioniști în relocare și oaspeți motivați tematic (entuziaști culinari, căutători de wellness, etc.) reprezintă segmentele cu cea mai mare valoare.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              7️⃣ Cum să implementați acest model fără a perturba operațiunile existente?
            </div>
            <div className="text-white/80 text-[15px]">
              Începeți prin dedicarea a 20-30% din camere pachetelor Hotel-Living menținând rezervările tradiționale. Creșteți gradual alocarea bazată pe analiza cererii și profitabilității.
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              8️⃣ Care sunt metricile cheie pentru monitorizarea succesului?
            </div>
            <div className="text-white/80 text-[15px]">
              Urmăriți durata medie de ședere (ALOS), veniturile pe cameră disponibilă (RevPAR), costul de achiziție al clientului (CAC), procentul de oaspeți care se întorc și scorurile de satisfacție ale oaspeților pentru șederi extinse vs. rezervări tradiționale.
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conținutul tab-ului HOTELURI 3 STELE */}
      <TabsContent value="3star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Sfaturi Strategice pentru Hoteluri 3 Stele</span>
            <span className="block mb-4">
              Hotelurile de 3 stele au cea mai mare oportunitate de a se diferenția prin specializarea tematică și construirea comunității în jurul intereselor oaspeților.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ CONCENTRAȚI-VĂ PE EXPERIENȚE TEMATICE AUTENTICE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hotelurile de 3 stele reușesc oferind experiențe genuine și imersive în loc de amenități de lux:
              <ul className="list-disc pl-6 mt-2">
                <li>Ateliere culinare cu bucătari locali</li>
                <li>Programe de wellness cu instructori calificați</li>
                <li>Imersiune lingvistică cu vorbitori nativi</li>
                <li>Ateliere de artizanat</li>
                <li>Seminarii de dezvoltare profesională</li>
              </ul>
              <div className="mt-2">
                Concentrați-vă pe experiențe care creează valoare durabilă și justifică șederi mai lungi prin învățare și creștere personală.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ CONSTRUIȚI COMUNITATE ÎNTRE OASPEȚI CU INTERESE COMUNE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Creați spații sociale și programe care conectează oaspeții în jurul temelor comune:
              <ul className="list-disc pl-6 mt-2">
                <li>Activități zilnice de grup legate de tema hotelului</li>
                <li>Spații de lucru partajate pentru lucrători la distanță și nomazi digitali</li>
                <li>Ore sociale de seară cu conversații bazate pe teme</li>
                <li>Proiecte collaborative între oaspeți și partajarea abilităților</li>
                <li>Evenimente de integrare în comunitatea locală</li>
              </ul>
              <div className="mt-2">
                Când oaspeții formează conexiuni, stau mai mult și se întorc mai frecvent, crescând valoarea pe viață.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ OPTIMIZAȚI PREȚURILE PENTRU ȘEDERI MAI LUNGI</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Implementați prețuri progresive care recompensează angajamentul:
              <ul className="list-disc pl-6 mt-2">
                <li>Șederi de 8 zile: Tarif complet sau reducere minimă (5-10%)</li>
                <li>Șederi de 16 zile: Reducere moderată (15-20%)</li>
                <li>Șederi de 32 de zile: Reducere atractivă (25-30%)</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ REDUCEȚI COSTURILE OPERAȚIONALE PRIN ȘEDERI EXTINSE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Șederile mai lungi reduc natural cheltuielile operaționale cheie:
              <ul className="list-disc pl-6 mt-2">
                <li>Frecvența curățeniei: la fiecare 3-4 zile în loc de zilnic</li>
                <li>Costuri mai mici de spălătorie și aprovizionare pe noapte-oaspete</li>
                <li>Procesare redusă la recepție și check-in/out</li>
                <li>Costuri diminuate de marketing și comisioane de rezervare</li>
              </ul>
              <div className="mt-2">
                Aceste economii pot fi reinvestite în îmbunătățirea experiențelor tematice și satisfacția oaspeților.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ VALORIFICAȚI PARTENERIATELE LOCALE PENTRU EXPERIENȚE AUTENTICE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Partenerați cu afaceri locale pentru a îmbunătăți ofertele tematice:
              <ul className="list-disc pl-6 mt-2">
                <li>Restaurante locale pentru experiențe culinare autentice</li>
                <li>Ateliere artizanale și centre culturale</li>
                <li>Studiouri de fitness și practicieni de wellness</li>
                <li>Instituții educaționale pentru programe de limbi și abilități</li>
                <li>Rețele profesionale pentru evenimente de dezvoltare a afacerilor</li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conținutul tab-ului HOTELURI 4 STELE */}
      <TabsContent value="4star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Sfaturi Strategice pentru Hoteluri 4 Stele</span>
            <span className="block mb-4">
              Hotelurile de 4 stele pot echilibra confortul premium cu experiențe tematice accesibile pentru a atrage oaspeți înstăriți care caută șederi extinse.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ COMBINAȚI CONFORTUL CU ȘEDERI PROPOSITALE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Oaspeții de 4 stele se așteaptă la cazare de calitate plus experiențe semnificative:
              <ul className="list-disc pl-6 mt-2">
                <li>Configurații premium de spațiu de lucru pentru călători de afaceri</li>
                <li>Facilități de wellness și fitness de înaltă calitate</li>
                <li>Programe culinare sofisticate cu bucătari renumiți</li>
                <li>Imersiune culturală cu ghizi și educatori experți</li>
                <li>Dezvoltare profesională cu lideri din industrie</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ VIZAȚI PROFESIONIȘTI ÎNSTĂRIȚI ȘI CĂUTĂTORI DE STIL DE VIAȚĂ</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Concentrați marketingul pe oaspeți care prețuiesc atât confortul cât și dezvoltarea personală:
              <ul className="list-disc pl-6 mt-2">
                <li>Executivi de afaceri în proiecte extinse</li>
                <li>Entuziaști de wellness care caută experiențe transformatoare</li>
                <li>Profesioniști creativi în sabatice sau retrageri</li>
                <li>Pensionari înstăriți explorând noi destinații și interese</li>
                <li>Antreprenori participând la programe intensive sau masterclass-uri</li>
              </ul>
              <div className="mt-2">
                Acești oaspeți sunt dispuși să plătească tarife premium pentru șederi care combină luxul cu creșterea personală sau profesională.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ CONCENTRAȚI-VĂ PE "LUXUL INTELIGENT" ÎN LOC DE EXTRAVAGANTĂ</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Oaspeții de 4 stele caută luxul în moduri inteligente și accesibile:
              <ul className="list-disc pl-6 mt-2">
                <li>Proiectați spații gândite fără exces exagerat.</li>
                <li>Oferiți upgrade-uri care adaugă confort real (paturi de înaltă calitate, izolare fonică, perdele blackout, tehnologie îmbunătățită, etc.).</li>
                <li>Atingerile ecologice, centrate pe oaspete și axate pe wellness vor fi apreciate.</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ IMPLEMENTAȚI PREȚURI EȘALONATE PENTRU VENITURI MAXIME</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hotelurile de 4 stele pot comanda tarife de bază mai mari cu reduceri strategice:
              <ul className="list-disc pl-6 mt-2">
                <li>Șederi de 8 zile: Tarif premium cu amenități exclusive</li>
                <li>Șederi de 16 zile: 10-15% reducere cu servicii îmbunătățite</li>
                <li>Șederi de 32 de zile: 20-25% reducere cu tratament VIP</li>
              </ul>
              <div className="mt-2">
                Tarifele de bază mai mari compensează reducerile în timp ce șederile mai lungi reduc costurile operaționale și cresc veniturile generale.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ CREAȚI EXPERIENȚE EXCLUSIVE CARE SĂ JUSTIFICE PREȚURILE PREMIUM</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Dezvoltați oferte unice pe care oaspeții nu le pot găsi în altă parte:
              <ul className="list-disc pl-6 mt-2">
                <li>Acces la evenimente exclusive, restaurante sau situri culturale</li>
                <li>Sesiuni private cu experți renumiți în diverse domenii</li>
                <li>Itinerarii personalizate bazate pe interesele și obiectivele oaspeților</li>
                <li>Parteneriate premium cu mărci de lux și furnizori de servicii</li>
                <li>Servicii de concierge care se extind dincolo de ofertele hoteliere tradiționale</li>
              </ul>
              <div className="mt-2">
                Aceste experiențe creează șederi memorabile pe care oaspeții sunt dispuși să le repete și să le recomande altora.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conținutul tab-ului HOTELURI 5 STELE */}
      <TabsContent value="5star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Sfaturi Strategice pentru Hoteluri 5 Stele</span>
            <span className="block mb-4">
              Hotelurile de 5 stele pot poziționa șederile extinse ca experiențe rezidențiale de lux pentru indivizi cu avere netă ultra-mare și clientelă exclusivă.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ POZIȚIONAȚI HOTELUL CA O EXPERIENȚĂ REZIDENȚIALĂ DE LUX</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Hotelurile de 5 stele pot prezenta șederea nu ca o "rezervare temporară" ci ca o reședință temporară de lux. Oaspeții vor aprecia:
              <ul className="list-disc pl-6 mt-2">
                <li>Servicii complete ale hotelului disponibile zilnic</li>
                <li>Intimitate combinată cu atenție personalizată</li>
                <li>Confort superior comparativ cu apartamente sau vile convenționale</li>
                <li>Locație prestigioasă, securitate și reputație</li>
              </ul>
              <div className="mt-2">
                Modelul de prețuri poate reflecta exclusivitatea, oferind avantaje clare comparativ cu complexitatea închirierii proprietăților private.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ VIZAȚI UN PROFIL DE AUDIENȚĂ FOARTE SELECT</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Oaspeții ideali pentru șederi Hotel-Living de 5 stele includ:
              <ul className="list-disc pl-6 mt-2">
                <li>Executivi de afaceri internaționali</li>
                <li>Pensionari bogați testând noi destinații</li>
                <li>Antreprenori care au nevoie de perioade flexibile de reședință</li>
                <li>VIP-uri care caută discreție și confort</li>
                <li>Familii care se relocalizează temporar din motive de afaceri sau personale</li>
              </ul>
              <div className="mt-2">
                Acești oaspeți prețuiesc flexibilitatea, consistența serviciului și capacitatea de a trăi săptămâni sau luni în confort complet fără obligații de închiriere pe termen lung.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ FOLOSIȚI OPȚIUNI TEMATICE LIMITATE ȘI DE NIVEL ÎNALT CÂND ESTE RELEVANT</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Spre deosebire de hotelurile de 3 sau 4 stele, proprietățile de 5 stele pot să nu necesite teme bazate pe afinități pentru a atrage oaspeți. Totuși, dacă sunt aplicate, temele ar trebui să se potrivească cu poziționarea de lux:
              <ul className="list-disc pl-6 mt-2">
                <li>Programe private de wellness medical</li>
                <li>Reședințe de coaching executiv</li>
                <li>Masterclass-uri de artă sau vin de lux</li>
                <li>Imersiune lingvistică sau culturală privată cu tutori exclusivi</li>
                <li>Retrageri de dezvoltare personală</li>
              </ul>
              <div className="mt-2">
                Orice ofertă tematică trebuie să întărească exclusivitatea și atenția personalizată, nu participarea în masă.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ PROMOVAȚI DURATE FLEXIBILE DE ȘEDERE PENTRU A SE POTRIVI PROGRAMELOR VIP</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Oaspeții de 5 stele apreciază adesea flexibilitatea completă:
              <ul className="list-disc pl-6 mt-2">
                <li>Șederi de "testare" de 8 zile</li>
                <li>Perioade de viață confortabilă de 16 la 32 de zile</li>
                <li>Opțiuni de prelungire sau repetare a șederilor fără probleme</li>
              </ul>
              <div className="mt-2">
                Flexibilitatea Hotel-Living permite oaspeților VIP să își adapteze șederea bazată pe nevoi private, profesionale sau familiale.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ OFERIȚI CALITATE DE SERVICIU FĂRĂ COMPROMISURI</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Acest segment de oaspeți cere serviciu impecabil:
              <ul className="list-disc pl-6 mt-2">
                <li>Servicii personalizate de concierge și butler 24/7</li>
                <li>Serviciu anticipativ care depășește așteptările</li>
                <li>Coordonare perfectă a tuturor cererilor și preferințelor oaspeților</li>
                <li>Discreție absolută și protecția intimității</li>
                <li>Rezolvarea imediată a oricăror probleme sau preocupări</li>
              </ul>
              <div className="mt-2">
                Prețurile premium sunt justificate prin livrarea de experiențe care depășesc chiar și cele mai înalte așteptări ale oaspeților.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Conținutul tab-ului DESCĂRCARE CALCULATOR */}
      <TabsContent value="download" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg text-white" style={{
        background: "none"
      }}>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Descărcați Calculatorul Strategic</h3>
            <p className="text-white/80 mb-6">
              Accesați calculatorul nostru cuprinzător Excel pentru a modela tarifele și profitabilitatea pentru categoria specifică de hotel și condițiile de piață.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">PREVIZIBILITATE – RESPONSABILITATE – EFICIENȚĂ</h4>
                <p className="text-white/90 text-sm">
                  Modelul Hotel-Living transformă ospitalitatea tradițională concentrându-se pe șederi extinse care creează fluxuri de venituri previzibile, promovează gestionarea responsabilă a resurselor și maximizează eficiența operațională.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">OASPEȚII HOTEL-LIVING NU SUNT TURIȘTI TRANZITORI</h4>
                <p className="text-white/90 text-sm">
                  Oaspeții noștri caută experiențe semnificative, conexiune comunitară și șederi propositale care se aliniază cu obiectivele lor de dezvoltare personală sau profesională. Această abordare creează satisfacție și loialitate mai mare a oaspeților.
                </p>
              </div>
              <div className="text-center mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Descărcați Calculatorul (Excel)
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>;
};