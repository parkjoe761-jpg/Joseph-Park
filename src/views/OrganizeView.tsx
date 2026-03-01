import React from 'react';
import { Button } from '../components/Button';
import { Supply, Poll, User } from '../types';
import { cn } from '../lib/utils';

interface OrganizeViewProps {
  supplies: Supply[];
  polls: Poll[];
  members: string[];
  onClaimSupply: (supplyId: string) => void;
  onVotePoll: (pollId: string, optionId: string) => void;
  onAddSupply: () => void;
  onCreatePoll: () => void;
}

export const OrganizeView: React.FC<OrganizeViewProps> = ({
  supplies,
  polls,
  members,
  onClaimSupply,
  onVotePoll,
  onAddSupply,
  onCreatePoll,
}) => {
  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-forest">Organize: Riverside Park</h2>
          <p className="text-sm text-sage/60">You are the host · March 8 · 9:00 AM</p>
        </div>
        <Button variant="acid">📤 Send Invites</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Supplies Tracker */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-forest">🧹 Supplies Tracker</h3>
            <Button variant="ghost" size="sm" onClick={onAddSupply}>＋ Add</Button>
          </div>
          <div className="space-y-4">
            {supplies.map((supply) => (
              <div key={supply.id} className="flex items-center justify-between py-2 border-b border-forest/5 last:border-0">
                <div className="flex gap-3 items-center">
                  <div className="w-10 text-center text-2xl">{supply.icon}</div>
                  <div>
                    <div className="text-sm font-semibold">{supply.name}</div>
                    <div className="text-[11px] text-sage/60">{supply.claimed} of {supply.total} claimed</div>
                    <div className="w-32 h-1 bg-sand rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          (supply.claimed / supply.total) < 0.3 ? "bg-rust" : "bg-lime"
                        )}
                        style={{ width: `${(supply.claimed / supply.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                {supply.claimed >= supply.total ? (
                  <span className="bg-acid text-forest text-[11px] font-bold px-3 py-1 rounded-full">✓ Full</span>
                ) : (
                  <Button 
                    variant={supply.isClaimedByMe ? "ghost" : (supply.claimed / supply.total) < 0.3 ? "danger" : "ghost"} 
                    size="sm"
                    onClick={() => onClaimSupply(supply.id)}
                    disabled={supply.isClaimedByMe}
                  >
                    {supply.isClaimedByMe ? '✓ Claimed' : 'Claim'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Group Polls */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-forest">📊 Group Polls</h3>
            <Button variant="ghost" size="sm" onClick={onCreatePoll}>＋ New Poll</Button>
          </div>
          <div className="space-y-8">
            {polls.map((poll) => (
              <div key={poll.id} className="space-y-3">
                <div className="text-sm font-bold">{poll.question}</div>
                <div className="space-y-2">
                  {poll.options.map((option) => {
                    const pct = Math.round((option.votes / poll.totalVotes) * 100);
                    return (
                      <button
                        key={option.id}
                        onClick={() => onVotePoll(poll.id, option.id)}
                        className={cn(
                          "relative w-full text-left p-2.5 rounded-xl border border-forest/10 overflow-hidden transition-all",
                          poll.myVote === option.id ? "border-sage bg-sage/5" : "hover:bg-cream/50"
                        )}
                      >
                        <div 
                          className="absolute inset-y-0 left-0 bg-sage/10 transition-all duration-500" 
                          style={{ width: `${pct}%` }}
                        />
                        <div className="relative flex justify-between items-center text-sm">
                          <span>{option.text}</span>
                          <span className="font-mono text-xs text-sage/60">{pct}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] text-sage/40">{poll.totalVotes} votes · {poll.closesAt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="card space-y-6">
        <h3 className="font-display text-lg font-bold text-forest">📋 Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-[10px] font-bold tracking-widest text-sage uppercase">Location</div>
            <div className="text-sm">📍 Riverside Park<br/><span className="text-sage/60 text-xs">West entrance, near parking</span></div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-bold tracking-widest text-sage uppercase">Time</div>
            <div className="text-sm">📅 Saturday, March 8<br/><span className="text-sage/60 text-xs">9:00 AM – 12:00 PM (est.)</span></div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-bold tracking-widest text-sage uppercase">Permit Status</div>
            <div className="text-sm">🏛️ <span className="text-amber-600 font-semibold">Pending Review</span><br/><span className="text-sage/60 text-xs">Auto-submitted to Skokie Parks Dept.</span></div>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="card space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-forest">👥 Members ({members.length + 19})</h3>
          <Button variant="ghost" size="sm">📤 Invite More</Button>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <div className="flex items-center gap-2 bg-cream rounded-full pl-1.5 pr-4 py-1.5 border border-forest/5">
            <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-xs font-bold text-white">JD</div>
            <span className="text-xs font-bold">You (Host)</span>
          </div>
          {['AM', 'TR', 'KS', 'DR'].map((initials, i) => (
            <div key={i} className="flex items-center gap-2 bg-cream rounded-full pl-1.5 pr-4 py-1.5 border border-forest/5">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: `hsl(${i * 60 + 120}, 40%, 40%)` }}
              >
                {initials}
              </div>
              <span className="text-xs">{initials === 'AM' ? 'Alice M.' : initials === 'TR' ? 'Tom R.' : initials === 'KS' ? 'Kim S.' : 'Dan R.'}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-cream rounded-full px-4 py-1.5 border border-forest/5">
            <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-xs font-bold text-sage">+19</div>
            <span className="text-xs text-sage/60">more</span>
          </div>
        </div>
      </div>
    </div>
  );
};
