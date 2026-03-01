export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Report {
  id: string;
  title: string;
  location: string;
  description: string;
  severity: Severity;
  timestamp: string;
  confirmations: number;
  icon: string;
  lat: number;
  lng: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  severity: Severity;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  volunteers: number;
  targetHours: number;
  members: string[];
  lat: number;
  lng: number;
}

export interface Supply {
  id: string;
  name: string;
  icon: string;
  claimed: number;
  total: number;
  isClaimedByMe?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  myVote?: string;
  closesAt: string;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  location: string;
  joinedDate: string;
  eventsJoined: number;
  volunteerHours: number;
  points: number;
  rank: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}
