export default function EventsPage() {
  const events = [
    {
      id: 1,
      name: 'Friday Night Poker',
      date: '2024-08-02',
      location: 'The Green Felt',
    },
    {
      id: 2,
      name: 'Charity Tournament',
      date: '2024-08-10',
      location: 'Community Hall',
    },
    {
      id: 3,
      name: 'High Roller Saturday',
      date: '2024-08-17',
      location: 'The Diamond Casino',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="w-full max-w-2xl">
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold text-black">{event.name}</h2>
              <p className="text-gray-700">Date: {event.date}</p>
              <p className="text-gray-700">Location: {event.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
