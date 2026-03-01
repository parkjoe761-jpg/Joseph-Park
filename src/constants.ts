import { Report, Event, Supply, Poll, User } from './types';

export const INITIAL_REPORTS: Report[] = [
  {
    id: '1',
    title: 'Illegal Dump Site',
    location: 'Riverside Park, Skokie',
    description: 'Illegal dumping of construction waste. Large pile blocking path.',
    severity: 'Critical',
    timestamp: '2h ago',
    confirmations: 3,
    icon: '🗑️',
    lat: 40,
    lng: 35,
  },
  {
    id: '2',
    title: 'Litter Near Bus Stop',
    location: 'Oak St & Main, Skokie',
    description: 'Scattered litter around bus stop and nearby vacant lot.',
    severity: 'High',
    timestamp: '5h ago',
    confirmations: 1,
    icon: '🍂',
    lat: 25,
    lng: 65,
  },
  {
    id: '3',
    title: 'Overgrown Vacant Lot',
    location: 'Lincoln Ave, Skokie',
    description: 'Overgrown area with accumulated trash.',
    severity: 'Medium',
    timestamp: '1d ago',
    confirmations: 2,
    icon: '🌿',
    lat: 65,
    lng: 20,
  },
  {
    id: '4',
    title: 'Storm Drain Clogged',
    location: 'Dempster St, Skokie',
    description: 'Clogged storm drain creating ponding issues.',
    severity: 'Low',
    timestamp: '2d ago',
    confirmations: 0,
    icon: '💧',
    lat: 70,
    lng: 75,
  },
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Riverside Park Cleanup',
    date: 'Saturday, March 8',
    time: '9:00 AM',
    location: 'Riverside Park, Skokie',
    description: "Remove an illegal construction waste dump blocking the west path. Will require heavy-duty bags and possibly a dumpster — we're coordinating with the city.",
    severity: 'Critical',
    status: 'Upcoming',
    volunteers: 24,
    targetHours: 3,
    members: ['JD', 'AM', 'TR', 'KS', 'DR'],
    lat: 55,
    lng: 50,
  },
  {
    id: 'e2',
    title: 'Oak Street Blitz',
    date: 'Today',
    time: 'Started 10:00 AM',
    location: 'Oak Street, Skokie',
    description: 'Quick sweep of the main thoroughfare to clear weekend litter.',
    severity: 'High',
    status: 'In Progress',
    volunteers: 9,
    targetHours: 2,
    members: ['TR', 'KS'],
    lat: 25,
    lng: 65,
  },
  {
    id: 'e3',
    title: 'Lincoln Ave Lot Day',
    date: 'Sunday, March 9',
    time: '8:00 AM',
    location: 'Lincoln Ave, Skokie',
    description: 'Clearing brush and trash from the vacant lot on Lincoln.',
    severity: 'Medium',
    status: 'Upcoming',
    volunteers: 2,
    targetHours: 2,
    members: ['JD', 'AM'],
    lat: 65,
    lng: 20,
  },
];

export const INITIAL_SUPPLIES: Supply[] = [
  { id: 's1', name: 'Trash Bags (50 gal)', icon: '🗑️', claimed: 4, total: 8 },
  { id: 's2', name: 'Litter Grabbers', icon: '🦀', claimed: 10, total: 12 },
  { id: 's3', name: 'Work Gloves', icon: '🧤', claimed: 24, total: 24 },
  { id: 's4', name: 'Hand Sanitizer', icon: '🚿', claimed: 1, total: 4 },
];

export const INITIAL_POLLS: Poll[] = [
  {
    id: 'p1',
    question: 'What time works best for cleanup?',
    options: [
      { id: 'o1', text: '9:00 AM', votes: 12 },
      { id: 'o2', text: '10:00 AM', votes: 7 },
      { id: 'o3', text: '11:00 AM', votes: 4 },
    ],
    totalVotes: 23,
    myVote: 'o1',
    closesAt: 'March 5',
  },
  {
    id: 'p2',
    question: 'Are we covered on supplies?',
    options: [
      { id: 'o4', text: "Yes, we're good", votes: 7 },
      { id: 'o5', text: 'Need more bags', votes: 3 },
    ],
    totalVotes: 10,
    closesAt: 'Active',
  },
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Jane Doe',
  initials: 'JD',
  location: 'Skokie, IL',
  joinedDate: 'Jan 2025',
  eventsJoined: 12,
  volunteerHours: 48,
  points: 320,
  rank: 7,
  achievements: [
    { id: 'a1', title: 'First Cleanup', description: 'Joined your first event', icon: '🌱' },
    { id: 'a2', title: 'Supply Hero', description: 'Brought supplies to 5 events', icon: '🦸' },
    { id: 'a3', title: 'Cartographer', description: 'Submitted 10 pollution reports', icon: '🗺️' },
  ],
};

export const LEADERBOARD_PEOPLE = [
  { id: 'l1', name: 'Sarah R.', initials: 'SR', events: 14, hours: 62, points: 1240, rank: 1 },
  { id: 'l2', name: 'Mike K.', initials: 'MK', events: 11, hours: 48, points: 980, rank: 2 },
  { id: 'l3', name: 'Priya L.', initials: 'PL', events: 10, hours: 44, points: 860, rank: 3 },
  { id: 'l4', name: 'Alex C.', initials: 'AC', events: 8, hours: 36, points: 720, rank: 4 },
];

export const LEADERBOARD_CITIES = [
  { id: 'c1', name: 'Evanston, IL', events: 24, volunteers: 480, points: 12400, rank: 1 },
  { id: 'c2', name: 'Skokie, IL', events: 8, volunteers: 134, points: 2840, rank: 2 },
  { id: 'c3', name: 'Oak Park, IL', events: 6, volunteers: 98, points: 2100, rank: 3 },
];
