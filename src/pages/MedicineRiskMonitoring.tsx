import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { medicines, shortageForecasts } from "@/data/mockData";
import { Search, Filter, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const riskBadge: Record<string, string> = {
  low: "risk-low",
  medium: "risk-medium",
  high: "risk-high",
  critical: "bg-red-100 text-red-900 border-red-300",
};

const MedicineRiskMonitoring = () => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return medicines.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchRisk = riskFilter === "all" || m.risk === riskFilter;
      return matchSearch && matchRisk;
    });
  }, [search, riskFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Medicine Risk Monitoring</h2>
        <p className="text-sm text-muted-foreground mt-1">Track supply chain risk levels for critical medicines</p>
      </div>

      {/* Filters */}
      <div className="stat-card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search medicine or manufacturer..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["all", "low", "medium", "high", "critical"].map((level) => (
              <button key={level} onClick={() => setRiskFilter(level)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium border transition-colors capitalize ${riskFilter === level ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}>
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stat-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Medicine</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Manufacturer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">API Supplier</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Risk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Shortage Prob.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((med) => (
                <tr key={med.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{med.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{med.manufacturer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{med.apiSupplier}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize border ${riskBadge[med.risk]}`}>
                      {med.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-accent rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${med.shortageProbability}%`,
                          backgroundColor: med.shortageProbability > 70 ? "#ef4444" : med.shortageProbability > 40 ? "#f59e0b" : "#22c55e",
                        }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{med.shortageProbability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{med.stock.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="stat-card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">Shortage Probability Forecast</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={shortageForecasts}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="medicine" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="week1" name="Week 1" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="week2" name="Week 2" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="week3" name="Week 3" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="week4" name="Week 4" stroke="#991b1b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="stat-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Demand vs Stock Levels</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={medicines.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" name="Monthly Demand" fill="hsl(213, 80%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stock" name="Current Stock" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default MedicineRiskMonitoring;
