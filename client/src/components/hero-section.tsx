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
    <section 
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat pt-20"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1652455469144-62ec9fa6da2d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Content */}
      <div className="relative z-10 w-full flex items-center">
        <div className="max-w-7xl mx-auto w-full pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-medium text-white leading-tight">
                Votre chauffeur privé
                <span className="text-gray-300"> de confiance</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
                Service premium de transport avec chauffeur. Ponctualité, confort et discrétion garantis pour tous vos déplacements.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToBooking}
                className="bg-white text-black px-8 py-3 rounded-lg font-medium text-base hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl h-auto"
              >
                Réserver maintenant
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToPricing}
                className="border-2 border-white text-white bg-black/30 backdrop-blur-sm px-8 py-3 rounded-lg font-medium text-base hover:bg-white hover:text-black transition-all duration-200 h-auto"
              >
                Voir les tarifs
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-xl pt-[0px] pb-[0px]">
              <div>
                <div className="text-2xl lg:text-3xl font-semibold text-white">24/7</div>
                <div className="text-xs text-gray-300 font-normal mt-1">Disponible</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-semibold text-white">5★</div>
                <div className="text-xs text-gray-300 font-normal mt-1">Note moyenne</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-semibold text-white">500+</div>
                <div className="text-xs text-gray-300 font-normal mt-1">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
