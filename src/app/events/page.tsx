'use client';

import { useState, useEffect } from 'react';

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events');
      if (res.ok) {
        const { events } = await res.json();
        setEvents(events);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="w-full max-w-2xl">
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold text-black">{event.name}</h2>
              <p className="text-gray-700">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-700">Location: {event.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
