import React, { useState } from 'react';
import { LEADERBOARD_PEOPLE, LEADERBOARD_CITIES, CURRENT_USER } from '../constants';
import { cn } from '../lib/utils';

export const LeaderboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'people' | 'cities'>('people');

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-forest">Leaderboard</h2>
          <p className="text-sm text-sage/60">Individuals & cities competing for a cleaner world</p>
        </div>
      </div>

      <div className="flex gap-1 bg-sand p-1 rounded-xl w-fit">
        {[
          { id: 'people', label: '👤 Individuals' },
          { id: 'cities', label: '🏙️ Cities' },
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

      {activeTab === 'people' ? (
        <div className="space-y-5">
          <div className="card bg-gradient-to-br from-forest to-moss text-white p-0 overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="text-5xl">🏆</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-xl font-bold">March 2026 Challenge</h3>
                <p className="text-sm text-white/70">Earn points by joining events, reporting issues, and bringing supplies</p>
              </div>
              <div className="shrink-0 text-center">
                <div className="font-mono text-4xl font-bold text-acid">{CURRENT_USER.points}</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider">Your Points</div>
              </div>
            </div>
          </div>

          <div className="card p-0 divide-y divide-forest/5">
            {LEADERBOARD_PEOPLE.map((person) => (
              <div key={person.id} className={cn(
                "flex items-center gap-4 p-4",
                person.name === CURRENT_USER.name ? "bg-acid/5" : ""
              )}>
                <div className={cn(
                  "w-8 text-center font-mono text-sm font-bold",
                  person.rank === 1 ? "text-amber-500" : 
                  person.rank === 2 ? "text-slate-400" : 
                  person.rank === 3 ? "text-amber-700" : "text-sage/40"
                )}>
                  {person.rank === 1 ? '🥇' : person.rank === 2 ? '🥈' : person.rank === 3 ? '🥉' : `#${person.rank}`}
                </div>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: `hsl(${person.rank * 40 + 160}, 40%, 40%)` }}
                >
                  {person.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{person.name} {person.name === CURRENT_USER.name && '(You)'}</div>
                  <div className="text-[11px] text-sage/60">{person.events} events · {person.hours} hrs</div>
                </div>
                <div className="font-mono text-base font-bold text-forest">
                  {person.points.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-gradient-to-br from-lime/10 to-emerald/5 border-lime/20">
            <h4 className="text-sm font-bold mb-4">🏅 Your Incentives</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: '⏱️', title: '48 Hrs Verified', sub: 'Community service hours' },
                { icon: '💰', title: '$120 Tax Credit', sub: 'Submit to IRS by April 15' },
                { icon: '🏛️', title: 'City Recognition', sub: "Mayor's Award eligible" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-forest/5">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-[10px] text-sage/60">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-0 divide-y divide-forest/5">
          {LEADERBOARD_CITIES.map((city) => (
            <div key={city.id} className="flex items-center gap-4 p-5">
              <div className={cn(
                "w-8 text-center font-mono text-sm font-bold",
                city.rank === 1 ? "text-amber-500" : 
                city.rank === 2 ? "text-slate-400" : 
                city.rank === 3 ? "text-amber-700" : "text-sage/40"
              )}>
                {city.rank === 1 ? '🥇' : city.rank === 2 ? '🥈' : city.rank === 3 ? '🥉' : `#${city.rank}`}
              </div>
              <div className="text-3xl shrink-0">
                {city.rank === 1 ? '🏙️' : city.rank === 2 ? '🌆' : '🌃'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold truncate">{city.name}</div>
                <div className="text-xs text-sage/60">{city.events} events · {city.volunteers} volunteers</div>
              </div>
              <div className="font-mono text-xl font-bold text-forest">
                {city.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
