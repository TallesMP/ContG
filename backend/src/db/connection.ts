import { Client } from 'pg'


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'contg'
});


client.connect()
  .then(() => console.log("DB: Conectado"))
  .catch(err => console.log("DB: Erro", err));

export default client;
