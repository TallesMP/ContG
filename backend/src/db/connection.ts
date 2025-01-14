import { Client } from 'pg'


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'controle_gastos'
});


client.connect()
  .then(() => console.log("Conectado"))
  .catch(err => console.log("erro", err));

export default client;
