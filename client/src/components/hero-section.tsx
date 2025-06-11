import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToBooking = () => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById('tarifs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Votre chauffeur privé
                <span className="broski-medium"> de confiance</span>
              </h2>
              <p className="text-xl broski-medium leading-relaxed">
                Service premium de transport avec chauffeur. Ponctualité, confort et discrétion garantis pour tous vos déplacements.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToBooking}
                className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl h-auto"
              >
                Réserver maintenant
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToPricing}
                className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 hover:text-white transition-all duration-200 h-auto"
              >
                Voir les tarifs
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">24/7</div>
                <div className="text-sm broski-medium font-medium">Disponible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">5★</div>
                <div className="text-sm broski-medium font-medium">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">500+</div>
                <div className="text-sm broski-medium font-medium">Clients satisfaits</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Luxury sedan car" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
