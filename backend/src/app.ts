import express, { Request, Response } from 'express';
import client from './db/connection';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  client.query('SELECT NOW()', (err, result) => {
    if (err) {
      return res.status(500).send('Errro ao consultar bd');
    }
    res.status(200).json({ data: result.rows });
  });
});

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
