import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const games = await db.collection('games').find({}).toArray();
    const users = await db.collection('users').find({}).toArray();

    const playerPoints: { [key: string]: number } = {};

    for (const user of users) {
      playerPoints[user._id.toHexString()] = 0;
    }

    for (const game of games) {
      for (const player of game.players) {
        const userId = player.userId.toHexString();
        if (player.finishingPosition === 1) {
          playerPoints[userId] += 10;
        } else if (player.finishingPosition === 2) {
          playerPoints[userId] += 5;
        } else if (player.finishingPosition === 3) {
          playerPoints[userId] += 2;
        }
      }
    }

    const leaderboard = Object.entries(playerPoints)
      .map(([userId, points]) => {
        const user = users.find((u) => u._id.toHexString() === userId);
        return {
          _id: userId,
          name: user ? user.name : 'Unknown',
          points,
        };
      })
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));

    return NextResponse.json({ leaderboard }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
