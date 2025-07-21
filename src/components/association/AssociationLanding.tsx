import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Starfield } from '@/components/Starfield';
import { Link } from 'react-router-dom';
import { Hotel, Users, TrendingUp, Shield, Mail, Phone } from 'lucide-react';

export const AssociationLanding = () => {
  return (
    <div className="min-h-screen relative">
      <Starfield />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Únete a Nuestra Red de 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Asociaciones Hoteleras</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Conecta tu asociación hotelera con Nomad Heaven y comienza a generar comisiones 
            por cada reserva realizada por nuestros nómadas digitales.
          </p>
          <Link to="/asociacion/registro">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Registrar Mi Asociación
            </Button>
          </Link>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_30px_rgba(0,200,255,0.4)]">
            <CardHeader className="text-center">
              <Hotel className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <CardTitle className="text-white text-lg">Red Global</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Accede a una red global de hoteles y aumenta tu visibilidad internacional.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_30px_rgba(0,200,255,0.4)]">
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <CardTitle className="text-white text-lg">Comisiones Atractivas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Genera ingresos adicionales con nuestro sistema de comisiones competitivas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_30px_rgba(0,200,255,0.4)]">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <CardTitle className="text-white text-lg">Nómadas Digitales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Conecta con una comunidad creciente de profesionales remotos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_30px_rgba(0,200,255,0.4)]">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-orange-400 mx-auto mb-2" />
              <CardTitle className="text-white text-lg">Gestión Segura</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Panel de control seguro para gestionar hoteles y comisiones.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Regístrate</h3>
              <p className="text-slate-300">
                Completa el formulario de registro con los datos de tu asociación hotelera.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Agrega Hoteles</h3>
              <p className="text-slate-300">
                Añade los hoteles de tu asociación a nuestra plataforma desde tu panel.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Genera Comisiones</h3>
              <p className="text-slate-300">
                Recibe comisiones automáticamente por cada reserva realizada en tus hoteles.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 shadow-[0_0_60px_rgba(0,200,255,0.3)]">
          <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para Comenzar?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Únete a nuestra red de asociaciones hoteleras y comienza a generar 
              ingresos adicionales hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/asociacion/registro">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4"
                >
                  Registrar Asociación
                </Button>
              </Link>
              <Link to="/panel-asociacion">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4"
                >
                  Acceder al Panel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">¿Tienes Preguntas?</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>asociaciones@nomadheaven.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};