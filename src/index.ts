import express, { Request, Response } from 'express';
import databaseService from './services/database.service';
import shortenerBusiness from './business/shortener.business';

const PORT = 13333;
databaseService.init();

const app = express();
app.use(express.json());

app.post('/', async (req: Request, res: Response) => {
  const { url } = req.body;

  const encodedId = await shortenerBusiness.encodeUrl(url);

  res.send({ url, encodedId });
});

app.get('/:encodedId', async (req: Request, res: Response) => {
  const { encodedId } = req.params;

  const url = await shortenerBusiness.decodeUrl(encodedId);

  if (url) {
    res.redirect(url);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
