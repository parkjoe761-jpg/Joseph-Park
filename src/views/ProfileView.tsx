import React from 'react';
import { CURRENT_USER } from '../constants';
import { cn } from '../lib/utils';

export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card space-y-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage to-lime flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {CURRENT_USER.initials}
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-forest">{CURRENT_USER.name}</h2>
              <p className="text-sm text-sage/60">{CURRENT_USER.location} · Member since {CURRENT_USER.joinedDate}</p>
              <span className="inline-flex items-center gap-1.5 bg-forest text-acid text-[11px] font-bold px-3 py-1 rounded-full mt-3">
                🌿 EcoChampion
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Events', value: CURRENT_USER.eventsJoined },
              { label: 'Hours', value: CURRENT_USER.volunteerHours },
              { label: 'Points', value: CURRENT_USER.points },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream rounded-xl p-4 text-center">
                <div className="font-display text-2xl font-black text-forest">{stat.value}</div>
                <div className="text-[10px] text-sage/60 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-6">
          <h3 className="font-display text-lg font-bold text-forest">🏅 Achievements</h3>
          <div className="space-y-3">
            {CURRENT_USER.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 bg-cream/50 rounded-xl p-3.5 border border-forest/5">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <div className="text-sm font-bold">{achievement.title}</div>
                  <div className="text-xs text-sage/60">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-display text-lg font-bold text-forest mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {[
            { action: 'Joined', target: 'Riverside Park Cleanup', date: '2 hours ago', icon: '🧹' },
            { action: 'Reported', target: 'Illegal Dump Site', date: '5 hours ago', icon: '📍' },
            { action: 'Earned', target: '50 points for supply donation', date: '1 day ago', icon: '🏅' },
            { action: 'Completed', target: 'Dempster St. Park Cleanup', date: '1 week ago', icon: '✅' },
          ].map((activity, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-lg shrink-0">
                {activity.icon}
              </div>
              <div className="flex-1 border-b border-forest/5 pb-4 last:border-0">
                <div className="text-sm">
                  <span className="font-bold">{activity.action}</span> {activity.target}
                </div>
                <div className="text-xs text-sage/40 mt-1">{activity.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
