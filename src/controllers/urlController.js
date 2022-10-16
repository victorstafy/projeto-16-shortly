import bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
import { connection } from '../db/database.js';
import {nanoid} from 'nanoid';
// import { signupSchema, signinSchema } from '../schemas/authSchema.js';


const TABLE = 'users';


async function postShorten(req, res) {
    const bearer_token = req.headers.user;
    const token=bearer_token.slice(7);
    const { url } = req.body;
    const regex = '/(https?:\/\/[^\s]+)/g';

    const user_token_list = await connection.query(`SELECT password FROM users;`,[token]);
  
    if (!token || user_token_list.rows.length===0) {
      return res.sendStatus(401);
    }

    if(!regex.test(url)){
        return res.status(422).send('Url invalida');
    }

    try {
        const shortUrl=nanoid(8)
   
        return res.status(201).send(shortUrlObj);
    } catch (error) {

        return res.status(500).send(error);
    }
  }
  
  async function getUrl(req, res) {
    const { email, password } = req.body;
    const _id= req.params;
    const isValid = signinSchema.validate({
      email,
      password,
    });
  
    if (isValid.error) {
        return res.status(422).send(isValid.error.details);
    }
    try {

        const user_token = await connection.query(`SELECT password FROM users WHERE email=$1;`,[email]);

        const isValidPass = bcrypt.compareSync(password, user_token.rows[0].password);
    
        if (!user_token || !isValidPass) {
            return res.send(401);
        }
    
        
        return res.status(200);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }

  async function getShortUrl(req, res) {
    const { email, password } = req.body;
    const _id= req.params;
    const isValid = signinSchema.validate({
      email,
      password,
    });
  
    if (isValid.error) {
        return res.status(422).send(isValid.error.details);
    }
    try {

        const user_token = await connection.query(`SELECT password FROM users WHERE email=$1;`,[email]);

        const isValidPass = bcrypt.compareSync(password, user_token.rows[0].password);
    
        if (!user_token || !isValidPass) {
            return res.send(401);
        }
    
        
        return res.status(200);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }

  async function delUrl(req, res) {
    const { email, password } = req.body;
    const _id= req.params;
    const isValid = signinSchema.validate({
      email,
      password,
    });
  
    if (isValid.error) {
        return res.status(422).send(isValid.error.details);
    }
    try {

        const user_token = await connection.query(`SELECT password FROM users WHERE email=$1;`,[email]);

        const isValidPass = bcrypt.compareSync(password, user_token.rows[0].password);
    
        if (!user_token || !isValidPass) {
            return res.send(401);
        }
    
        
        return res.status(200);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }
  
  export { postShorten, getUrl,getShortUrl, delUrl };