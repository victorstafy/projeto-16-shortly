import express from 'express';
import { postShorten, getUrl,getShortUrl, delUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/urls/shorten', postShorten);
router.get('/urls/:id', getUrl);
router.get('/urls/open/:shortUrl', getShortUrl);
router.delete('/urls/:id', delUrl);

export default router;