import { Client } from 'pg'


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'contg'
});


client.connect()
  .then(() => console.log("Conectado"))
  .catch(err => console.log("erro", err));

export default client;
