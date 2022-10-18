import { connection } from '../db/database.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const TABLE = 'users';

async function postShorten(req, res) {
  const user_id=res.locals.user_id;
  const { url } = req.body;

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
  const url_obj=res.locals.url_obj;

  try {

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
    const url_obj_short=res.locals.url_obj_short;
    try {
 
      res.redirect(url_obj_short.rows[0].url);
      const InsertVisit=await connection.query(`INSERT INTO visits ("urlId","createdAt") VALUES ($1,$2)`,
      [url_obj_short.rows[0].id,dayjs().format('DD/MM/YYYY HH:mm:ss')]);

        return res.status(200);
    } catch (error) {
      console.log(error);
      return res.send(500);
    }
  }

async function delUrl(req, res) {
  const user_id=res.locals.user_id;
  const url_id= req.params;

  try {

      const url_obj_del = await connection.query(`SELECT "shortUrl" FROM urls WHERE "id"=$1;`,[url_id.id]);

      const user_shortUrlsNumber = await connection.query(
        `SELECT 
          COUNT(urls."shortUrl") AS "shortUrlNumber"
        FROM users 
        JOIN urls ON  users.id=urls."userId"
        WHERE users.id=$1 AND urls."shortUrl" LIKE $2;`,
        [user_id,url_obj_del.rows[0].shortUrl]);

      if (Number(user_shortUrlsNumber.rows[0].shortUrlNumber)===0) {
          return res.send(401);
      }
  
      const del_shortUrls_visits = await connection.query(
        `DELETE FROM visits WHERE "urlId" = $1;`,
        [Number(url_id.id)]);

      const del_shortUrls_urls = await connection.query(
        `DELETE FROM urls WHERE id = $1;`,
        [Number(url_id.id)]);

      return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.send(500);
  }
}
  
  export { postShorten, getUrl,getShortUrl, delUrl };