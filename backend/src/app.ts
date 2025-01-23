import express, { Request, Response } from 'express';
import { UserService } from './services/UserService';

const app = express();
app.use(express.json());

app.get('/registro', async (req: Request, res: Response) => {
  const teste = await UserService.createUser("teste", "teste@gmail.com", "senha", "hash");
  res.status(500).send(teste)
});

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
