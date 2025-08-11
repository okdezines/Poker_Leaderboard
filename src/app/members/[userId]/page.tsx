'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface UserProfile {
  name: string;
  totalWinnings: number;
  games: {
    _id: string;
    date: string;
    winnings: number;
    finishingPosition: number;
  }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        const res = await fetch(`/api/users/${userId}/profile`); // This route doesn't exist yet
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <h1 className="text-4xl font-bold mb-8">{profile.name}'s Profile</h1>
      <h2 className="text-2xl font-bold mb-4">Total Winnings: ${profile.totalWinnings}</h2>
      <h3 className="text-xl font-bold mb-4">Game History</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Position</th>
            <th className="p-2">Winnings</th>
          </tr>
        </thead>
        <tbody>
          {profile.games.map((game) => (
            <tr key={game._id}>
              <td className="p-2">{new Date(game.date).toLocaleDateString()}</td>
              <td className="p-2">{game.finishingPosition}</td>
              <td className="p-2">${game.winnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
