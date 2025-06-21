
import React from "react";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export function HotelAccordionMenuES() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-1">
        <AccordionMenuItem 
          value="benefits" 
          title="1-   Los beneficios de formar parte de nuestra red" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-4 text-left py-4">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Acceso exclusivo a nuestra plataforma tecnológica</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Marketing dirigido a comunidades específicas</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación garantizada sin espacios vacíos</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Precios premium por experiencias especializadas</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem 
          value="models" 
          title="2-   Modelos de colaboración disponibles" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-4 text-left py-4">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Modelo de comisión por reserva</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Modelo de tarifa fija mensual</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Modelo híbrido personalizado</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Opciones de integración completa</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem 
          value="revenue" 
          title="3-   Maximización de ingresos garantizada" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-4 text-left py-4">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Algoritmos de optimización de precios</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordinación perfecta de llegadas y salidas</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Eliminación de períodos vacíos</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Rentabilidad superior al modelo tradicional</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem 
          value="guests" 
          title="4-   Huéspedes de mayor calidad" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-4 text-left py-4">
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Filtro automático de huéspedes por afinidades</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Estancias más largas y repetidas</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Menor rotación y mayor satisfacción</p>
            <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Comunidades auto-reguladas</p>
          </div>
        </AccordionMenuItem>
        
        <AccordionMenuItem 
          value="specialized-hotels" 
          title="5 – ¿Qué son los hoteles por afinidades?" 
          className="mt-0 hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md"
          titleClassName="text-xl font-medium"
        >
          <div className="space-y-3 text-left py-4">
            <p className="text-lg font-semibold">EJEMPLO 1</p>
            <p className="text-base flex items-start pl-4">- Hotel para emprendedores en Barcelona</p>
            <p className="text-base flex items-start pl-4">- Espacios de coworking, networking events</p>
            <p className="text-base flex items-start pl-4">- Comunidad de startups y empresarios</p>
            <p className="text-base flex items-start pl-4">- Ocupación completa, estancias largas</p>
            
            <p className="text-lg font-semibold mt-6">EJEMPLO 2</p>
            <p className="text-base flex items-start pl-4">- Hotel para amantes de la naturaleza en Costa Rica</p>
            <p className="text-base flex items-start pl-4">- Tours ecológicos, actividades sostenibles</p>
            <p className="text-base flex items-start pl-4">- Huéspedes comprometidos con el medio ambiente</p>
            <p className="text-base flex items-start pl-4">- Precios premium por experiencias únicas</p>
            
            <p className="text-lg font-semibold mt-6">EJEMPLO 3</p>
            <p className="text-base flex items-start pl-4">- Hotel para artistas en París</p>
            <p className="text-base flex items-start pl-4">- Talleres creativos, exposiciones</p>
            <p className="text-base flex items-start pl-4">- Comunidad artística colaborativa</p>
            <p className="text-base flex items-start pl-4">- Experiencia cultural inmersiva</p>
            
            <p className="text-base italic mt-4">Los hoteles especializados crean experiencias comunitarias poderosas mientras mantienen ingresos estables y predecibles</p>
          </div>
        </AccordionMenuItem>
        
        <SpecialMenuItems startingNumber={6} />
      </div>
    </div>
  );
}
