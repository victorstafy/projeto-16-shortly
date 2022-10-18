import { connection } from '../db/database.js';

const TABLE = 'users';


async function postShorten(req, res, next) {
    
    try { 
        const bearer_token = req.headers.user;
        let token;
        let user_token_list;

        const { url } = req.body;
        const url_regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

        if (bearer_token){
            token=bearer_token.slice(7);
            user_token_list = await connection.query(`SELECT password FROM users WHERE password=$1;`,[token]);
        }
        else{
            return res.sendStatus(401);
        }

        if (!token || user_token_list.rows.length===0) {
            return res.sendStatus(401);
        }

        if(!url_regex.test(url)){
            return res.status(422).send('Url invalida');
        }

        const user_id=await connection.query(`SELECT id FROM users WHERE password=$1;`,[token]);

        res.locals.user_id= user_id.rows[0].id;
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.details);
    }
}
  
async function getUrl(req, res, next) {
    const _id= req.params;

    try {

        const url_obj = await connection.query(`SELECT "url","shortUrl" FROM urls WHERE id=$1;`,[_id.id]);

        if (url_obj.rowCount===0) {
            return res.sendStatus(404);
        }
        res.locals.url_obj = url_obj;
        next();
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
}

async function getShortUrl(req, res, next) {
    const shortUrl= req.params;

    try {
        const url_obj_short = await connection.query(`SELECT "url","id" FROM urls WHERE "shortUrl"=$1;`,[shortUrl.shortUrl]);

        if (url_obj_short.rowCount===0) {
            return res.send(404);
        }
        res.locals.url_obj_short= url_obj_short;
        next();  
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
}

async function delUrl(req, res, next) {
    const url_id= req.params;
    const bearer_token = req.headers.user;
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

    try {

        if (user_token_list.rows.length===0) {
            return res.send(404);
        }

        const user_id=await connection.query(`SELECT id FROM users WHERE password=$1;`,[token]);

        res.locals.user_id= user_id.rows[0].id;
        next(); 
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
}
  
export { postShorten, getUrl,getShortUrl, delUrl };