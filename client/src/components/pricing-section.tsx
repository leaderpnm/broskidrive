import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const pricingItems = [
  { label: "Prise en charge", price: "€ 8.00" },
  { label: "Prix au kilomètre", price: "€ 2.50" },
  { label: "Temps d'attente (par min)", price: "€ 0.80" },
  { label: "Supplément nocturne (22h-6h)", price: "+ 25%" },
  { label: "Supplément dimanche/férié", price: "+ 15%" }
];

export default function PricingSection() {
  return (
    <section id="tarifs" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-black mb-4">Tarification transparente</h3>
          <p className="text-lg broski-medium max-w-2xl mx-auto">
            Prix fixes, sans surprise. Calculez votre course à l'avance
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold text-black mb-6">Grille tarifaire</h4>
                
                <div className="space-y-4">
                  {pricingItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium broski-dark">{item.label}</span>
                      <span className="font-semibold text-black">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-md border border-black/40 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white mb-1">Prix fixe garanti</h5>
                    <p className="text-gray-200 text-sm">
                      Le prix calculé lors de votre réservation est définitif, même en cas d'embouteillages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1573388415321-b8d8559891cb?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Professional chauffeur service" 
              className="rounded-2xl shadow-xl w-full h-auto" 
            />
            
            <div className="absolute bottom-6 left-6 right-6">
              <Card className="bg-black/30 backdrop-blur-md border border-black/40 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-white">Exemple de course</h5>
                      <p className="text-sm text-gray-200">Aéroport → Centre-ville</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">€ 45.60</div>
                      <div className="text-sm text-gray-200">Prix fixe</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
