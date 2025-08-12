import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const users = await db.collection('users').find({}).project({ name: 1 }).toArray();

    const sanitizedUsers = users.map((user) => ({
      ...user,
      _id: user._id.toHexString(),
    }));

    return NextResponse.json({ users: sanitizedUsers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
