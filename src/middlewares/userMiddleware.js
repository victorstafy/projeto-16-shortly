import { connection } from '../db/database.js';

const TABLE = 'users';

async function getUsers(req, res, next) {
    const bearer_token = req.headers.user;
    try{
        let token;
        let user_token_list;

        if (bearer_token){
            token=bearer_token.slice(7);
            user_token_list = await connection.query(`SELECT password FROM users WHERE password=$1;`,[token]);
        }
        else{
            return res.sendStatus(401);
        }

        if (!token) {
            return res.sendStatus(401);
        }

        if (user_token_list.rows.length===0){
            return res.sendStatus(404);
        }
        res.locals.token= token;
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.details);
    }
}

export { getUsers };