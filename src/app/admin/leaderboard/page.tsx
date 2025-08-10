'use client';

import { useState, useEffect } from 'react';
import withAuth from '@/components/withAuth';

interface LeaderboardPlayer {
  _id: string;
  name: string;
  points: number;
  rank: number;
}

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [newPoints, setNewPoints] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const { leaderboard } = await res.json();
        setLeaderboard(leaderboard);
      }
    };
    fetchLeaderboard();
  }, []);

  const handleEdit = (player: LeaderboardPlayer) => {
    setEditingPlayerId(player._id);
    setNewPoints(player.points);
  };

  const handleCancel = () => {
    setEditingPlayerId(null);
    setNewPoints(0);
  };

  const handleUpdate = async (playerId: string) => {
    // Logic to update points will go here
  };

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <h1 className="text-4xl font-bold mb-8">Manage Leaderboard</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Rank</th>
            <th className="p-2">Name</th>
            <th className="p-2">Points</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player) => (
            <tr key={player._id}>
              <td className="p-2">{player.rank}</td>
              <td className="p-2">{player.name}</td>
              <td className="p-2">
                {editingPlayerId === player._id ? (
                  <input
                    type="number"
                    value={newPoints}
                    onChange={(e) => setNewPoints(parseInt(e.target.value))}
                    className="border p-1 rounded"
                  />
                ) : (
                  player.points
                )}
              </td>
              <td className="p-2">
                {editingPlayerId === player._id ? (
                  <>
                    <button onClick={() => handleUpdate(player._id)} className="bg-blue-500 text-white p-1 rounded">Save</button>
                    <button onClick={handleCancel} className="bg-gray-500 text-white p-1 rounded ml-2">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(player)} className="bg-gray-200 p-1 rounded">Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default withAuth(LeaderboardPage);
