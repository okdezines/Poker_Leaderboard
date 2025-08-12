import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const events = await db.collection('events').find({}).toArray();

    const sanitizedEvents = events.map((event) => ({
      ...event,
      _id: event._id.toHexString(),
    }));

    return NextResponse.json({ events: sanitizedEvents }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, date, location, description } = await req.json();

    if (!name || !date || !location) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    await db.collection('events').insertOne({
      name,
      date: new Date(date),
      location,
      description,
    });

    return NextResponse.json(
      { message: 'Event created successfully' },
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
