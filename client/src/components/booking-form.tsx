import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import CalendlyWidget from "@/components/calendly-widget";

type BookingFormData = z.infer<typeof insertBookingSchema>;

export default function BookingForm() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(insertBookingSchema),
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été enregistrée avec succès.",
      });
      reset();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de créer la réservation",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    createBookingMutation.mutate(data);
  };

  return (
    <section id="reservation" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-black mb-4">Réservez votre rendez-vous</h3>
          <p className="text-lg broski-medium">Planifiez facilement votre rendez-vous avec notre calendrier en ligne</p>
        </div>
        
        <Card className="bg-gray-50 shadow-lg">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendly Widget */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-black mb-4">Planifiez votre rendez-vous</h4>
                <Card className="shadow-sm">
                  <CardContent className="p-2">
                    <CalendlyWidget />
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-black mb-4">Vos informations</h4>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className="mt-1"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className="mt-1"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="mt-1"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={createBookingMutation.isPending}
                    className="w-full bg-black text-white hover:bg-gray-800 font-semibold text-lg py-4 shadow-lg h-auto"
                  >
                    {createBookingMutation.isPending ? "Confirmation en cours..." : "Confirmer la réservation"}
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
