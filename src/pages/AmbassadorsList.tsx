import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

const AmbassadorsList = () => {
  return (
    <div className="min-h-screen relative">
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-purple-900/80 backdrop-blur-sm rounded-lg p-8 text-white">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-6">Nuestros Embajadores</h1>
                <p className="text-lg mb-8">Conoce a los embajadores de Hotel-Living alrededor del mundo</p>
              </div>

              <div className="flex justify-center items-center space-x-6">
                <Link 
                  to="/ambassadors/usa" 
                  className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <div className="text-6xl mb-4">🇺🇸</div>
                  <h3 className="text-xl font-bold mb-2">Estados Unidos</h3>
                  <p className="text-sm opacity-80">7 Embajadores</p>
                </Link>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm italic opacity-70">Más países próximamente</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AmbassadorsList;