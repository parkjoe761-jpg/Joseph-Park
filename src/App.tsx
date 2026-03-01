import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Modal } from './components/Modal';
import { Button } from './components/Button';
import { DashboardView } from './views/DashboardView';
import { MapView } from './views/MapView';
import { EventsView } from './views/EventsView';
import { OrganizeView } from './views/OrganizeView';
import { LeaderboardView } from './views/LeaderboardView';
import { ProfileView } from './views/ProfileView';
import { 
  INITIAL_REPORTS, 
  INITIAL_EVENTS, 
  INITIAL_SUPPLIES, 
  INITIAL_POLLS, 
  CURRENT_USER 
} from './constants';
import { Report, Event, Severity, Supply, Poll } from './types';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [supplies, setSupplies] = useState<Supply[]>(INITIAL_SUPPLIES);
  const [polls, setPolls] = useState<Poll[]>(INITIAL_POLLS);
  
  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  
  // Selected items for detail modals
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Toast state
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleReportIssue = () => {
    setIsReportModalOpen(true);
  };

  const handleCreateEvent = () => {
    setIsEventModalOpen(true);
  };

  const handleReportDetail = (report: Report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  const handleEventDetail = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId ? { ...e, volunteers: e.volunteers + 1, members: [...e.members, CURRENT_USER.initials] } : e
    ));
    showToast('🎉 You joined the event! Check Organize for details.');
  };

  const handleClaimSupply = (supplyId: string) => {
    setSupplies(prev => prev.map(s => 
      s.id === supplyId ? { ...s, claimed: s.claimed + 1, isClaimedByMe: true } : s
    ));
    showToast('🧤 Supply claimed! See you at the event.');
  };

  const handleVotePoll = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(p => {
      if (p.id !== pollId) return p;
      if (p.myVote === optionId) return p;
      
      const newOptions = p.options.map(o => {
        if (o.id === optionId) return { ...o, votes: o.votes + 1 };
        if (o.id === p.myVote) return { ...o, votes: Math.max(0, o.votes - 1) };
        return o;
      });
      
      return { 
        ...p, 
        options: newOptions, 
        myVote: optionId,
        totalVotes: p.myVote ? p.totalVotes : p.totalVotes + 1
      };
    }));
    showToast('🗳️ Vote recorded!');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      severity: formData.get('severity') as Severity,
      timestamp: 'Just now',
      confirmations: 0,
      icon: '📍',
      lat: 30 + Math.random() * 40,
      lng: 20 + Math.random() * 50,
    };
    setReports([newReport, ...reports]);
    setIsReportModalOpen(false);
    showToast('✅ Report submitted! Adding pin to map...');
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      severity: 'Medium',
      status: 'Upcoming',
      volunteers: 1,
      targetHours: 2,
      members: [CURRENT_USER.initials],
      lat: 40 + Math.random() * 20,
      lng: 30 + Math.random() * 20,
    };
    setEvents([newEvent, ...events]);
    setIsEventModalOpen(false);
    showToast('🎉 Event created! Invitations sent to nearby volunteers.');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView reports={reports} onViewMap={() => setActiveView('map')} onReportDetail={handleReportDetail} />;
      case 'map':
        return <MapView reports={reports} onReportIssue={handleReportIssue} onReportDetail={handleReportDetail} />;
      case 'events':
        return <EventsView events={events} onJoinEvent={handleJoinEvent} onEventDetail={handleEventDetail} onCreateEvent={handleCreateEvent} />;
      case 'organize':
        return (
          <OrganizeView 
            supplies={supplies} 
            polls={polls} 
            members={events[0].members} 
            onClaimSupply={handleClaimSupply}
            onVotePoll={handleVotePoll}
            onAddSupply={() => showToast('🛒 Supply request sent to group!')}
            onCreatePoll={() => setIsPollModalOpen(true)}
          />
        );
      case 'leaderboard':
        return <LeaderboardView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView reports={reports} onViewMap={() => setActiveView('map')} onReportDetail={handleReportDetail} />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'map': return 'Pollution Map';
      case 'events': return 'Events';
      case 'organize': return 'Organize Event';
      case 'leaderboard': return 'Leaderboard';
      case 'profile': return 'My Profile';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          title={getTitle()} 
          onReportClick={handleReportIssue} 
          onCreateEventClick={handleCreateEvent}
          userInitials={CURRENT_USER.initials}
        />
        
        <main className="flex-1 overflow-y-auto p-7">
          {renderView()}
        </main>
      </div>

      {/* Report Modal */}
      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Report a Pollution Issue">
        <form onSubmit={handleSubmitReport} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Title</label>
            <input name="title" required className="input" placeholder="e.g. Illegal Dump Site" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Location</label>
            <input name="location" required className="input" placeholder="e.g. Riverside Park, near west entrance" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Description</label>
            <textarea name="description" required className="input min-h-[100px]" placeholder="Describe the pollution issue in detail..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Severity</label>
            <div className="grid grid-cols-4 gap-2">
              {['Critical', 'High', 'Medium', 'Low'].map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="severity" value={s} defaultChecked={s === 'Medium'} className="peer sr-only" />
                  <div className={cn(
                    "px-2 py-2 rounded-xl text-[10px] font-bold text-center border-2 border-transparent transition-all",
                    s === 'Critical' ? "bg-rust/10 text-rust peer-checked:border-rust" :
                    s === 'High' ? "bg-amber/10 text-amber-800 peer-checked:border-amber-600" :
                    s === 'Medium' ? "bg-lime/10 text-lime-800 peer-checked:border-lime-600" :
                    "bg-sky/10 text-sky-800 peer-checked:border-sky-600"
                  )}>
                    {s}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Submit Report</Button>
          </div>
        </form>
      </Modal>

      {/* Event Modal */}
      <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="Create Cleanup Event">
        <form onSubmit={handleSubmitEvent} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Event Name</label>
            <input name="title" required className="input" placeholder="e.g. Riverside Park Cleanup Day" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Date</label>
              <input name="date" type="date" required className="input" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Time</label>
              <input name="time" type="time" required className="input" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Location</label>
            <input name="location" required className="input" placeholder="e.g. Riverside Park, Skokie" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Description</label>
            <textarea name="description" required className="input min-h-[100px]" placeholder="What will volunteers be doing?" />
          </div>
          <div className="bg-sky/10 rounded-xl p-4 text-[11px] text-sky-900">
            🏛️ If 50+ volunteers join, we'll automatically notify Skokie Parks Dept. for permit assistance.
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsEventModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="acid">Create & Invite</Button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal (Generic for Report or Event) */}
      <Modal 
        isOpen={isDetailModalOpen} 
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedReport(null);
          setSelectedEvent(null);
        }} 
        title={selectedReport ? selectedReport.title : selectedEvent ? selectedEvent.title : 'Details'}
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="flex gap-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold",
                selectedReport.severity === 'Critical' ? "bg-rust/10 text-rust" :
                selectedReport.severity === 'High' ? "bg-amber/10 text-amber-800" :
                selectedReport.severity === 'Medium' ? "bg-lime/10 text-lime-800" : "bg-sky/10 text-sky-800"
              )}>
                {selectedReport.severity} Severity
              </span>
              <span className="bg-sand px-3 py-1 rounded-full text-[10px] font-bold text-sage">📍 {selectedReport.location}</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold tracking-widest text-sage uppercase">Description</h4>
              <p className="text-sm text-dark/80 leading-relaxed">{selectedReport.description}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" variant="acid" onClick={() => {
                setIsDetailModalOpen(false);
                setIsEventModalOpen(true);
              }}>Create Event Here</Button>
              <Button variant="ghost" onClick={() => setIsDetailModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
        {selectedEvent && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="bg-acid text-forest px-3 py-1 rounded-full text-[10px] font-bold">📅 {selectedEvent.date}, {selectedEvent.time}</span>
              <span className="bg-sand px-3 py-1 rounded-full text-[10px] font-bold text-sage">📍 {selectedEvent.location}</span>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold",
                selectedEvent.severity === 'Critical' ? "bg-rust/10 text-rust" : "bg-lime/10 text-lime-800"
              )}>
                {selectedEvent.severity} Hotspot
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold tracking-widest text-sage uppercase">What We'll Do</h4>
              <p className="text-sm text-dark/80 leading-relaxed">{selectedEvent.description}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold tracking-widest text-sage uppercase">Members ({selectedEvent.volunteers})</h4>
              <div className="flex -space-x-2">
                {selectedEvent.members.slice(0, 5).map((initials, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: `hsl(${i * 60 + 120}, 40%, 40%)` }}
                  >
                    {initials}
                  </div>
                ))}
                {selectedEvent.volunteers > 5 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-sand flex items-center justify-center text-[10px] font-bold text-sage shadow-sm">
                    +{selectedEvent.volunteers - 5}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" variant="acid" onClick={() => {
                handleJoinEvent(selectedEvent.id);
                setIsDetailModalOpen(false);
              }}>Join This Event</Button>
              <Button variant="ghost" onClick={() => setIsDetailModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Poll Modal */}
      <Modal isOpen={isPollModalOpen} onClose={() => setIsPollModalOpen(false)} title="Create a Poll">
        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
          setIsPollModalOpen(false);
          showToast('📊 Poll sent to all members!');
        }}>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Question</label>
            <input required className="input" placeholder="e.g. Do we have enough trash bags?" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-widest text-sage uppercase">Options</label>
            <div className="space-y-2">
              <input required className="input" placeholder="Option 1" />
              <input required className="input" placeholder="Option 2" />
              <input className="input" placeholder="Option 3 (optional)" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsPollModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Send Poll</Button>
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-forest text-white px-6 py-3 rounded-2xl shadow-2xl z-[999] font-medium flex items-center gap-3 border border-white/10"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
