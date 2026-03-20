import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { EmergencyServices } from "@/components/EmergencyServices";
import { ABHACard } from "@/components/ABHACard";
import { AIAssistant } from "@/components/AIAssistant";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <EmergencyServices />
      <ABHACard />
      <AIAssistant />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
