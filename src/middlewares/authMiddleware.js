import bcrypt from 'bcrypt';
import { connection } from '../db/database.js';
import { signupSchema, signinSchema } from '../schemas/authSchema.js';

const TABLE = 'users';

async function signUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    try{
        const isValid = signupSchema.validate({
        name,
        email,
        password,
        confirmPassword,
        });
    
        if (isValid.error) {
            return res.status(422).send(isValid.error.details);
        }
    
        const email_list = await connection.query(`SELECT email FROM ${TABLE} WHERE email=$1`,[email]);

        if (email_list.rows.length!==0 ){
            return res.sendStatus(409);
        }

        const generated_token = bcrypt.hashSync(password, 12);
    
        res.locals.generated_token = generated_token;
        next();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.details);
    }
}
  
async function signIn(req, res, next) {
    const {email, password } = req.body;

    try{
        const isValid = signinSchema.validate({
            email,
            password,
        });

        if (isValid.error) {
            return res.status(422).send(isValid.error.details);
        }

        const user_token = await connection.query(`SELECT password FROM users WHERE email=$1;`,[email]);

        if (user_token.rowCount===0) {
            return res.sendStatus(401);
        }

        const isValidPass = bcrypt.compareSync(password, user_token.rows[0].password);

        if (!isValidPass) {
            return res.sendStatus(401);
        }

        const user_id_req = await connection.query(`SELECT id FROM users WHERE email=$1;`,[email]);
        const user_id=user_id_req.rows[0].id;

        res.locals.user_id = user_id;
        next();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.details);
    }
}


export { signUp,signIn };