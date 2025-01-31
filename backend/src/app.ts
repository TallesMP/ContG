import express, { Request, Response } from 'express';
import { UserService } from './services/UserService';

const app = express();
app.use(express.json());

app.get('/user', async (req: Request, res: Response) => {
  const login = UserService.compareHash(req.body);
  res.status(500).send(login)
});

app.post('/user', async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  res.status(500).send(user)
});

app.put('/user', async (req: Request, res: Response) => {

})

app.delete('/user', async (req: Request, res: Response) => {

})

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
