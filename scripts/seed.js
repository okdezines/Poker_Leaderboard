const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to the database!');

    const db = client.db();

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('events').deleteMany({});
    await db.collection('games').deleteMany({});
    await db.collection('leaderboard').deleteMany({});

    // Seed users
    const users = [
      { name: 'Alice', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob', email: 'bob@example.com', password: 'password123' },
      { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
      { name: 'David', email: 'david@example.com', password: 'password123' },
      { name: 'Eve', email: 'eve@example.com', password: 'password123' },
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

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await client.close();
  }
}

main();
