import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const events = await db.collection('events').find({}).toArray();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
