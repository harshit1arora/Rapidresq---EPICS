import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SOS from "./pages/SOS";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import OperatorDashboard from "./pages/OperatorDashboard";
import DriverApp from "./pages/DriverApp";
import HospitalDashboard from "./pages/HospitalDashboard";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import ForDoctors from "./pages/ForDoctors";
import OurClients from "./pages/OurClients";
import ABHA from "./pages/ABHA";
import Careers from "./pages/Careers";
import News from "./pages/News";
import VideoConsultation from "./pages/VideoConsultation";
import VideoCall from "./pages/VideoCall";
import HealthCards from "./pages/HealthCards";
import Prescriptions from "./pages/Prescriptions";
import CreatePrescription from "./pages/CreatePrescription";
import MyMedicines from "./pages/MyMedicines";
import NotFound from "./pages/NotFound";
import FloatingSOSButton from "./components/FloatingSOSButton";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotificationWrapper } from "./components/NotificationWrapper";
import BloodDonors from "./pages/BloodDonors";
import AITriage from "./pages/AITriage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationWrapper>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/doctors" element={<ForDoctors />} />
          <Route path="/clients" element={<OurClients />} />
          <Route path="/news" element={<News />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blood-donors" element={<BloodDonors />} />
          <Route path="/triage" element={<AITriage />} />

          {/* User Protected Routes */}
          <Route path="/sos" element={<ProtectedRoute><SOS /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/abha" element={<ProtectedRoute><ABHA /></ProtectedRoute>} />
          <Route path="/video-consultation" element={<ProtectedRoute><VideoConsultation /></ProtectedRoute>} />
          <Route path="/video-call/:consultationId" element={<ProtectedRoute><VideoCall /></ProtectedRoute>} />
          <Route path="/video-call" element={<ProtectedRoute><VideoCall /></ProtectedRoute>} />
          <Route path="/health-cards" element={<ProtectedRoute><HealthCards /></ProtectedRoute>} />
          <Route path="/prescriptions" element={<ProtectedRoute><Prescriptions /></ProtectedRoute>} />
          <Route path="/my-medicines" element={<ProtectedRoute><MyMedicines /></ProtectedRoute>} />

          {/* Role Protected Routes */}
          <Route 
            path="/operator-dashboard" 
            element={<ProtectedRoute allowedRoles={['operator', 'admin']}><OperatorDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/driver" 
            element={<ProtectedRoute allowedRoles={['driver', 'admin']}><DriverApp /></ProtectedRoute>} 
          />
          <Route 
            path="/hospital" 
            element={<ProtectedRoute allowedRoles={['hospital', 'admin']}><HospitalDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/create-prescription" 
            element={<ProtectedRoute allowedRoles={['doctor', 'admin']}><CreatePrescription /></ProtectedRoute>} 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingSOSButton />
      </BrowserRouter>
      </NotificationWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
