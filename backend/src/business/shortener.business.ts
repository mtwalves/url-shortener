import base62 from 'base62';
import databaseService from '../services/database.service';

const RANGE = [10000, 20000];
let count = RANGE[0];

async function encodeUrl(url: string): Promise<string> {
  const result = await databaseService.insertUrl(url, count);
  const encodedCount = base62.encode(count);
  count += 1;

  return encodedCount;
}

function decodeUrl(encodedId: string) {
  const id = base62.decode(encodedId);

  return databaseService.getUrl(id);
}

export default {
  decodeUrl,
  encodeUrl,
};
