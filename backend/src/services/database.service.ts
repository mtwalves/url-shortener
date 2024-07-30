import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb://root:example@localhost:27017';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function init() {
  try {
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (e) {
    console.log('Failed connecting to database');
  }
}

function insertUrl(url: string, count: number) {
  const database = client.db('url-shortener');
  const column = database.collection('urls');

  return column.insertOne({ url, count });
}

async function getUrl(count: number) {
  const database = client.db('url-shortener');
  const column = database.collection('urls');

  const doc = await column.findOne({ count });

  return doc?.url;
}

export default {
  init,
  insertUrl,
  getUrl,
};
