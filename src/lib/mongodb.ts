import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let db: Db;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  client = new MongoClient(uri, options);
  await client.connect();
  db = client.db();

  return { client, db };
}
