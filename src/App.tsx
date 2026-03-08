import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SupplyChainNetwork from "./pages/SupplyChainNetwork";
import IndiaRiskMap from "./pages/IndiaRiskMap";
import MedicineRiskMonitoring from "./pages/MedicineRiskMonitoring";
import AlertsRecommendations from "./pages/AlertsRecommendations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/network" element={<SupplyChainNetwork />} />
            <Route path="/risk-map" element={<IndiaRiskMap />} />
            <Route path="/medicines" element={<MedicineRiskMonitoring />} />
            <Route path="/alerts" element={<AlertsRecommendations />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
