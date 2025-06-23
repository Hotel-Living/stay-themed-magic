
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function WhyHotelLivingSectionES() {
  const accordionOptions = [
    "¿Aún alquilas?",
    "¿Hotel?",
    "¨¿JUBILADO?¨",
    "¿Viajero diario?",
    "¿Trabajador online?",
    "¿Alma libre?",
    "¿Sociedad?"
  ];

  const sloganBoxes = [
    {
      title: "🎯 Solución de vivienda inmediata",
      subtitle: "Sin complicaciones de contratos ni depósitos",
      highlight: "Lista para mudarse YA"
    },
    {
      title: "💰 Tarifas desde 699€/mes",
      subtitle: "Precios transparentes con todo incluido",
      highlight: "Sin costos ocultos"
    },
    {
      title: "🌍 Red global de hoteles",
      subtitle: "Más de 1,000 propiedades disponibles",
      highlight: "Tu hogar donde quieras"
    }
  ];

  const handleAccordionClick = (value: string) => {
    console.log(`Accordion clicked: ${value}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 px-4">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#eedbf7] glow tracking-tight leading-tight">
          ¿Por qué Hotel-Living?
        </h1>
        <p className="text-xl md:text-2xl text-[#e3d6e9] font-medium mb-8">
          La revolución de la vivienda flexible ya está aquí
        </p>
      </motion.div>

      {/* Slogan Boxes Grid */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {sloganBoxes.map((box, index) => (
          <Card key={index} className="bg-gradient-to-br from-[#8017B0]/20 to-[#570366]/20 border-[#a855f7]/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-[#f9d3f6] mb-2">{box.title}</h3>
              <p className="text-[#e3d6e9] text-sm mb-3">{box.subtitle}</p>
              <div className="bg-[#8017B0] text-white px-3 py-1 rounded-full text-xs font-semibold">
                {box.highlight}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Question Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#eedbf7] mb-8 glow">
          ¿Te identificas con alguna de estas situaciones?
        </h2>
        
        {/* Accordion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {accordionOptions.slice(0, 4).map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAccordionClick(option)}
              className="bg-gradient-to-br from-[#8017B0]/30 to-[#570366]/30 hover:from-[#8017B0]/50 hover:to-[#570366]/50 
                         border border-[#a855f7]/40 rounded-lg p-4 text-center transition-all duration-300 
                         hover:scale-105 hover:shadow-lg backdrop-blur-sm group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#f9d3f6] font-semibold text-sm md:text-base group-hover:text-white transition-colors">
                {option}
              </span>
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accordionOptions.slice(4).map((option, index) => (
            <motion.button
              key={index + 4}
              onClick={() => handleAccordionClick(option)}
              className="bg-gradient-to-br from-[#8017B0]/30 to-[#570366]/30 hover:from-[#8017B0]/50 hover:to-[#570366]/50 
                         border border-[#a855f7]/40 rounded-lg p-4 text-center transition-all duration-300 
                         hover:scale-105 hover:shadow-lg backdrop-blur-sm group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#f9d3f6] font-semibold text-sm md:text-base group-hover:text-white transition-colors">
                {option}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="text-[#e3d6e9] text-center text-lg max-w-2xl">
          <span className="font-semibold text-[#f9d3f6]">Hotel-Living</span> es la solución que estabas buscando.
          <br />
          <span className="text-base">Descubre una nueva forma de vivir sin las limitaciones tradicionales.</span>
        </p>
      </motion.div>
    </div>
  );
}
