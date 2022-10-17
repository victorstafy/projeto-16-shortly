import { connection } from '../db/database.js';

const TABLE = 'users';

async function getUsers(req, res) {
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
  
    if (!token || user_token_list.rows.length===0) {
      return res.sendStatus(401);
    }

    const current_user= await connection.query(`SELECT name, id FROM users WHERE password LIKE $1`,[token])

    if (current_user.rowCount===0){
        return res.sendStatus(404);
    }

    try {

        const url_data=await connection.query(
          `SELECT urls."id", urls."shortUrl", urls."url", COUNT(visits."urlId") AS "visitCount"
          FROM users 
          JOIN urls ON  users.id=urls."userId"
          JOIN visits ON  urls.id=visits."urlId"
          WHERE users."password" LIKE $1
          GROUP BY urls."id";`,
          [token]);

        const total_visits=await connection.query(
            `SELECT COUNT(visits."urlId") AS "totalVisits"
            FROM users 
            JOIN urls ON  users.id=urls."userId"
            JOIN visits ON  urls.id=visits."urlId"
            WHERE users."password" LIKE $1;`,
            [token]);

        const user_visit_data={
        "id": current_user.rows[0].id,
            "name": current_user.rows[0].name,
            "visitCount": total_visits.rows[0].totalVisits,
            "shortenedUrls": url_data.rows
        }

        return res.status(200).send(user_visit_data);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.details);
    }
}
  
async function getRanking(req, res) {
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

export { getUsers, getRanking };