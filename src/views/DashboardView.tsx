import React from 'react';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { Report, Severity } from '../types';
import { cn } from '../lib/utils';

interface DashboardViewProps {
  reports: Report[];
  onViewMap: () => void;
  onReportDetail: (report: Report) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ reports, onViewMap, onReportDetail }) => {
  const getSeverityClass = (severity: Severity) => {
    switch (severity) {
      case 'Critical': return 'bg-rust/10 text-rust';
      case 'High': return 'bg-amber/10 text-amber-800';
      case 'Medium': return 'bg-lime/10 text-lime-800';
      case 'Low': return 'bg-sky/10 text-sky-800';
    }
  };

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard icon="📍" label="Active Reports" value={47} subText="+12 this week" />
        <StatCard icon="🧹" label="Events This Month" value={8} subText="3 upcoming" />
        <StatCard icon="👥" label="Volunteers This Week" value={134} subText="Skokie community" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Map Preview */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-forest">Hotspot Map</h2>
              <p className="text-sm text-sage/60">Click a pin to see details</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onViewMap}>View Full Map</Button>
          </div>
          
          <div className="relative h-[380px] rounded-2xl overflow-hidden border border-forest/10 bg-[#e8f5e9]">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8e6c9] via-[#a5d6a7] to-[#81c784]">
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              {/* Heat Spots */}
              <div className="absolute w-36 h-36 left-[35%] top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust/30 blur-2xl" />
              <div className="absolute w-24 h-24 left-[65%] top-[25%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/30 blur-2xl" />
              <div className="absolute w-20 h-20 left-[20%] top-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/25 blur-2xl" />

              {/* Pins */}
              {reports.slice(0, 4).map((report) => (
                <button
                  key={report.id}
                  onClick={() => onReportDetail(report)}
                  className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 z-10"
                  style={{ left: `${report.lng}%`, top: `${report.lat}%` }}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full rounded-bl-none rotate-[-45deg] flex items-center justify-center shadow-lg",
                    report.severity === 'Critical' ? 'bg-rust' : 
                    report.severity === 'High' ? 'bg-amber' : 
                    report.severity === 'Medium' ? 'bg-lime' : 'bg-sky'
                  )}>
                    <span className="rotate-[45deg] text-xs">{report.icon}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-acid text-forest text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">🔥 4 Hotspots</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 text-[10px] space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rust" /> Critical</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber" /> High</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-lime" /> Medium</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-sky" /> Event</div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-forest">Recent Reports</h2>
              <p className="text-sm text-sage/60">Community submissions</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onViewMap}>See All</Button>
          </div>

          <div className="card space-y-0 divide-y divide-forest/5 p-0 overflow-hidden">
            {reports.map((report) => (
              <div key={report.id} className="flex gap-4 p-4 hover:bg-cream/30 transition-colors cursor-pointer" onClick={() => onReportDetail(report)}>
                <div className="w-14 h-14 rounded-xl bg-sand flex items-center justify-center text-2xl shrink-0">
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{report.title}</h3>
                  <p className="text-xs text-sage/60 mb-2">📍 {report.location}</p>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", getSeverityClass(report.severity))}>
                      {report.severity}
                    </span>
                    <span className="text-[10px] text-sage/40">{report.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Progress */}
      <div className="space-y-5">
        <h2 className="font-display text-xl font-bold text-forest">Community Progress</h2>
        <div className="card">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0">
              <div className="text-[11px] font-bold tracking-widest text-sage uppercase mb-2">🏙️ Skokie City Score</div>
              <div className="font-display text-5xl font-black text-forest leading-none">2,840</div>
              <div className="text-xs text-sage/60 mt-3">cleanup points this month</div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="text-[11px] font-bold tracking-widest text-sage uppercase mb-2">Monthly Goals</div>
              <div className="space-y-3">
                {[
                  { label: 'Events Completed', current: 8, total: 10, color: 'bg-lime' },
                  { label: 'Areas Cleaned', current: 14, total: 20, color: 'bg-lime' },
                  { label: 'Volunteers Engaged', current: 134, total: 200, color: 'bg-lime' },
                ].map((goal) => (
                  <div key={goal.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span>{goal.label}</span>
                      <span className="font-bold">{goal.current}/{goal.total}</span>
                    </div>
                    <div className="h-1.5 bg-sand rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", goal.color)} 
                        style={{ width: `${(goal.current / goal.total) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 space-y-2.5">
              <div className="text-[11px] font-bold tracking-widest text-sage uppercase mb-2">🌟 Your Stats</div>
              <div className="flex flex-col gap-2">
                <span className="bg-forest text-acid text-[11px] font-bold px-3 py-1.5 rounded-full">🧹 12 Events Joined</span>
                <span className="bg-forest text-acid text-[11px] font-bold px-3 py-1.5 rounded-full">⏱️ 48 Volunteer Hours</span>
                <span className="bg-forest text-acid text-[11px] font-bold px-3 py-1.5 rounded-full">🏅 320 Points Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
