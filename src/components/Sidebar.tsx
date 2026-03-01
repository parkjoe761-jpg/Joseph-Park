import React from 'react';
import { Home, Map as MapIcon, Calendar, Users, Trophy, User, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'map', icon: MapIcon, label: 'Pollution Map' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'organize', icon: Users, label: 'Organize', hasNotif: true },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <nav className="w-[72px] bg-forest flex flex-col items-center py-5 gap-2 z-[100] shrink-0">
      <div className="w-11 h-11 bg-acid rounded-2xl flex items-center justify-center text-2xl mb-4">
        🌿
      </div>
      
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={cn(
            "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group",
            activeView === item.id ? "bg-acid text-forest" : "text-white/40 hover:bg-white/10 hover:text-white"
          )}
        >
          <item.icon size={20} />
          {item.hasNotif && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rust rounded-full border-2 border-forest" />
          )}
          <span className="absolute left-16 bg-forest text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            {item.label}
          </span>
        </button>
      ))}

      <div className="mt-auto">
        <button
          onClick={() => onViewChange('profile')}
          className={cn(
            "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group",
            activeView === 'profile' ? "bg-acid text-forest" : "text-white/40 hover:bg-white/10 hover:text-white"
          )}
        >
          <User size={20} />
          <span className="absolute left-16 bg-forest text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
