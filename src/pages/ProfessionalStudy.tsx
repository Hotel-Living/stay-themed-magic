import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Phone, MapPin, Calendar, FileText, Users } from "lucide-react";

export default function ProfessionalStudy() {
  const { t, language } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Professional study request submitted");
  };

  const getContent = () => {
    switch (language) {
      case 'es':
        return {
          title: "ESTUDIO PROFESIONAL GRATUITO",
          subtitle: "Obtenga un completo estudio profesional, técnico y presencial sobre su hotel y sus posibilidades de desarrollo",
          description: "Nuestro equipo de expertos realizará un análisis exhaustivo de su propiedad para identificar oportunidades de crecimiento y optimización.",
          features: [
            "Análisis técnico completo de las instalaciones",
            "Evaluación del potencial de mercado",
            "Estudio de viabilidad financiera",
            "Recomendaciones personalizadas",
            "Planificación estratégica a medida",
            "Consulta presencial con expertos"
          ],
          formTitle: "Solicite su estudio gratuito",
          formDescription: "Complete el formulario y nos pondremos en contacto con usted para programar la visita",
          nameLabel: "Nombre completo",
          emailLabel: "Correo electrónico",
          phoneLabel: "Teléfono",
          hotelLabel: "Nombre del hotel",
          locationLabel: "Ubicación",
          messageLabel: "Mensaje adicional (opcional)",
          submitButton: "SOLICITAR ESTUDIO GRATUITO"
        };
      case 'pt':
        return {
          title: "ESTUDO PROFISSIONAL GRATUITO",
          subtitle: "Obtenha um estudo profissional, técnico e presencial completo sobre o seu hotel e as suas possibilidades de desenvolvimento",
          description: "A nossa equipa de especialistas realizará uma análise exaustiva da sua propriedade para identificar oportunidades de crescimento e otimização.",
          features: [
            "Análise técnica completa das instalações",
            "Avaliação do potencial de mercado",
            "Estudo de viabilidade financeira",
            "Recomendações personalizadas",
            "Planeamento estratégico à medida",
            "Consulta presencial com especialistas"
          ],
          formTitle: "Solicite o seu estudo gratuito",
          formDescription: "Complete o formulário e entraremos em contacto consigo para agendar a visita",
          nameLabel: "Nome completo",
          emailLabel: "E-mail",
          phoneLabel: "Telefone",
          hotelLabel: "Nome do hotel",
          locationLabel: "Localização",
          messageLabel: "Mensagem adicional (opcional)",
          submitButton: "SOLICITAR ESTUDO GRATUITO"
        };
      case 'ro':
        return {
          title: "STUDIU PROFESIONAL GRATUIT",
          subtitle: "Obțineți un studiu profesional complet, tehnic și în persoană despre hotelul dvs. și posibilitățile sale de dezvoltare",
          description: "Echipa noastră de experți va efectua o analiză cuprinzătoare a proprietății dvs. pentru a identifica oportunități de creștere și optimizare.",
          features: [
            "Analiza tehnică completă a instalațiilor",
            "Evaluarea potențialului de piață",
            "Studiu de fezabilitate financiară",
            "Recomandări personalizate",
            "Planificare strategică la comandă",
            "Consultare în persoană cu experți"
          ],
          formTitle: "Solicitați studiul dvs. gratuit",
          formDescription: "Completați formularul și vă vom contacta pentru a programa vizita",
          nameLabel: "Nume complet",
          emailLabel: "E-mail",
          phoneLabel: "Telefon",
          hotelLabel: "Numele hotelului",
          locationLabel: "Locația",
          messageLabel: "Mesaj suplimentar (opțional)",
          submitButton: "SOLICITAȚI STUDIUL GRATUIT"
        };
      default: // English
        return {
          title: "FREE PROFESSIONAL STUDY",
          subtitle: "Get a complete professional, technical and in-person study about your hotel and its development possibilities",
          description: "Our team of experts will conduct a comprehensive analysis of your property to identify growth and optimization opportunities.",
          features: [
            "Complete technical analysis of facilities",
            "Market potential evaluation",
            "Financial feasibility study",
            "Personalized recommendations",
            "Tailored strategic planning",
            "In-person consultation with experts"
          ],
          formTitle: "Request your free study",
          formDescription: "Complete the form and we will contact you to schedule the visit",
          nameLabel: "Full name",
          emailLabel: "Email",
          phoneLabel: "Phone",
          hotelLabel: "Hotel name",
          locationLabel: "Location",
          messageLabel: "Additional message (optional)",
          submitButton: "REQUEST FREE STUDY"
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8 relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-fuchsia-200 max-w-4xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Information Section */}
            <Card className="bg-gradient-to-br from-purple-900/80 via-fuchsia-900/60 to-purple-800/80 backdrop-blur-sm border-fuchsia-400 border-2">
              <CardHeader>
                <CardTitle className="text-white text-2xl md:text-3xl font-bold">
                  {content.formTitle}
                </CardTitle>
                <CardDescription className="text-fuchsia-200 text-lg">
                  {content.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="mr-2 text-fuchsia-400" />
                    What's included:
                  </h3>
                  <ul className="space-y-3">
                    {content.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-white">
                        <CheckCircle className="mr-2 mt-1 text-fuchsia-400 flex-shrink-0 w-5 h-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-gradient-to-br from-purple-900/80 via-fuchsia-900/60 to-purple-800/80 backdrop-blur-sm border-fuchsia-400 border-2">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">
                  {content.formTitle}
                </CardTitle>
                <CardDescription className="text-fuchsia-200">
                  {content.formDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        {content.nameLabel}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        className="bg-white/10 border-fuchsia-400/50 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        {content.emailLabel}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="bg-white/10 border-fuchsia-400/50 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        {content.phoneLabel}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="bg-white/10 border-fuchsia-400/50 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel" className="text-white">
                        {content.hotelLabel}
                      </Label>
                      <Input
                        id="hotel"
                        type="text"
                        required
                        className="bg-white/10 border-fuchsia-400/50 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      {content.locationLabel}
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      required
                      className="bg-white/10 border-fuchsia-400/50 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      {content.messageLabel}
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="bg-white/10 border-fuchsia-400/50 text-white placeholder:text-white/60"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 text-lg"
                  >
                    {content.submitButton}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-purple-900/80 via-fuchsia-900/60 to-purple-800/80 backdrop-blur-sm border-fuchsia-400 border-2 max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-white text-xl font-bold mb-4">Contact Information</h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white">
                  <div className="flex items-center">
                    <Mail className="mr-2 text-fuchsia-400" />
                    <span>info@affinitystays.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 text-fuchsia-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}