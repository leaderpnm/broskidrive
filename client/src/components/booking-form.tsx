import { Card, CardContent } from "@/components/ui/card";
import CalendlyWidget from "@/components/calendly-widget";

export default function BookingForm() {
  return (
    <section id="reservation" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-black mb-4">Réservez votre rendez-vous</h3>
          <p className="text-lg broski-medium">Planifiez facilement votre rendez-vous avec notre calendrier en ligne</p>
        </div>
        
        <Card className="bg-gray-50 shadow-lg">
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto">
              <h4 className="text-xl font-semibold text-black mb-6 text-center">Planifiez votre rendez-vous</h4>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <CalendlyWidget />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
