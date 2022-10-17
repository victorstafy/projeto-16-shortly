import bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
import { connection } from '../db/database.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import { signUp, signIn, user_id } from '../controllers/authController.js';


const TABLE = 'users';


async function postShorten(req, res) {
    const bearer_token = req.headers.user;
    let token;
    let user_token_list;

    const { url } = req.body;
    const url_regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    if (bearer_token){
      token=bearer_token.slice(7);
      user_token_list = await connection.query(`SELECT password FROM users;`);
    }
    else{
      return res.sendStatus(401);
    }
  
    if (!token || user_token_list.rows.length===0) {
      return res.sendStatus(401);
    }

    console.log(url)
    if(!url_regex.test(url)){
        return res.status(422).send('Url invalida');
    }

    try {

        const repeatedUrl=await connection.query(
          `SELECT urls."url"
          FROM users 
          JOIN urls ON  users.id=urls."userId"
          WHERE urls."url" LIKE $1 AND users."id"=$2;`,
          [url,user_id]);

        if (repeatedUrl.rowCount>0){
          return res.status(409).send('Url repetida');
        }

        const shortUrl=nanoid(8)
        const InsertUrl=await connection.query(`INSERT INTO urls ("url","shortUrl","userId","createdAt") VALUES ($1,$2,$3,$4)`,
        [url,shortUrl,user_id,dayjs().format('DD/MM/YYYY HH:mm:ss')]);
   
        return res.status(201).send({"shortUrl": shortUrl});
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.details);
    }
  }
  
  async function getUrl(req, res) {
    const _id= req.params;
  
    try {

      const url_obj = await connection.query(`SELECT "url","shortUrl" FROM urls WHERE id=$1;`,[_id.id]);

      if (url_obj.rowCount===0) {
          return res.send(404);
      }
      
      return res.status(200).send({
        "id": _id.id,
        "shortUrl": url_obj.rows[0].shortUrl,
        "url": url_obj.rows[0].url
      });

    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }

  async function getShortUrl(req, res) {
    const shortUrl= req.params;
    
    try {
      const url_obj = await connection.query(`SELECT "url","id" FROM urls WHERE "shortUrl"=$1;`,[shortUrl.shortUrl]);

      if (url_obj.rowCount===0) {
          return res.send(404);
      }
      console.log(url_obj.rows[0].url)
      res.redirect(url_obj.rows[0].url);
      const InsertVisit=await connection.query(`INSERT INTO visits ("urlId","createdAt") VALUES ($1,$2)`,
      [url_obj.rows[0].id,dayjs().format('DD/MM/YYYY HH:mm:ss')]);

        return res.status(200);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }

  async function delUrl(req, res) {
    const url_id= req.params;
    const bearer_token = req.headers.user;
    let token;
    let user_token_list;

    if (bearer_token){
      token=bearer_token.slice(7);
      user_token_list = await connection.query(`SELECT password FROM users;`);
    }
    else{
      return res.sendStatus(401);
    }

    try {

        const url_obj = await connection.query(`SELECT "shortUrl" FROM urls WHERE "id"=$1;`,[url_id.id]);
        if (url_obj.rowCount===0) {
            return res.send(404);
        }

        const user_shortUrlsNumber = await connection.query(
          `SELECT 
            COUNT(urls."shortUrl") AS "shortUrlNumber"
          FROM users 
          JOIN urls ON  users.id=urls."userId"
          WHERE users.id=$1 AND urls."shortUrl" LIKE $2;`,
          [user_id,url_obj.rows[0].shortUrl]);

        console.log(user_shortUrlsNumber.rows[0])

        if (Number(user_shortUrlsNumber.rows[0].shortUrlNumber)===0) {
            return res.send(401);
        }
    
        const del_shortUrls = await connection.query(
          `DELETE FROM urls WHERE id = $1;`,
          [Number(url_id.id)]);

        return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }
  
  export { postShorten, getUrl,getShortUrl, delUrl };