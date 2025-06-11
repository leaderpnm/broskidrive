import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const scrollToBooking = () => {
    scrollToSection('reservation');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">Broski Drive</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="broski-medium hover:text-black transition-colors duration-200 font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('tarifs')}
                className="broski-medium hover:text-black transition-colors duration-200 font-medium"
              >
                Tarifs
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="broski-medium hover:text-black transition-colors duration-200 font-medium"
              >
                Contact
              </button>
              <Button 
                onClick={scrollToBooking}
                className="bg-black text-white hover:bg-gray-800 font-medium"
              >
                Réserver
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left broski-medium hover:text-black transition-colors font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('tarifs')}
                className="block w-full text-left broski-medium hover:text-black transition-colors font-medium"
              >
                Tarifs
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left broski-medium hover:text-black transition-colors font-medium"
              >
                Contact
              </button>
              <Button 
                onClick={scrollToBooking}
                className="w-full bg-black text-white hover:bg-gray-800 font-medium"
              >
                Réserver
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
