import { MongoClient } from 'mongodb';
import 'dotenv/config'

const uri = process.env.MONGO_URI
import db from './db.json' with {type: "json"}
const arr = db.phonebook[0].contacts;


/*This async program will take every value in "arr" and push it to MongoDB*/
async function pushArrToMongo() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('UrFriends'); // Replace with your database name
    const collection = database.collection('contacts'); // Replace with your collection name
    const result = await collection.insertMany(arr);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
pushArrToMongo();

