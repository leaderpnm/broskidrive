import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

type BookingFormData = z.infer<typeof insertBookingSchema>;

interface RouteCalculation {
  distance: number;
  duration: number;
  totalPrice: string;
}

const timeSlots = [
  "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"
];

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [routeCalculation, setRouteCalculation] = useState<RouteCalculation | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(insertBookingSchema),
  });

  const startAddress = watch("startAddress");
  const endAddress = watch("endAddress");

  const calculateRouteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/calculate-route", {
        startAddress,
        endAddress,
      });
      return response.json();
    },
    onSuccess: (data: RouteCalculation) => {
      setRouteCalculation(data);
      toast({
        title: "Trajet calculé",
        description: `Distance: ${data.distance} km - Prix: €${data.totalPrice}`,
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de calculer le trajet",
        variant: "destructive",
      });
    },
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
      setSelectedDate(undefined);
      setSelectedTime("");
      setRouteCalculation(null);
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
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      ...data,
      selectedDate: selectedDate.toISOString().split('T')[0],
      selectedTime,
    };

    createBookingMutation.mutate(bookingData);
  };

  const canCalculateRoute = startAddress && endAddress && startAddress.trim() !== "" && endAddress.trim() !== "";

  return (
    <section id="reservation" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-black mb-4">Réservez votre course</h3>
          <p className="text-lg broski-medium">Sélectionnez votre créneau et calculez le prix instantanément</p>
        </div>
        
        <Card className="bg-gray-50 shadow-lg">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar and Time Selection */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-black mb-4">Sélectionnez date et heure</h4>
                
                {/* Calendar */}
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>
                
                {/* Time Slots */}
                <div>
                  <h5 className="font-semibold text-black mb-3">Créneaux disponibles</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time 
                          ? "bg-black text-white" 
                          : "border-gray-200 hover:border-black hover:bg-black hover:text-white"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Route Calculator and Booking Form */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-black mb-4">Calculateur de trajet</h4>
                
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
                  
                  <div>
                    <Label htmlFor="startAddress">Point de départ</Label>
                    <Input
                      id="startAddress"
                      placeholder="Adresse de départ"
                      {...register("startAddress")}
                      className="mt-1"
                    />
                    {errors.startAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.startAddress.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="endAddress">Destination</Label>
                    <Input
                      id="endAddress"
                      placeholder="Adresse de destination"
                      {...register("endAddress")}
                      className="mt-1"
                    />
                    {errors.endAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.endAddress.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="button"
                    onClick={() => calculateRouteMutation.mutate()}
                    disabled={!canCalculateRoute || calculateRouteMutation.isPending}
                    className="w-full bg-gray-600 text-white hover:bg-gray-700"
                  >
                    {calculateRouteMutation.isPending ? "Calcul en cours..." : "Calculer le trajet"}
                  </Button>
                  
                  {/* Results */}
                  {routeCalculation && (
                    <Card className="border-l-4 border-green-500">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium broski-medium">Distance:</span>
                            <span className="font-semibold text-black">{routeCalculation.distance} km</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium broski-medium">Durée estimée:</span>
                            <span className="font-semibold text-black">{routeCalculation.duration} min</span>
                          </div>
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-semibold text-black">Prix total:</span>
                            <span className="font-bold text-black text-xl">€ {routeCalculation.totalPrice}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={createBookingMutation.isPending || !routeCalculation || !selectedDate || !selectedTime}
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
