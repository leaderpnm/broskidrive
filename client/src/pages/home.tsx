import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import BookingForm from "@/components/booking-form";
import ServicesSection from "@/components/services-section";
import PricingSection from "@/components/pricing-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BookingForm />
      <ServicesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
