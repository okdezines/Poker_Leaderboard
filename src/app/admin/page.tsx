'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/components/withAuth';

interface User {
  _id: string;
  name: string;
}

function AdminPage() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [gameDate, setGameDate] = useState('');
  const [gamePlayers, setGamePlayers] = useState([{ userId: '', finishingPosition: 1 }]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users'); // This route doesn't exist yet
      if (res.ok) {
        const { users } = await res.json();
        setUsers(users);
      }
    };
    fetchUsers();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: eventName, date: eventDate, location: eventLocation, description: eventDescription }),
    });
    setEventName('');
    setEventDate('');
    setEventLocation('');
    setEventDescription('');
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: gameDate, players: gamePlayers }),
    });
    setGameDate('');
    setGamePlayers([{ userId: '', finishingPosition: 1 }]);
  };

  const handlePlayerChange = (index: number, field: string, value: string | number) => {
    const newPlayers = [...gamePlayers];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setGamePlayers(newPlayers);
  };

  const addPlayer = () => {
    setGamePlayers([...gamePlayers, { userId: '', finishingPosition: gamePlayers.length + 1 }]);
  };

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <h1 className="text-4xl font-bold mb-8">Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block font-bold">Event Name</label>
              <input
                id="eventName"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="eventDate" className="block font-bold">Date</label>
              <input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="eventLocation" className="block font-bold">Location</label>
              <input
                id="eventLocation"
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="eventDescription" className="block font-bold">Description</label>
              <textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Event</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add Game Result</h2>
          <form onSubmit={handleAddGame} className="space-y-4">
            <div>
              <label htmlFor="gameDate" className="block font-bold">Date</label>
              <input
                id="gameDate"
                type="date"
                value={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            {gamePlayers.map((player, index) => (
              <div key={index} className="flex items-center space-x-2">
                <select
                  value={player.userId}
                  onChange={(e) => handlePlayerChange(index, 'userId', e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select Player</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={player.finishingPosition}
                  onChange={(e) => handlePlayerChange(index, 'finishingPosition', parseInt(e.target.value))}
                  className="border p-2 rounded w-24"
                />
              </div>
            ))}
            <button type="button" onClick={addPlayer} className="bg-gray-200 p-2 rounded">Add Player</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Game</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default withAuth(AdminPage);
