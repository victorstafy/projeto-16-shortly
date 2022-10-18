import { v4 as uuid } from 'uuid';
import { connection } from '../db/database.js';
import dayjs from 'dayjs';

const TABLE = 'users';

async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const generated_token=res.locals.generated_token;

    try {

        const InsertUser=await connection.query(`INSERT INTO users (name,email,password,"createdAt") VALUES ($1,$2,$3,$4)`,
        [name,email,generated_token,dayjs().format('DD/MM/YYYY HH:mm:ss')]);

        return res.send(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
  }
  
  async function signIn(req, res) {
    const { email, password } = req.body;
  
    const user_id=res.locals.user_id;
    try {   
        const token = uuid();
        return res.status(200).send(`token:${token}`);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }
  
  export { signUp, signIn };