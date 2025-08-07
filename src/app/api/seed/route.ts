import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('events').deleteMany({});
    await db.collection('games').deleteMany({});
    await db.collection('leaderboard').deleteMany({});

    // Seed users
    const users = [
      { name: 'Alice', email: 'alice@example.com', password: await bcrypt.hash('password123', 10) },
      { name: 'Bob', email: 'bob@example.com', password: await bcrypt.hash('password123', 10) },
      { name: 'Charlie', email: 'charlie@example.com', password: await bcrypt.hash('password123', 10) },
      { name: 'David', email: 'david@example.com', password: await bcrypt.hash('password123', 10) },
      { name: 'Eve', email: 'eve@example.com', password: await bcrypt.hash('password123', 10) },
    ];
    const userInsertResult = await db.collection('users').insertMany(users);
    const userIds = Object.values(userInsertResult.insertedIds);

    // Seed events
    const events = [
      { name: 'Weekly Poker Night', date: new Date(), location: 'The Back Room', description: 'Our regular weekly game.' },
      { name: 'Charity Tournament', date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), location: 'Community Center', description: 'A tournament for a good cause.' },
    ];
    await db.collection('events').insertMany(events);

    // Seed games
    const games = [
      {
        date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        players: [
          { userId: userIds[0], finishingPosition: 1 },
          { userId: userIds[1], finishingPosition: 2 },
          { userId: userIds[2], finishingPosition: 3 },
        ],
        buyIn: 20,
        prizePool: 60,
      },
      {
        date: new Date(),
        players: [
          { userId: userIds[3], finishingPosition: 1 },
          { userId: userIds[4], finishingPosition: 2 },
          { userId: userIds[0], finishingPosition: 3 },
        ],
        buyIn: 20,
        prizePool: 60,
      },
    ];
    await db.collection('games').insertMany(games);

    return NextResponse.json({ message: 'Database seeded successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
