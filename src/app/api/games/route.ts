import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { date, players } = await req.json();

    if (!date || !players) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    await db.collection('games').insertOne({
      date: new Date(date),
      players: players.map((player: any) => ({
        ...player,
        userId: new ObjectId(player.userId),
      })),
    });

    return NextResponse.json(
      { message: 'Game created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
