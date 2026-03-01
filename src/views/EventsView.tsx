import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Event } from '../types';
import { cn } from '../lib/utils';
import { Calendar, MapPin, Target } from 'lucide-react';

interface EventsViewProps {
  events: Event[];
  onJoinEvent: (eventId: string) => void;
  onEventDetail: (event: Event) => void;
  onCreateEvent: () => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, onJoinEvent, onEventDetail, onCreateEvent }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'map' | 'completed'>('list');

  const getStatusClass = (status: Event['status']) => {
    switch (status) {
      case 'Upcoming': return 'bg-acid text-forest';
      case 'In Progress': return 'bg-sky text-sky-900';
      case 'Completed': return 'bg-white/20 text-white';
    }
  };

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-forest">Community Events</h2>
          <p className="text-sm text-sage/60">Find and join cleanup events near you</p>
        </div>
        <Button variant="acid" onClick={onCreateEvent}>＋ Create Event</Button>
      </div>

      <div className="flex gap-1 bg-sand p-1 rounded-xl w-fit">
        {[
          { id: 'list', label: '📋 List View' },
          { id: 'map', label: '🗺️ Map View' },
          { id: 'completed', label: '✅ Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id ? "bg-white text-forest shadow-sm" : "text-sage/60 hover:text-forest"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-2xl border border-forest/10 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10 cursor-pointer flex flex-col"
              onClick={() => onEventDetail(event)}
            >
              <div className="relative h-28 shrink-0">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  event.severity === 'Critical' ? 'from-forest to-moss' : 
                  event.severity === 'High' ? 'from-sky-900 to-sky-700' : 'from-lime-900 to-lime-700'
                )} />
                <span className={cn("absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase", getStatusClass(event.status))}>
                  {event.status}
                </span>
                <div className="absolute bottom-3 left-4 font-display text-lg font-bold text-white">
                  {event.title}
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="space-y-2 mb-5 flex-1">
                  <div className="flex items-center gap-2 text-xs text-sage/60">
                    <Calendar size={14} /> {event.date} · {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-sage/60">
                    <MapPin size={14} /> {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-sage/60">
                    <Target size={14} /> {event.severity} hotspot · Est. {event.targetHours} hours
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {event.members.slice(0, 3).map((initials, i) => (
                      <div 
                        key={i} 
                        className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: `hsl(${i * 60 + 120}, 40%, 40%)` }}
                      >
                        {initials}
                      </div>
                    ))}
                    {event.volunteers > 3 && (
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-sand flex items-center justify-center text-[10px] font-bold text-sage">
                        +{event.volunteers - 3}
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="acid" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinEvent(event.id);
                    }}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'map' && (
        <div className="rounded-3xl overflow-hidden border border-forest/10 bg-[#e8f5e9] h-[400px] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c8e6c9] via-[#a5d6a7] to-[#81c784]">
            <div className="absolute w-40 h-40 left-[35%] top-[45%] rounded-full bg-sky/30 blur-3xl" />
            <div className="absolute w-24 h-24 left-[60%] top-[25%] rounded-full bg-sky/20 blur-3xl" />
            
            <div className="absolute left-[35%] top-[45%] -translate-x-1/2 -translate-y-full">
              <div className="w-8 h-8 rounded-full rounded-bl-none rotate-[-45deg] bg-sky flex items-center justify-center shadow-lg border-2 border-white">
                <span className="rotate-[45deg] text-sm">📅</span>
              </div>
            </div>
            <div className="absolute left-[60%] top-[25%] -translate-x-1/2 -translate-y-full">
              <div className="w-8 h-8 rounded-full rounded-bl-none rotate-[-45deg] bg-sky flex items-center justify-center shadow-lg border-2 border-white">
                <span className="rotate-[45deg] text-sm">📅</span>
              </div>
            </div>
            <div className="absolute left-[50%] top-[65%] -translate-x-1/2 -translate-y-full">
              <div className="w-8 h-8 rounded-full rounded-bl-none rotate-[-45deg] bg-sky flex items-center justify-center shadow-lg border-2 border-white">
                <span className="rotate-[45deg] text-sm">📅</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-white text-forest text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">3 Events Nearby</span>
          </div>
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="card space-y-0 divide-y divide-forest/5 p-0 overflow-hidden">
          {[
            { title: 'Dempster St. Park Cleanup', loc: 'Dempster St, Skokie · Feb 22', stats: '18 volunteers · 3.2 tons removed' },
            { title: 'Howard Street Sweep', loc: 'Howard St, Skokie · Feb 15', stats: '32 volunteers · 5.1 tons removed' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 hover:bg-cream/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-sand flex items-center justify-center text-2xl shrink-0">✅</div>
              <div className="flex-1">
                <h4 className="font-semibold text-base">{item.title}</h4>
                <p className="text-sm text-sage/60 mb-2">📍 {item.loc}</p>
                <span className="bg-acid text-forest text-[10px] font-bold px-2.5 py-0.5 rounded-full">{item.stats}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
