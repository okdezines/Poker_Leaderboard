'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface UserProfile {
  name: string;
  totalWins: number;
  profilePictureUrl: string;
  games: {
    _id: string;
    date: string;
    winnings: number;
    finishingPosition: number;
  }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        const res = await fetch(`/api/users/${userId}/profile`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!newProfilePicture) return;

    // In a real app, you would upload the file to a service like S3
    // and get back a URL. For this demo, we'll just use a placeholder.
    const profilePictureUrl = 'https://via.placeholder.com/150';

    await fetch(`/api/users/${userId}/profile-picture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profilePictureUrl }),
    });

    // Refresh the profile to show the new picture
    if (userId) {
      const res = await fetch(`/api/users/${userId}/profile`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative w-32 h-32">
          <Image
            src={profile.profilePictureUrl}
            alt={profile.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{profile.name}'s Profile</h1>
          <h2 className="text-2xl font-bold">Total Wins: {profile.totalWins}</h2>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Update Profile Picture</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded ml-4">Upload</button>
      </div>

      <div className="mt-8">
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
      </div>
    </main>
  );
}
