import { motion } from "framer-motion";
import { Pill, Users, AlertTriangle, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { dashboardStats, riskDistribution, supplierReliability, demandTrends, recentAlerts } from "@/data/mockData";

const statCards = [
  { label: "Total Medicines Tracked", value: dashboardStats.totalMedicines, icon: Pill, trend: "+12", up: true },
  { label: "Active Suppliers", value: dashboardStats.activeSuppliers, icon: Users, trend: "+5", up: true },
  { label: "High Risk Alerts", value: dashboardStats.highRiskAlerts, icon: AlertTriangle, trend: "+3", up: false },
  { label: "Predicted Shortages", value: dashboardStats.predictedShortages, icon: TrendingDown, trend: "+2", up: false },
];

const severityStyles: Record<string, string> = {
  low: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-red-50 text-red-700 border-red-200",
  critical: "bg-red-100 text-red-900 border-red-300",
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time pharmaceutical supply chain intelligence</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{card.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{card.value.toLocaleString()}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${i < 2 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              {card.up ? <ArrowUpRight className="w-3 h-3 text-risk-low" /> : <ArrowDownRight className="w-3 h-3 text-destructive" />}
              <span className={card.up ? "text-risk-low" : "text-destructive"}>{card.trend}</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {riskDistribution.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {riskDistribution.map((r) => (
              <div key={r.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.fill }} />
                {r.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Supplier reliability */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Supplier Reliability Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={supplierReliability}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Bar dataKey="reliability" fill="hsl(213, 80%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="delays" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Demand trends */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Medicine Demand Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={demandTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="paracetamol" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="amoxicillin" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ibuprofen" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Alerts */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${severityStyles[alert.severity]}`}>
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1 text-xs opacity-75">
                  <span>{alert.category}</span>
                  <span>•</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
