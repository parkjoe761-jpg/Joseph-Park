import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Report, Severity } from '../types';
import { cn } from '../lib/utils';

interface MapViewProps {
  reports: Report[];
  onReportIssue: () => void;
  onReportDetail: (report: Report) => void;
}

export const MapView: React.FC<MapViewProps> = ({ reports, onReportIssue, onReportDetail }) => {
  const [heatVisible, setHeatVisible] = useState(true);

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-forest">Pollution Map</h2>
          <p className="text-sm text-sage/60">Live community reports — heatmap view</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setHeatVisible(!heatVisible)}>
            🌡️ {heatVisible ? 'Hide' : 'Show'} Heatmap
          </Button>
          <Button variant="acid" onClick={onReportIssue}>＋ Report Issue</Button>
        </div>
      </div>

      <div className="relative h-[440px] rounded-3xl overflow-hidden border border-forest/10 bg-[#e8f5e9] cursor-crosshair">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8e6c9] via-[#a5d6a7] to-[#81c784]">
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '120px 120px' }} />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Heat Layer */}
          <div className={cn("absolute inset-0 transition-opacity duration-500", heatVisible ? "opacity-100" : "opacity-0")}>
            <div className="absolute w-48 h-48 left-[35%] top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust/40 blur-3xl" />
            <div className="absolute w-40 h-40 left-[65%] top-[25%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/35 blur-3xl" />
            <div className="absolute w-32 h-32 left-[20%] top-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/28 blur-3xl" />
            <div className="absolute w-24 h-24 left-[75%] top-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/35 blur-3xl" />
            <div className="absolute w-20 h-20 left-[48%] top-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/25 blur-3xl" />
          </div>

          {/* Pins */}
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => onReportDetail(report)}
              className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 z-10"
              style={{ left: `${report.lng}%`, top: `${report.lat}%` }}
            >
              <div className={cn(
                "w-8 h-8 rounded-full rounded-bl-none rotate-[-45deg] flex items-center justify-center shadow-xl border-2 border-white",
                report.severity === 'Critical' ? 'bg-rust' : 
                report.severity === 'High' ? 'bg-amber' : 
                report.severity === 'Medium' ? 'bg-lime' : 'bg-sky'
              )}>
                <span className="rotate-[45deg] text-sm">{report.icon}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          {heatVisible && <span className="bg-acid text-forest text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">🔥 Active Heatmap</span>}
          <span className="bg-forest text-acid text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">Click to add pin</span>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 text-[11px] space-y-1.5 shadow-xl border border-white/20">
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-rust" /> Critical</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber" /> High</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-lime" /> Medium</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-sky" /> Event</div>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="font-display text-xl font-bold text-forest">All Reports</h3>
        <div className="card space-y-0 divide-y divide-forest/5 p-0 overflow-hidden">
          {reports.map((report) => (
            <div key={report.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-cream/30 transition-colors">
              <div className="flex gap-4 flex-1 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-sand flex items-center justify-center text-2xl shrink-0">
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base truncate">{report.title}</h4>
                  <p className="text-sm text-sage/60 mb-2">📍 {report.location}</p>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-0.5 rounded-full",
                      report.severity === 'Critical' ? 'bg-rust/10 text-rust' : 
                      report.severity === 'High' ? 'bg-amber/10 text-amber-800' : 
                      report.severity === 'Medium' ? 'bg-lime/10 text-lime-800' : 'bg-sky/10 text-sky-800'
                    )}>
                      {report.severity}
                    </span>
                    <span className="text-[10px] text-sage/40">Reported {report.timestamp} · {report.confirmations} confirmations</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">Create Event</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
