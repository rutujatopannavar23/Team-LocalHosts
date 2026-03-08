export const dashboardStats = {
  totalMedicines: 1247,
  activeSuppliers: 342,
  highRiskAlerts: 23,
  predictedShortages: 8,
};

export const riskDistribution = [
  { name: "Low", value: 45, fill: "#22c55e" },
  { name: "Medium", value: 30, fill: "#f59e0b" },
  { name: "High", value: 18, fill: "#ef4444" },
  { name: "Critical", value: 7, fill: "#991b1b" },
];

export const supplierReliability = [
  { name: "Jan", reliability: 94, delays: 6 },
  { name: "Feb", reliability: 91, delays: 9 },
  { name: "Mar", reliability: 88, delays: 12 },
  { name: "Apr", reliability: 92, delays: 8 },
  { name: "May", reliability: 85, delays: 15 },
  { name: "Jun", reliability: 89, delays: 11 },
];

export const demandTrends = [
  { month: "Jan", paracetamol: 4200, amoxicillin: 3100, ibuprofen: 2800 },
  { month: "Feb", paracetamol: 4500, amoxicillin: 3300, ibuprofen: 2600 },
  { month: "Mar", paracetamol: 5100, amoxicillin: 3000, ibuprofen: 2900 },
  { month: "Apr", paracetamol: 4800, amoxicillin: 3500, ibuprofen: 3100 },
  { month: "May", paracetamol: 5500, amoxicillin: 3200, ibuprofen: 2700 },
  { month: "Jun", paracetamol: 6200, amoxicillin: 3800, ibuprofen: 3000 },
];

export const recentAlerts = [
  { id: 1, severity: "high" as const, message: "API supplier shutdown detected — Gujarat region", time: "2 hours ago", category: "Supplier" },
  { id: 2, severity: "high" as const, message: "Shipment delays at Mumbai Port — 72hr backlog", time: "4 hours ago", category: "Logistics" },
  { id: 3, severity: "critical" as const, message: "Paracetamol shortage predicted in 3 weeks", time: "6 hours ago", category: "Shortage" },
  { id: 4, severity: "medium" as const, message: "Amoxicillin demand spike detected in Delhi NCR", time: "8 hours ago", category: "Demand" },
  { id: 5, severity: "low" as const, message: "New supplier onboarded — BioChem Labs (Hyderabad)", time: "12 hours ago", category: "Supplier" },
];

export type SupplyChainNode = {
  id: string;
  label: string;
  type: "raw_material" | "api_manufacturer" | "drug_manufacturer" | "distributor" | "hospital";
  risk: "low" | "medium" | "high";
  x: number;
  y: number;
  details: { reliability: number; location: string; capacity: string };
};

export type SupplyChainEdge = {
  from: string;
  to: string;
};

export const supplyChainNodes: SupplyChainNode[] = [
  { id: "rm1", label: "ChemSource India", type: "raw_material", risk: "low", x: 80, y: 100, details: { reliability: 96, location: "Vadodara, Gujarat", capacity: "500 MT/month" } },
  { id: "rm2", label: "RawChem Ltd", type: "raw_material", risk: "medium", x: 80, y: 250, details: { reliability: 82, location: "Vizag, AP", capacity: "300 MT/month" } },
  { id: "rm3", label: "PureChem Corp", type: "raw_material", risk: "low", x: 80, y: 400, details: { reliability: 91, location: "Ankleshwar, Gujarat", capacity: "450 MT/month" } },
  { id: "api1", label: "Global API Ltd", type: "api_manufacturer", risk: "high", x: 280, y: 150, details: { reliability: 68, location: "Hyderabad, Telangana", capacity: "200 MT/month" } },
  { id: "api2", label: "BioChem Labs", type: "api_manufacturer", risk: "medium", x: 280, y: 350, details: { reliability: 79, location: "Baddi, HP", capacity: "150 MT/month" } },
  { id: "dm1", label: "Sun Pharma", type: "drug_manufacturer", risk: "high", x: 480, y: 100, details: { reliability: 72, location: "Mumbai, MH", capacity: "10M units/month" } },
  { id: "dm2", label: "Cipla", type: "drug_manufacturer", risk: "low", x: 480, y: 250, details: { reliability: 94, location: "Goa", capacity: "15M units/month" } },
  { id: "dm3", label: "Dr. Reddy's", type: "drug_manufacturer", risk: "medium", x: 480, y: 400, details: { reliability: 85, location: "Hyderabad, Telangana", capacity: "12M units/month" } },
  { id: "d1", label: "PharmaDist Co", type: "distributor", risk: "low", x: 680, y: 175, details: { reliability: 92, location: "Delhi NCR", capacity: "8M units/month" } },
  { id: "d2", label: "MedLogistics", type: "distributor", risk: "medium", x: 680, y: 350, details: { reliability: 81, location: "Chennai, TN", capacity: "5M units/month" } },
  { id: "h1", label: "AIIMS Delhi", type: "hospital", risk: "low", x: 880, y: 100, details: { reliability: 98, location: "New Delhi", capacity: "50K patients/month" } },
  { id: "h2", label: "Apollo Hospitals", type: "hospital", risk: "low", x: 880, y: 250, details: { reliability: 95, location: "Multiple Cities", capacity: "200K patients/month" } },
  { id: "h3", label: "Govt. District Hospital", type: "hospital", risk: "medium", x: 880, y: 400, details: { reliability: 76, location: "Tier 2 Cities", capacity: "30K patients/month" } },
];

export const supplyChainEdges: SupplyChainEdge[] = [
  { from: "rm1", to: "api1" }, { from: "rm2", to: "api1" }, { from: "rm2", to: "api2" },
  { from: "rm3", to: "api2" }, { from: "api1", to: "dm1" }, { from: "api1", to: "dm3" },
  { from: "api2", to: "dm2" }, { from: "api2", to: "dm3" }, { from: "dm1", to: "d1" },
  { from: "dm2", to: "d1" }, { from: "dm2", to: "d2" }, { from: "dm3", to: "d2" },
  { from: "d1", to: "h1" }, { from: "d1", to: "h2" }, { from: "d2", to: "h2" },
  { from: "d2", to: "h3" },
];

export type IndiaState = {
  name: string;
  risk: "low" | "medium" | "high";
  suppliers: number;
  disruptions: number;
  medicinesAffected: number;
  alerts: string[];
};

export const indiaStatesData: Record<string, IndiaState> = {
  "Gujarat": { name: "Gujarat", risk: "high", suppliers: 45, disruptions: 3, medicinesAffected: 12, alerts: ["API factory shutdown in Vadodara", "Chemical spill at Ankleshwar plant"] },
  "Maharashtra": { name: "Maharashtra", risk: "high", suppliers: 62, disruptions: 4, medicinesAffected: 18, alerts: ["Port congestion in Mumbai", "Warehouse flooding in Pune"] },
  "Telangana": { name: "Telangana", risk: "medium", suppliers: 38, disruptions: 1, medicinesAffected: 6, alerts: ["API production delay in Hyderabad"] },
  "Karnataka": { name: "Karnataka", risk: "low", suppliers: 28, disruptions: 0, medicinesAffected: 0, alerts: [] },
  "Tamil Nadu": { name: "Tamil Nadu", risk: "medium", suppliers: 31, disruptions: 2, medicinesAffected: 8, alerts: ["Cyclone warning — logistics risk", "Cold chain disruption in Chennai"] },
  "Delhi": { name: "Delhi", risk: "low", suppliers: 22, disruptions: 0, medicinesAffected: 0, alerts: [] },
  "Himachal Pradesh": { name: "Himachal Pradesh", risk: "medium", suppliers: 15, disruptions: 1, medicinesAffected: 4, alerts: ["Landslide blocked Baddi supply route"] },
  "Goa": { name: "Goa", risk: "low", suppliers: 8, disruptions: 0, medicinesAffected: 0, alerts: [] },
  "Assam": { name: "Assam", risk: "high", suppliers: 5, disruptions: 2, medicinesAffected: 9, alerts: ["Flood disruption in Guwahati", "Transport route blockage"] },
  "Andhra Pradesh": { name: "Andhra Pradesh", risk: "medium", suppliers: 20, disruptions: 1, medicinesAffected: 3, alerts: ["Raw material supply delay in Vizag"] },
  "Uttar Pradesh": { name: "Uttar Pradesh", risk: "low", suppliers: 18, disruptions: 0, medicinesAffected: 0, alerts: [] },
  "Rajasthan": { name: "Rajasthan", risk: "low", suppliers: 12, disruptions: 0, medicinesAffected: 0, alerts: [] },
  "West Bengal": { name: "West Bengal", risk: "medium", suppliers: 14, disruptions: 1, medicinesAffected: 5, alerts: ["Port delay at Kolkata"] },
  "Punjab": { name: "Punjab", risk: "low", suppliers: 10, disruptions: 0, medicinesAffected: 0, alerts: [] },
  "Madhya Pradesh": { name: "Madhya Pradesh", risk: "low", suppliers: 9, disruptions: 0, medicinesAffected: 0, alerts: [] },
};

export type Medicine = {
  id: number;
  name: string;
  manufacturer: string;
  apiSupplier: string;
  risk: "low" | "medium" | "high" | "critical";
  shortageProbability: number;
  demand: number;
  stock: number;
  category: string;
};

export const medicines: Medicine[] = [
  { id: 1, name: "Paracetamol", manufacturer: "Sun Pharma", apiSupplier: "Global API Ltd", risk: "high", shortageProbability: 82, demand: 6200, stock: 2100, category: "Analgesic" },
  { id: 2, name: "Amoxicillin", manufacturer: "Cipla", apiSupplier: "BioChem Labs", risk: "medium", shortageProbability: 45, demand: 3800, stock: 3200, category: "Antibiotic" },
  { id: 3, name: "Ibuprofen", manufacturer: "Dr. Reddy's", apiSupplier: "MedSource Chemicals", risk: "low", shortageProbability: 12, demand: 3000, stock: 5500, category: "NSAID" },
  { id: 4, name: "Metformin", manufacturer: "USV Ltd", apiSupplier: "Global API Ltd", risk: "high", shortageProbability: 78, demand: 4500, stock: 1800, category: "Antidiabetic" },
  { id: 5, name: "Azithromycin", manufacturer: "Alkem Labs", apiSupplier: "PharmaAPI Corp", risk: "medium", shortageProbability: 38, demand: 2200, stock: 2800, category: "Antibiotic" },
  { id: 6, name: "Omeprazole", manufacturer: "Torrent Pharma", apiSupplier: "BioChem Labs", risk: "low", shortageProbability: 8, demand: 1800, stock: 4200, category: "PPI" },
  { id: 7, name: "Ciprofloxacin", manufacturer: "Sun Pharma", apiSupplier: "MedSource Chemicals", risk: "medium", shortageProbability: 52, demand: 2600, stock: 2100, category: "Antibiotic" },
  { id: 8, name: "Losartan", manufacturer: "Cipla", apiSupplier: "Global API Ltd", risk: "critical", shortageProbability: 91, demand: 3900, stock: 900, category: "Antihypertensive" },
  { id: 9, name: "Amlodipine", manufacturer: "Dr. Reddy's", apiSupplier: "PharmaAPI Corp", risk: "low", shortageProbability: 15, demand: 2100, stock: 4800, category: "Antihypertensive" },
  { id: 10, name: "Cetirizine", manufacturer: "Alkem Labs", apiSupplier: "BioChem Labs", risk: "low", shortageProbability: 5, demand: 1500, stock: 6000, category: "Antihistamine" },
];

export const alertsData = [
  { id: 1, severity: "critical" as const, title: "Paracetamol shortage predicted in 3 weeks", cause: "API supplier shutdown in Gujarat — Global API Ltd ceased operations", impact: "6,200 units/month demand at risk", timestamp: "2026-03-08 09:15", recommendation: { action: "Switch to alternate API supplier in Telangana region", supplier: "India Pharma Labs, Hyderabad", eta: "5-7 business days for supply chain transition", confidence: 87 } },
  { id: 2, severity: "high" as const, title: "Antibiotic supply disruption risk", cause: "Shipping delay at Mumbai port — 72hr cargo backlog due to customs clearance issues", impact: "Amoxicillin and Ciprofloxacin supply chains affected", timestamp: "2026-03-08 07:30", recommendation: { action: "Reroute shipments through Nhava Sheva alternate terminal", supplier: "MedLogistics — Priority corridor available", eta: "48 hours for rerouting", confidence: 73 } },
  { id: 3, severity: "high" as const, title: "Losartan critical stock level", cause: "Demand spike of 40% in Northern India combined with API supply constraint", impact: "900 units remaining — estimated 6-day supply", timestamp: "2026-03-08 06:00", recommendation: { action: "Emergency procurement from secondary supplier and implement rationing protocol", supplier: "PharmaAPI Corp (Baddi facility)", eta: "10-12 days for restocking", confidence: 65 } },
  { id: 4, severity: "medium" as const, title: "Metformin supply chain vulnerability", cause: "Single-source API dependency on Global API Ltd (currently disrupted)", impact: "4,500 units/month demand, 1,800 in stock", timestamp: "2026-03-07 22:45", recommendation: { action: "Diversify API sourcing — qualify BioChem Labs as secondary supplier", supplier: "BioChem Labs, Baddi", eta: "3-4 weeks for qualification", confidence: 81 } },
  { id: 5, severity: "medium" as const, title: "Assam flood disruption — transport routes blocked", cause: "Severe flooding in Guwahati region blocking NH-27 supply corridor", impact: "5 suppliers, 9 medicines affected in NE region", timestamp: "2026-03-07 18:20", recommendation: { action: "Activate air freight contingency for essential medicines", supplier: "Indian Air Cargo Services", eta: "24-48 hours for emergency delivery", confidence: 78 } },
  { id: 6, severity: "low" as const, title: "New supplier qualification complete", cause: "India Pharma Labs passed GMP audit and quality certification", impact: "Adds redundancy for Paracetamol and Ibuprofen API supply", timestamp: "2026-03-07 14:00", recommendation: { action: "Integrate into supply chain network and begin trial orders", supplier: "India Pharma Labs, Hyderabad", eta: "Immediate availability", confidence: 95 } },
];

export const shortageForecasts = [
  { medicine: "Paracetamol", week1: 75, week2: 82, week3: 89, week4: 93 },
  { medicine: "Losartan", week1: 85, week2: 91, week3: 94, week4: 96 },
  { medicine: "Metformin", week1: 60, week2: 72, week3: 78, week4: 82 },
  { medicine: "Ciprofloxacin", week1: 35, week2: 45, week3: 52, week4: 58 },
  { medicine: "Amoxicillin", week1: 30, week2: 38, week3: 45, week4: 50 },
];
