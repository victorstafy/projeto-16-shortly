import express from 'express';
import * as controllers from '../controllers/urlController.js';
import * as middlewares from '../middlewares/urlMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', middlewares.postShorten, controllers.postShorten);
router.get('/urls/:id', middlewares.getUrl, controllers.getUrl);
router.get('/urls/open/:shortUrl', middlewares.getShortUrl, controllers.getShortUrl);
router.delete('/urls/:id', middlewares.delUrl, controllers.delUrl);

export default router;