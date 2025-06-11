import { Facebook, Instagram, Linkedin } from "lucide-react";

const serviceLinks = [
  "Transport ponctuel",
  "Mise à disposition", 
  "Transferts aéroports",
  "Événements privés"
];

const infoLinks = [
  "Tarifs",
  "Conditions générales",
  "Mentions légales", 
  "Contact"
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4">Broski Drive</h4>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre chauffeur privé de confiance. Service premium, ponctualité garantie et confort absolu pour tous vos déplacements.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-gray-300">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <button className="hover:text-white transition-colors text-left">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Informations</h5>
            <ul className="space-y-2 text-gray-300">
              {infoLinks.map((link, index) => (
                <li key={index}>
                  <button className="hover:text-white transition-colors text-left">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Broski Drive. Tous droits réservés. | Licence VTC n° XXXXXXXX</p>
        </div>
      </div>
    </footer>
  );
}
