import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 1 23 45 67 89"
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@broskidrive.fr"
  },
  {
    icon: MapPin,
    title: "Zone de service",
    value: "Île-de-France et régions limitrophes"
  },
  {
    icon: Clock,
    title: "Disponibilité",
    value: "24h/24, 7j/7"
  }
];

export default function ContactSection() {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      reset();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    sendMessageMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-black mb-4">Contactez-nous</h3>
          <p className="text-lg broski-medium max-w-2xl mx-auto">
            Une question ? Un besoin spécifique ? Nous sommes à votre écoute 24h/24
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-black mb-6">Informations de contact</h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <Icon className="w-6 h-6 broski-medium mr-4" />
                      <div>
                        <div className="font-medium text-black">{info.title}</div>
                        <div className="broski-medium">{info.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <h5 className="font-semibold text-black mb-3">Réservation d'urgence</h5>
                <p className="broski-medium text-sm mb-4">
                  Besoin d'un chauffeur immédiatement ? Appelez-nous directement pour une prise en charge rapide.
                </p>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Appeler maintenant
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-black mb-6">Envoyez-nous un message</h4>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-black">Prénom</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className="mt-2 bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-black focus:border-black"
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-black">Nom</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className="mt-2 bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-black focus:border-black"
                        placeholder="Votre nom"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-black">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-2 bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-black focus:border-black"
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-black">Téléphone</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="mt-2 bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-black focus:border-black"
                      placeholder="+33 1 23 45 67 89"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-black">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      className="mt-2 bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-black focus:border-black"
                      placeholder="Décrivez votre besoin..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={sendMessageMutation.isPending}
                    className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-4 h-auto"
                  >
                    {sendMessageMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
