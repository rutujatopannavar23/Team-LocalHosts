import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alertsData } from "@/data/mockData";
import { AlertTriangle, CheckCircle2, Clock, ChevronDown, ChevronUp, Lightbulb, ArrowRight, Truck, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const severityConfig: Record<string, { bg: string; icon: string; label: string }> = {
  critical: { bg: "bg-red-100 border-red-300 text-red-900", icon: "🔴", label: "Critical" },
  high: { bg: "bg-red-50 border-red-200 text-red-800", icon: "🟠", label: "High" },
  medium: { bg: "bg-amber-50 border-amber-200 text-amber-800", icon: "🟡", label: "Medium" },
  low: { bg: "bg-green-50 border-green-200 text-green-800", icon: "🟢", label: "Low" },
};

const AlertsRecommendations = () => {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [filter, setFilter] = useState<string>("all");
  const [accepted, setAccepted] = useState<Set<number>>(new Set());
  const [showAlternatives, setShowAlternatives] = useState<number | null>(null);
  const { toast } = useToast();

  const filtered = alertsData.filter((a) => filter === "all" || a.severity === filter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Alerts & AI Recommendations</h2>
        <p className="text-sm text-muted-foreground mt-1">AI-powered supply chain disruption alerts with actionable recommendations</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["critical", "high", "medium", "low"].map((level) => {
          const count = alertsData.filter((a) => a.severity === level).length;
          return (
            <motion.button key={level} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setFilter(filter === level ? "all" : level)}
              className={`stat-card text-center cursor-pointer ${filter === level ? "ring-2 ring-primary" : ""}`}>
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground capitalize mt-1">{level}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "critical", "high", "medium", "low"].map((level) => (
          <button key={level} onClick={() => setFilter(level)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium border transition-colors capitalize ${filter === level ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}>
            {level === "all" ? `All (${alertsData.length})` : level}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filtered.map((alert) => {
          const cfg = severityConfig[alert.severity];
          const isExpanded = expanded === alert.id;
          return (
            <motion.div key={alert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout className={`rounded-xl border overflow-hidden ${cfg.bg}`}>
              {/* Header */}
              <button onClick={() => setExpanded(isExpanded ? null : alert.id)}
                className="w-full flex items-start gap-3 p-4 text-left">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-current/10">{cfg.label}</span>
                    <span className="text-xs opacity-60">{alert.timestamp}</span>
                  </div>
                  <h3 className="text-sm font-semibold">{alert.title}</h3>
                  <p className="text-xs opacity-75 mt-1">{alert.cause}</p>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 mt-1 shrink-0" /> : <ChevronDown className="w-4 h-4 mt-1 shrink-0" />}
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-4 pb-4 pt-0 space-y-4">
                      {/* Impact */}
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-card/50 border border-current/10">
                        <Clock className="w-4 h-4 mt-0.5 shrink-0 opacity-60" />
                        <div>
                          <p className="text-xs font-semibold">Impact Assessment</p>
                          <p className="text-xs opacity-75 mt-0.5">{alert.impact}</p>
                        </div>
                      </div>

                      {/* AI Recommendation */}
                      <div className="p-4 rounded-lg bg-card border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Lightbulb className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">AI Recommendation</h4>
                          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                            {alert.recommendation.confidence}% confidence
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-foreground">Suggested Action</p>
                              <p className="text-xs text-muted-foreground">{alert.recommendation.action}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Truck className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-foreground">Recommended Supplier</p>
                              <p className="text-xs text-muted-foreground">{alert.recommendation.supplier}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-foreground">Estimated Timeline</p>
                              <p className="text-xs text-muted-foreground">{alert.recommendation.eta}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          {accepted.has(alert.id) ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-100 text-green-800 border border-green-200">
                              <Check className="w-3.5 h-3.5" />
                              Recommendation Accepted
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setAccepted((prev) => new Set(prev).add(alert.id));
                                toast({ title: "Recommendation Accepted", description: `Action for "${alert.title}" has been initiated.` });
                              }}
                              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                              Accept Recommendation
                            </button>
                          )}
                          <button
                            onClick={() => setShowAlternatives(showAlternatives === alert.id ? null : alert.id)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${showAlternatives === alert.id ? "bg-accent border-primary/30 text-foreground" : "border-border text-foreground hover:bg-accent"}`}>
                            {showAlternatives === alert.id ? "Hide Alternatives" : "View Alternatives"}
                          </button>
                        </div>

                        <AnimatePresence>
                          {showAlternatives === alert.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border space-y-2">
                                <p className="text-xs font-semibold text-foreground">Alternative Actions</p>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2 p-2 rounded-md bg-card border border-border">
                                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                                    <div>
                                      <p className="text-xs font-medium text-foreground">Emergency air freight from backup supplier</p>
                                      <p className="text-[10px] text-muted-foreground">ETA: 2-3 days • Cost: +35% • Confidence: 62%</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 p-2 rounded-md bg-card border border-border">
                                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                                    <div>
                                      <p className="text-xs font-medium text-foreground">Redistribute stock from low-demand regions</p>
                                      <p className="text-[10px] text-muted-foreground">ETA: 4-5 days • Cost: +10% • Confidence: 74%</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 p-2 rounded-md bg-card border border-border">
                                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                                    <div>
                                      <p className="text-xs font-medium text-foreground">Negotiate expedited order with current supplier</p>
                                      <p className="text-[10px] text-muted-foreground">ETA: 7-10 days • Cost: +15% • Confidence: 58%</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsRecommendations;
