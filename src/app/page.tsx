'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LeaderboardPlayer {
  _id: string;
  name: string;
  points: number;
  rank: number;
}

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
}

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const { leaderboard } = await res.json();
        setLeaderboard(leaderboard);
      }
    };
    const fetchEvents = async () => {
      const res = await fetch('/api/events');
      if (res.ok) {
        const { events } = await res.json();
        setEvents(events);
      }
    };
    fetchLeaderboard();
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Leaderboard */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Top 10 Players</h2>
          <ul className="space-y-2">
            {leaderboard.map((player) => (
              <li key={player._id} className="flex justify-between">
                <span>{player.rank}. {player.name}</span>
                <span>{player.points}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle Column: Feature Game Winner */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Feature Game Winner</h2>
          <div className="relative w-full h-64">
            <Image
              src="https://placehold.co/300x300"
              alt="Feature Game Winner"
              layout="fill"
              // objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="mt-2 text-center">John Doe - Winner of the Friday Night Special</p>
        </div>

        {/* Right Column: Upcoming Events */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event._id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src="https://placehold.co/150x150"
                    alt="Event"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{event.name}</h3>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
