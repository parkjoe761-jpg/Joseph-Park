import React from 'react';
import { Button } from './Button';
import { Plus } from 'lucide-react';

interface TopBarProps {
  title: string;
  onReportClick: () => void;
  onCreateEventClick: () => void;
  userInitials: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, onReportClick, onCreateEventClick, userInitials }) => {
  return (
    <div className="h-16 bg-white border-b border-forest/10 flex items-center px-7 gap-4 shrink-0">
      <h1 className="font-display text-2xl font-bold text-forest flex-1">{title}</h1>
      <div className="flex items-center gap-2.5">
        <Button variant="acid" onClick={onReportClick}>
          <Plus size={18} />
          Report Issue
        </Button>
        <Button variant="ghost" size="sm" onClick={onCreateEventClick}>
          <Plus size={16} />
          Create Event
        </Button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sage to-lime flex items-center justify-center text-sm font-bold text-white">
          {userInitials}
        </div>
      </div>
    </div>
  );
};
