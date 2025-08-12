import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const games = await db.collection('games').find({ 'players.userId': new ObjectId(userId) }).toArray();

    let totalWins = 0;
    const gameHistory = games.map((game) => {
      const player = game.players.find((p: any) => p.userId.toHexString() === userId);
      if (player.finishingPosition === 1) {
        totalWins++;
      }
      return {
        _id: game._id,
        date: game.date,
        winnings: player.winnings,
        finishingPosition: player.finishingPosition,
      };
    });

    return NextResponse.json({
      name: user.name,
      totalWins,
      games: gameHistory,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
