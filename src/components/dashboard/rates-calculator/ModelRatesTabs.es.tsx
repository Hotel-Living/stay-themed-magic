import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// NOTA: El esquema de color y formato de dos líneas se conserva según especificación previa.
const TAB_BG = "bg-[#3C1865]";
const ACTIVE_TAB_BG = "bg-[#3C1865]";
const ACTIVE_TEXT = "text-white";

export const ModelRatesTabs: React.FC = () => {
  // Mover el estado de tab a este componente para que la refactorización no rompa el diseño o lógica.
  const [modelTab, setModelTab] = useState<string>("read-this"); // por defecto

  const tabs = [{
    value: "read-this",
    label: <span dangerouslySetInnerHTML={{ __html: "POR FAVOR<br />LEA ESTO" }} />
  }, {
    value: "3star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTELES<br />3 ESTRELLAS" }} />
  }, {
    value: "4star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTELES<br />4 ESTRELLAS" }} />
  }, {
    value: "5star",
    label: <span dangerouslySetInnerHTML={{ __html: "HOTELES<br />5 ESTRELLAS" }} />
  }, {
    value: "download",
    label: <span dangerouslySetInnerHTML={{ __html: "DESCARGAR<br />CALCULADORA" }} />
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
      {/* Contenido de la pestaña POR FAVOR LEA ESTO */}
      <TabsContent value="read-this" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg" style={{
        background: "none",
        color: "#fff"
      }}>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              1️⃣ ¿Qué es el modelo Hotel-Living y por qué es más rentable que el turismo tradicional?
            </div>
            <div className="text-white/80 text-[15px]">
              Hotel-Living redefine la ocupación hotelera dirigiéndose a huéspedes que se quedan entre 8-32 días en lugar de 1-3 noches. Este enfoque aumenta la retención de huéspedes, reduce los costos de adquisición y minimiza la complejidad operativa del cambio constante.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              2️⃣ ¿Cuáles son las principales ventajas competitivas sobre los hoteles tradicionales?
            </div>
            <div className="text-white/80 text-[15px]">
              Las estancias extendidas reducen los costos de marketing, disminuyen la frecuencia de limpieza, aumentan los ingresos por habitación disponible (RevPAR) y proporcionan flujo de efectivo predecible. Los huéspedes desarrollan lealtad hacia la ubicación y es más probable que regresen.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              3️⃣ ¿Cómo mejora las reservas la especialización temática?
            </div>
            <div className="text-white/80 text-[15px]">
              Al ofrecer experiencias alineadas con los intereses de los huéspedes (culinarias, bienestar, trabajo remoto, artes, etc.), los hoteles atraen huéspedes motivados dispuestos a pagar tarifas premium por estancias más largas que coincidan con su estilo de vida u objetivos.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              4️⃣ ¿Cuál es la estrategia de precios recomendada para Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Implementar descuentos progresivos: cobrar tarifas estándar para estancias de 8 días, descuentos moderados para estancias de 16 días y descuentos atractivos para estancias de 32 días. Esto fomenta compromisos más largos mientras mantiene la rentabilidad.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2 bg-[#5d14ac]">
              5️⃣ ¿Cómo calcular las tarifas óptimas de habitación para diferentes duraciones?
            </div>
            <div className="text-white/80 text-[15px]">
              Utilice las calculadoras estratégicas en las siguientes pestañas. Cada categoría de hotel (3, 4, 5 estrellas) tiene recomendaciones específicas para equilibrar precios competitivos con máxima rentabilidad basada en costos operativos y demografía objetivo.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              6️⃣ ¿Qué segmentos de huéspedes son más rentables para Hotel-Living?
            </div>
            <div className="text-white/80 text-[15px]">
              Trabajadores remotos, nómadas digitales, viajeros de negocios en proyectos extendidos, profesionales en reubicación y huéspedes motivados por temas (entusiastas culinarios, buscadores de bienestar, etc.) representan los segmentos de mayor valor.
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-white text-base mb-2">
              7️⃣ ¿Cómo implementar este modelo sin interrumpir las operaciones existentes?
            </div>
            <div className="text-white/80 text-[15px]">
              Comience dedicando el 20-30% de las habitaciones a paquetes Hotel-Living mientras mantiene las reservas tradicionales. Aumente gradualmente la asignación basándose en el análisis de demanda y rentabilidad.
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base mb-2">
              8️⃣ ¿Cuáles son las métricas clave para monitorear el éxito?
            </div>
            <div className="text-white/80 text-[15px]">
              Rastree la duración promedio de estancia (ALOS), ingresos por habitación disponible (RevPAR), costo de adquisición de clientes (CAC), porcentaje de huéspedes repetidos y puntuaciones de satisfacción del huésped para estancias extendidas vs. reservas tradicionales.
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Contenido de la pestaña HOTELES 3 ESTRELLAS */}
      <TabsContent value="3star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Consejos Estratégicos para Hoteles 3 Estrellas</span>
            <span className="block mb-4">
              Los hoteles de 3 estrellas tienen la mayor oportunidad de diferenciarse a través de la especialización temática y la construcción de comunidad en torno a los intereses de los huéspedes.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ ENFÓCATE EN EXPERIENCIAS TEMÁTICAS AUTÉNTICAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los hoteles de 3 estrellas tienen éxito ofreciendo experiencias genuinas e inmersivas en lugar de comodidades de lujo:
              <ul className="list-disc pl-6 mt-2">
                <li>Talleres culinarios con chefs locales</li>
                <li>Programas de bienestar con instructores calificados</li>
                <li>Inmersión lingüística con hablantes nativos</li>
                <li>Talleres de artesanía</li>
                <li>Seminarios de desarrollo profesional</li>
              </ul>
              <div className="mt-2">
                Enfócate en experiencias que creen valor duradero y justifiquen estancias más largas a través del aprendizaje y crecimiento personal.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ CONSTRUYE COMUNIDAD ENTRE HUÉSPEDES CON INTERESES COMPARTIDOS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Crea espacios sociales y programas que conecten a los huéspedes en torno a temas comunes:
              <ul className="list-disc pl-6 mt-2">
                <li>Actividades grupales diarias relacionadas con el tema del hotel</li>
                <li>Espacios de trabajo compartidos para trabajadores remotos y nómadas digitales</li>
                <li>Horas sociales vespertinas con conversaciones basadas en temas</li>
                <li>Proyectos de colaboración entre huéspedes y compartir habilidades</li>
                <li>Eventos de integración con la comunidad local</li>
              </ul>
              <div className="mt-2">
                Cuando los huéspedes forman conexiones, se quedan más tiempo y regresan con mayor frecuencia, aumentando el valor de por vida.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ OPTIMIZA PRECIOS PARA ESTANCIAS MÁS LARGAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Implementa precios progresivos que recompensen el compromiso:
              <ul className="list-disc pl-6 mt-2">
                <li>Estancias de 8 días: Tarifa completa o descuento mínimo (5-10%)</li>
                <li>Estancias de 16 días: Descuento moderado (15-20%)</li>
                <li>Estancias de 32 días: Descuento atractivo (25-30%)</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ REDUCE COSTOS OPERATIVOS A TRAVÉS DE ESTANCIAS EXTENDIDAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Las estancias más largas reducen naturalmente los gastos operativos clave:
              <ul className="list-disc pl-6 mt-2">
                <li>Frecuencia de limpieza: cada 3-4 días en lugar de diariamente</li>
                <li>Menores costos de lavandería y suministros por noche-huésped</li>
                <li>Reducido procesamiento de recepción y check-in/out</li>
                <li>Disminuidos costos de marketing y comisiones de reserva</li>
              </ul>
              <div className="mt-2">
                Estos ahorros pueden reinvertirse en mejorar las experiencias temáticas y la satisfacción del huésped.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ APROVECHA ALIANZAS LOCALES PARA EXPERIENCIAS AUTÉNTICAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Asóciate con negocios locales para mejorar las ofertas temáticas:
              <ul className="list-disc pl-6 mt-2">
                <li>Restaurantes locales para experiencias culinarias auténticas</li>
                <li>Talleres artesanales y centros culturales</li>
                <li>Estudios de fitness y practicantes de bienestar</li>
                <li>Instituciones educativas para programas de idiomas y habilidades</li>
                <li>Redes profesionales para eventos de desarrollo empresarial</li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Contenido de la pestaña HOTELES 4 ESTRELLAS */}
      <TabsContent value="4star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Consejos Estratégicos para Hoteles 4 Estrellas</span>
            <span className="block mb-4">
              Los hoteles de 4 estrellas pueden equilibrar la comodidad premium con experiencias temáticas accesibles para atraer huéspedes afluentes que buscan estancias extendidas.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ COMBINA COMODIDAD CON ESTANCIAS PROPOSITIVAS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los huéspedes de 4 estrellas esperan alojamientos de calidad además de experiencias significativas:
              <ul className="list-disc pl-6 mt-2">
                <li>Configuraciones premium de espacios de trabajo para viajeros de negocios</li>
                <li>Instalaciones de bienestar y fitness de alta calidad</li>
                <li>Programas culinarios sofisticados con chefs reconocidos</li>
                <li>Inmersión cultural con guías y educadores expertos</li>
                <li>Desarrollo profesional con líderes de la industria</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ DIRIGE A PROFESIONALES AFLUENTES Y BUSCADORES DE ESTILO DE VIDA</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Enfoca el marketing en huéspedes que valoran tanto la comodidad como el desarrollo personal:
              <ul className="list-disc pl-6 mt-2">
                <li>Ejecutivos de negocios en proyectos extendidos</li>
                <li>Entusiastas del bienestar que buscan experiencias transformadoras</li>
                <li>Profesionales creativos en sabáticos o retiros</li>
                <li>Jubilados afluentes explorando nuevos destinos e intereses</li>
                <li>Emprendedores asistiendo a programas intensivos o masterclasses</li>
              </ul>
              <div className="mt-2">
                Estos huéspedes están dispuestos a pagar tarifas premium por estancias que combinen lujo con crecimiento personal o profesional.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ ENFÓCATE EN "LUJO INTELIGENTE" EN LUGAR DE EXTRAVAGANCIA</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los huéspedes de 4 estrellas buscan lujo de maneras inteligentes y accesibles:
              <ul className="list-disc pl-6 mt-2">
                <li>Diseña espacios reflexivos sin excesos exagerados.</li>
                <li>Ofrece mejoras que añadan comodidad genuina (camas de alta calidad, insonorización, cortinas blackout, tecnología mejorada, etc.).</li>
                <li>Los toques ecológicos, centrados en el huésped y enfocados en bienestar serán valorados.</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ IMPLEMENTA PRECIOS ESCALONADOS PARA MÁXIMOS INGRESOS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los hoteles de 4 estrellas pueden exigir tarifas base más altas con descuentos estratégicos:
              <ul className="list-disc pl-6 mt-2">
                <li>Estancias de 8 días: Tarifa premium con amenities exclusivos</li>
                <li>Estancias de 16 días: 10-15% de descuento con servicios mejorados</li>
                <li>Estancias de 32 días: 20-25% de descuento con trato VIP</li>
              </ul>
              <div className="mt-2">
                Las tarifas base más altas compensan los descuentos mientras que las estancias más largas reducen costos operativos y aumentan los ingresos generales.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ CREA EXPERIENCIAS EXCLUSIVAS QUE JUSTIFIQUEN PRECIOS PREMIUM</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Desarrolla ofertas únicas que los huéspedes no puedan encontrar en otro lugar:
              <ul className="list-disc pl-6 mt-2">
                <li>Acceso a eventos exclusivos, restaurantes o sitios culturales</li>
                <li>Sesiones privadas con expertos reconocidos en varios campos</li>
                <li>Itinerarios personalizados basados en intereses y objetivos del huésped</li>
                <li>Alianzas premium con marcas de lujo y proveedores de servicios</li>
                <li>Servicios de concierge que se extienden más allá de las ofertas hoteleras tradicionales</li>
              </ul>
              <div className="mt-2">
                Estas experiencias crean estancias memorables que los huéspedes están dispuestos a repetir y recomendar a otros.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Contenido de la pestaña HOTELES 5 ESTRELLAS */}
      <TabsContent value="5star" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-8 rounded-lg text-white text-lg" style={{
        background: "none"
      }}>
          <div className="mb-4">
            <span className="font-bold text-xl block mb-2">Consejos Estratégicos para Hoteles 5 Estrellas</span>
            <span className="block mb-4">
              Los hoteles de 5 estrellas pueden posicionar las estancias extendidas como experiencias residenciales de lujo para individuos de ultra alto patrimonio neto y clientela exclusiva.
            </span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">1️⃣ POSICIONA EL HOTEL COMO UNA EXPERIENCIA RESIDENCIAL DE LUJO</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los hoteles de 5 estrellas pueden presentar la estancia no como una "reserva temporal" sino como una residencia temporal de lujo. Los huéspedes apreciarán:
              <ul className="list-disc pl-6 mt-2">
                <li>Servicios completos del hotel disponibles diariamente</li>
                <li>Privacidad combinada con atención personalizada</li>
                <li>Comodidad superior comparada con apartamentos o villas convencionales</li>
                <li>Ubicación prestigiosa, seguridad y reputación</li>
              </ul>
              <div className="mt-2">
                El modelo de precios puede reflejar la exclusividad, mientras ofrece ventajas claras comparado con la complejidad de alquilar propiedades privadas.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">2️⃣ DIRIGE A UN PERFIL DE AUDIENCIA MUY SELECTO</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los huéspedes ideales para estancias Hotel-Living de 5 estrellas incluyen:
              <ul className="list-disc pl-6 mt-2">
                <li>Ejecutivos de negocios internacionales</li>
                <li>Jubilados adinerados probando nuevos destinos</li>
                <li>Emprendedores que necesitan períodos de residencia flexibles</li>
                <li>VIPs que buscan discreción y comodidad</li>
                <li>Familias reubicándose temporalmente por razones de negocios o personales</li>
              </ul>
              <div className="mt-2">
                Estos huéspedes valoran la flexibilidad, consistencia del servicio y la capacidad de vivir por semanas o meses en completa comodidad sin obligaciones de alquiler a largo plazo.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">3️⃣ USA OPCIONES TEMÁTICAS LIMITADAS Y DE ALTO NIVEL CUANDO SEA RELEVANTE</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              A diferencia de los hoteles de 3 o 4 estrellas, las propiedades de 5 estrellas pueden no requerir temas basados en afinidades para atraer huéspedes. Sin embargo, si se aplican, los temas deben coincidir con el posicionamiento de lujo:
              <ul className="list-disc pl-6 mt-2">
                <li>Programas privados de bienestar médico</li>
                <li>Residencias de coaching ejecutivo</li>
                <li>Masterclasses de arte o vino de lujo</li>
                <li>Inmersión lingüística o cultural privada con tutores exclusivos</li>
                <li>Retiros de desarrollo personal</li>
              </ul>
              <div className="mt-2">
                Cualquier oferta temática debe reforzar la exclusividad y atención personalizada, no la participación masiva.
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-base">4️⃣ PROMUEVE DURACIONES DE ESTANCIA FLEXIBLES PARA AJUSTARSE A HORARIOS VIP</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Los huéspedes de 5 estrellas a menudo aprecian la flexibilidad completa:
              <ul className="list-disc pl-6 mt-2">
                <li>Estancias de "prueba" de 8 días</li>
                <li>Períodos de vida cómoda de 16 a 32 días</li>
                <li>Opciones para extender o repetir estancias sin problemas</li>
              </ul>
              <div className="mt-2">
                La flexibilidad del Hotel-Living permite a los huéspedes VIP adaptar su estancia basándose en necesidades privadas, profesionales o familiares.
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold text-base">5️⃣ ENTREGA CALIDAD DE SERVICIO SIN COMPROMISOS</span>
            <div className="text-white/90 text-[16px] ml-2 mt-2">
              Este segmento de huéspedes exige servicio impecable:
              <ul className="list-disc pl-6 mt-2">
                <li>Servicios personalizados de conserjería y mayordomo 24/7</li>
                <li>Servicio anticipatorio que supere las expectativas</li>
                <li>Coordinación perfecta de todas las solicitudes y preferencias del huésped</li>
                <li>Discreción absoluta y protección de la privacidad</li>
                <li>Resolución inmediata de cualquier problema o preocupación</li>
              </ul>
              <div className="mt-2">
                Los precios premium se justifican entregando experiencias que superen incluso las expectativas más altas de los huéspedes.
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Contenido de la pestaña DESCARGAR CALCULADORA */}
      <TabsContent value="download" className="w-full rounded-lg bg-[#3C1865]">
        <div className="w-full p-6 rounded-lg text-white" style={{
        background: "none"
      }}>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Descargar Calculadora Estratégica</h3>
            <p className="text-white/80 mb-6">
              Accede a nuestra calculadora integral en Excel para modelar tarifas y rentabilidad para tu categoría específica de hotel y condiciones de mercado.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">PREVISIBILIDAD – RESPONSABILIDAD – EFICIENCIA</h4>
                <p className="text-white/90 text-sm">
                  El modelo Hotel-Living transforma la hospitalidad tradicional al enfocarse en estancias extendidas que crean flujos de ingresos predecibles, fomentan la gestión responsable de recursos y maximizan la eficiencia operativa.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">LOS HUÉSPEDES HOTEL-LIVING NO SON TURISTAS TRANSITORIOS</h4>
                <p className="text-white/90 text-sm">
                  Nuestros huéspedes buscan experiencias significativas, conexión comunitaria y estancias propositivas que se alineen con sus objetivos de desarrollo personal o profesional. Este enfoque crea mayor satisfacción y lealtad del huésped.
                </p>
              </div>
              <div className="text-center mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Descargar Calculadora (Excel)
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>;
};