import { db } from "@/db";
import { behavioralSignals } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Activity, AlertTriangle, CheckCircle2, Terminal } from "lucide-react";

export const dynamic = "force-dynamic";

function getPayloadAction(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const action = (payload as { action?: unknown }).action;
  return typeof action === "string" ? action : null;
}

export default async function LaboratoryDashboard() {
  const latestSignals = await db.select()
    .from(behavioralSignals)
    .orderBy(desc(behavioralSignals.createdAt))
    .limit(50);

  const stats = {
    total: latestSignals.length,
    frictionEvents: latestSignals.filter((signal) => {
      const action = getPayloadAction(signal.payload);
      return action?.includes("detected") ?? false;
    }).length,
    conversions: latestSignals.filter(s => s.topic === "conversion").length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-on-surface">Analytics Laboratory</h1>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest mt-1">Genesis v5 Telemetry Control Plane</p>
        </div>
        <div className="flex gap-4">
          <a href="/api/v5/reports/signals" target="_blank" className="bg-surface border border-outline px-4 py-2 text-xs font-bold uppercase tracking-widest text-on-surface flex items-center gap-2 hover:border-accent transition-colors">
            <Terminal className="w-4 h-4" /> Export JSON-L
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 border border-outline border-l-4 border-l-accent relative overflow-hidden">
          <Activity className="w-8 h-8 text-accent/20 absolute -bottom-2 -right-2" />
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Total Signals (Recent)</p>
          <p className="text-4xl font-black text-on-surface font-mono">{stats.total}</p>
        </div>
        <div className="bg-surface p-6 border border-outline border-l-4 border-l-yellow-500 relative overflow-hidden">
          <AlertTriangle className="w-8 h-8 text-yellow-500/20 absolute -bottom-2 -right-2" />
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Friction Events</p>
          <p className="text-4xl font-black text-on-surface font-mono">{stats.frictionEvents}</p>
        </div>
        <div className="bg-surface p-6 border border-outline border-l-4 border-l-green-500 relative overflow-hidden">
          <CheckCircle2 className="w-8 h-8 text-green-500/20 absolute -bottom-2 -right-2" />
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Conversion Steps</p>
          <p className="text-4xl font-black text-on-surface font-mono">{stats.conversions}</p>
        </div>
      </div>

      {/* Signal Stream */}
      <div className="bg-surface border border-outline">
        <div className="p-4 border-b border-outline bg-surface/50">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface">Live Signal Stream</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-outline text-[10px] uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="p-4 font-bold">Timestamp</th>
                <th className="p-4 font-bold">Topic</th>
                <th className="p-4 font-bold">Source</th>
                <th className="p-4 font-bold">Action</th>
                <th className="p-4 font-bold">Payload Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline">
              {latestSignals.map(signal => {
                const payload = signal.payload;
                const action = getPayloadAction(payload) ?? "unknown";
                
                return (
                  <tr key={signal.signalId} className="hover:bg-accent/5 transition-colors font-mono text-xs">
                    <td className="p-4 text-on-surface-variant whitespace-nowrap">
                      {new Date(signal.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 border text-[10px] uppercase tracking-wider ${
                        signal.topic === 'conversion' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                        signal.topic === 'compliance' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                        'bg-outline text-on-surface-variant'
                      }`}>
                        {signal.topic}
                      </span>
                    </td>
                    <td className="p-4 text-on-surface">{signal.source}</td>
                    <td className="p-4 font-bold text-accent">{action}</td>
                    <td className="p-4 text-on-surface-variant truncate max-w-xs">
                      {JSON.stringify(payload)}
                    </td>
                  </tr>
                );
              })}
              {latestSignals.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant text-sm">
                    No signals recorded yet. Use the Audit Wizard or Calculator to generate telemetry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
