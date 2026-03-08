import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { indiaStatesData, IndiaState } from "@/data/mockData";
import { AlertTriangle, MapPin, Pill, Factory, X } from "lucide-react";

const riskColors: Record<string, string> = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };

// Simplified India state positions for a schematic map
const statePositions: Record<string, { x: number; y: number }> = {
  "Delhi": { x: 220, y: 140 },
  "Rajasthan": { x: 160, y: 180 },
  "Gujarat": { x: 110, y: 250 },
  "Maharashtra": { x: 170, y: 310 },
  "Goa": { x: 160, y: 370 },
  "Karnataka": { x: 180, y: 400 },
  "Tamil Nadu": { x: 220, y: 460 },
  "Telangana": { x: 230, y: 340 },
  "Andhra Pradesh": { x: 260, y: 390 },
  "Madhya Pradesh": { x: 230, y: 230 },
  "Uttar Pradesh": { x: 270, y: 160 },
  "West Bengal": { x: 360, y: 220 },
  "Assam": { x: 420, y: 160 },
  "Punjab": { x: 190, y: 100 },
  "Himachal Pradesh": { x: 230, y: 80 },
};

const IndiaRiskMap = () => {
  const [hoveredState, setHoveredState] = useState<IndiaState | null>(null);
  const [selectedState, setSelectedState] = useState<IndiaState | null>(null);

  const allAlerts = Object.values(indiaStatesData).flatMap((s) => s.alerts.map((a) => ({ state: s.name, alert: a, risk: s.risk })));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">India Risk Map</h2>
        <p className="text-sm text-muted-foreground mt-1">Regional supply chain risk monitoring across India</p>
      </div>

      {/* Legend */}
      <div className="stat-card">
        <div className="flex flex-wrap gap-6 items-center">
          <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Risk Levels:</span>
          {Object.entries(riskColors).map(([level, color]) => (
            <div key={level} className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              {level}
            </div>
          ))}
          <div className="ml-auto text-xs text-muted-foreground">
            {Object.keys(indiaStatesData).length} states monitored • {allAlerts.length} active alerts
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Map */}
        <div className="lg:col-span-3 stat-card p-0 overflow-hidden relative">
          <svg viewBox="0 0 500 540" className="w-full h-auto" style={{ minHeight: 450 }}>
            {/* India outline (simplified) */}
            <path d="M180,40 L250,30 L320,50 L380,80 L440,130 L450,170 L420,200 L390,190 L370,230 L340,260 L300,300 L280,350 L260,380 L240,420 L230,470 L210,500 L190,480 L170,440 L150,400 L130,360 L110,300 L100,260 L90,220 L110,180 L140,130 L160,80 Z"
              fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.5" />

            {/* State nodes */}
            {Object.entries(statePositions).map(([name, pos]) => {
              const state = indiaStatesData[name];
              if (!state) return null;
              const isActive = hoveredState?.name === name || selectedState?.name === name;
              return (
                <g key={name} className="cursor-pointer"
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(state)}>
                  {/* Pulse ring for high risk */}
                  {state.risk === "high" && (
                    <circle cx={pos.x} cy={pos.y} r={isActive ? 24 : 20} fill="none" stroke={riskColors[state.risk]} strokeWidth="1" opacity="0.3">
                      <animate attributeName="r" values={isActive ? "24;30;24" : "20;26;20"} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={pos.x} cy={pos.y} r={isActive ? 18 : 14} fill={riskColors[state.risk]} opacity={0.2} stroke={riskColors[state.risk]} strokeWidth={isActive ? 2.5 : 1.5} />
                  <circle cx={pos.x} cy={pos.y} r={isActive ? 8 : 6} fill={riskColors[state.risk]} />
                  <text x={pos.x} y={pos.y + (isActive ? 28 : 24)} textAnchor="middle" fontSize={isActive ? "10" : "8"} fill="hsl(var(--foreground))" fontWeight={isActive ? "600" : "400"}>
                    {name}
                  </text>
                  {state.disruptions > 0 && (
                    <text x={pos.x + 12} y={pos.y - 12} textAnchor="middle" fontSize="10">⚠️</text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredState && !selectedState && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-[220px]">
                <h4 className="text-sm font-bold text-foreground">{hoveredState.name}</h4>
                <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>Suppliers:</span><strong className="text-foreground">{hoveredState.suppliers}</strong></div>
                  <div className="flex justify-between"><span>Disruptions:</span><strong className="text-foreground">{hoveredState.disruptions}</strong></div>
                  <div className="flex justify-between"><span>Medicines affected:</span><strong className="text-foreground">{hoveredState.medicinesAffected}</strong></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected state detail */}
          {selectedState ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">State Detail</p>
                  <h3 className="text-lg font-bold text-foreground">{selectedState.name}</h3>
                </div>
                <button onClick={() => setSelectedState(null)} className="p-1 rounded hover:bg-accent"><X className="w-4 h-4" /></button>
              </div>
              <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize border mb-4 ${selectedState.risk === "low" ? "risk-low" : selectedState.risk === "medium" ? "risk-medium" : "risk-high"}`}>
                {selectedState.risk} Risk
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-accent/50 rounded-lg">
                  <Factory className="w-4 h-4 mx-auto text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground mt-1">{selectedState.suppliers}</p>
                  <p className="text-[10px] text-muted-foreground">Suppliers</p>
                </div>
                <div className="text-center p-2 bg-accent/50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 mx-auto text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground mt-1">{selectedState.disruptions}</p>
                  <p className="text-[10px] text-muted-foreground">Disruptions</p>
                </div>
                <div className="text-center p-2 bg-accent/50 rounded-lg">
                  <Pill className="w-4 h-4 mx-auto text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground mt-1">{selectedState.medicinesAffected}</p>
                  <p className="text-[10px] text-muted-foreground">Affected</p>
                </div>
              </div>
              {selectedState.alerts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Active Alerts</p>
                  {selectedState.alerts.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-destructive/5 border border-destructive/10 text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-foreground">{a}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="stat-card flex flex-col items-center justify-center h-48 text-center">
              <MapPin className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Select a State</p>
              <p className="text-xs text-muted-foreground mt-1">Click any state on the map to view details</p>
            </div>
          )}

          {/* All alerts feed */}
          <div className="stat-card max-h-80 overflow-auto">
            <h3 className="text-sm font-semibold text-foreground mb-3">All Regional Alerts</h3>
            <div className="space-y-2">
              {allAlerts.length === 0 && <p className="text-xs text-muted-foreground">No active alerts</p>}
              {allAlerts.map((a, i) => (
                <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs ${a.risk === "high" ? "risk-high" : a.risk === "medium" ? "risk-medium" : "risk-low"}`}>
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{a.alert}</p>
                    <p className="opacity-70 mt-0.5">{a.state}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaRiskMap;
