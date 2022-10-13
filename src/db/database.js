import pg from 'pg';

const { Pool } = pg;

//Errado => precisa corrigir senha nao pode aparecer no arquivo
const connection = new Pool({
  host: 'localhost', //.env
  port: 5432,
  user: 'postgres',
  password: '12345',
  database: 'board',
});

export { connection };