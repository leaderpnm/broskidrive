import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Plane, Check } from "lucide-react";

const services = [
  {
    icon: Clock,
    title: "Transport ponctuel",
    description: "Rendez-vous, aéroports, gares. Réservation à l'heure ou prise en charge immédiate.",
    features: ["Prise en charge garantie", "Véhicule premium"]
  },
  {
    icon: MapPin,
    title: "Mise à disposition",
    description: "Chauffeur dédié pour vos journées chargées, déplacements multiples ou événements.",
    features: ["Chauffeur dévoué", "Flexibilité totale"]
  },
  {
    icon: Plane,
    title: "Transferts aéroports",
    description: "Spécialiste des transferts vers tous les aéroports. Suivi des vols en temps réel.",
    features: ["Suivi des vols", "Attente gratuite"]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-black mb-4">Nos services</h3>
          <p className="text-lg broski-medium max-w-2xl mx-auto">
            Des solutions de transport adaptées à tous vos besoins, avec le même niveau d'excellence
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-black mb-4">{service.title}</h4>
                  <p className="broski-medium mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm broski-medium">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
