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
            <div className="bg-[#7E00B3]/90 backdrop-blur-sm rounded-lg p-8 text-white blue-glow">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-6 glow">🤝 CINE SUNT AMBASADORII HOTEL-LIVING?</h1>
                <div className="space-y-4 text-left max-w-4xl mx-auto">
                  <p className="text-lg">Sunt gazde, profesioniști din sector, sau adevărați îndrăgostiți de bogăția culturală și personală pe care o oferă călătoriile și cunoașterea lumii.</p>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-cyan-400 text-xl">🔵</span>
                    <p className="text-lg">Persoane care simt fiecare deplasare ca o sursă de cunoaștere, frumusețe, transformare și conexiune cu noi culturi, locuri și oameni.</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-yellow-400 text-xl">💡</span>
                    <p className="text-lg">Care înțeleg valoarea unei vieți bogate în experiențe ca fiind cheia pentru bunăstare, relații sociale și împlinire personală.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <Link 
                  to="/ambassadors/usa" 
                  className="bg-[#70009E] hover:bg-[#70009E]/80 text-white px-8 py-3 rounded-xl transition-all duration-300 font-medium text-lg"
                >
                  📊 Nuestros Embajadores
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-[#70009E] hover:bg-[#70009E]/80 text-white px-8 py-3 rounded-xl transition-all duration-300 font-medium text-lg"
                >
                  Hágase Embajador
                </Link>
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