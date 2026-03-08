import { useState } from "react";
import { motion } from "framer-motion";
import { supplyChainNodes, supplyChainEdges, SupplyChainNode } from "@/data/mockData";
import { X, MapPin, Gauge, Package } from "lucide-react";

const nodeColors: Record<string, string> = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

const typeLabels: Record<string, string> = {
  raw_material: "Raw Material Supplier",
  api_manufacturer: "API Manufacturer",
  drug_manufacturer: "Drug Manufacturer",
  distributor: "Distributor",
  hospital: "Hospital",
};

const typeIcons: Record<string, string> = {
  raw_material: "⚗️",
  api_manufacturer: "🧪",
  drug_manufacturer: "💊",
  distributor: "🚚",
  hospital: "🏥",
};

const SupplyChainNetwork = () => {
  const [selected, setSelected] = useState<SupplyChainNode | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Supply Chain Network</h2>
        <p className="text-sm text-muted-foreground mt-1">Interactive pharmaceutical supply chain graph visualization</p>
      </div>

      {/* Legend */}
      <div className="stat-card">
        <div className="flex flex-wrap gap-6">
          {Object.entries(typeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-base">{typeIcons[key]}</span>
              {label}
            </div>
          ))}
          <div className="ml-auto flex gap-4">
            {Object.entries(nodeColors).map(([level, color]) => (
              <div key={level} className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                {level} Risk
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph */}
        <div className="lg:col-span-2 stat-card p-0 overflow-hidden">
          <svg viewBox="0 0 980 500" className="w-full h-auto" style={{ minHeight: 400 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(215, 15%, 70%)" />
              </marker>
            </defs>
            {/* Edges */}
            {supplyChainEdges.map((edge, i) => {
              const from = supplyChainNodes.find((n) => n.id === edge.from)!;
              const to = supplyChainNodes.find((n) => n.id === edge.to)!;
              return (
                <line key={i} x1={from.x + 40} y1={from.y} x2={to.x - 10} y2={to.y}
                  stroke="hsl(215, 15%, 80%)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={0.6} />
              );
            })}
            {/* Nodes */}
            {supplyChainNodes.map((node) => (
              <g key={node.id} className="cursor-pointer" onClick={() => setSelected(node)}>
                <circle cx={node.x} cy={node.y} r={selected?.id === node.id ? 28 : 22}
                  fill={nodeColors[node.risk]} opacity={0.15} stroke={nodeColors[node.risk]} strokeWidth={2} />
                <circle cx={node.x} cy={node.y} r={14} fill={nodeColors[node.risk]} />
                <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="white">
                  {typeIcons[node.type]}
                </text>
                <text x={node.x} y={node.y + 30} textAnchor="middle" fontSize="9" fill="hsl(215, 15%, 40%)" fontWeight="500">
                  {node.label}
                </text>
              </g>
            ))}
            {/* Column headers */}
            {[
              { x: 80, label: "Raw Materials" },
              { x: 280, label: "API Mfg" },
              { x: 480, label: "Drug Mfg" },
              { x: 680, label: "Distribution" },
              { x: 880, label: "Hospitals" },
            ].map((h) => (
              <text key={h.label} x={h.x} y={30} textAnchor="middle" fontSize="11" fill="hsl(215, 15%, 50%)" fontWeight="600">
                {h.label}
              </text>
            ))}
          </svg>
        </div>

        {/* Detail panel */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{typeLabels[selected.type]}</p>
                  <h3 className="text-lg font-bold text-foreground mt-1">{selected.label}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-accent">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${selected.risk === "low" ? "risk-low" : selected.risk === "medium" ? "risk-medium" : "risk-high"}`}>
                {selected.risk} Risk
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{selected.details.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                  <span>Reliability: <strong>{selected.details.reliability}%</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span>Capacity: {selected.details.capacity}</span>
                </div>
              </div>
              {/* Reliability bar */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Reliability Score</span>
                  <span>{selected.details.reliability}%</span>
                </div>
                <div className="h-2 bg-accent rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${selected.details.reliability}%`,
                    backgroundColor: selected.details.reliability > 90 ? "#22c55e" : selected.details.reliability > 75 ? "#f59e0b" : "#ef4444",
                  }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-3">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select a Node</p>
              <p className="text-xs text-muted-foreground mt-1">Click any node in the network to view supplier details and risk assessment</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SupplyChainNetwork;
