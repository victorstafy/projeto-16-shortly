import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { connection } from '../db/database.js';
import { signupSchema, signinSchema } from '../schemas/authSchema.js';
import dayjs from 'dayjs';

const TABLE = 'users';

async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const generated_token=res.locals.generated_token;

    // const isValid = signupSchema.validate({
    //   name,
    //   email,
    //   password,
    //   confirmPassword,
    // });
  
    // if (isValid.error) {
    //   return res.status(422).send(isValid.error.details);
    // }
  
    // const email_list = await connection.query(`SELECT email FROM ${TABLE} WHERE email=$1`,[email]);

    // if (email_list.rows.length!==0 ){
    //     return res.sendStatus(409);
    // }

    // const generated_token = bcrypt.hashSync(password, 12);

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
    // const isValid = signinSchema.validate({
    //   email,
    //   password,
    // });
  
    // if (isValid.error) {
    //     return res.status(422).send(isValid.error.details);
    // }
    try {

        // const user_token = await connection.query(`SELECT password FROM users WHERE email=$1;`,[email]);
        // const isValidPass = bcrypt.compareSync(password, user_token.rows[0].password);

        // if (!user_token || !isValidPass) {
        //     return res.send(401);
        // }
    
        const token = uuid();

        // user_id_req = await connection.query(`SELECT id FROM users WHERE email=$1;`,[email]);
        // user_id=user_id_req.rows[0].id;

        return res.status(200).send(`token:${token}`);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }
  
  export { signUp, signIn };