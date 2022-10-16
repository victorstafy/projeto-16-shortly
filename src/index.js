import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import urlRoutes from './routes/urlRoute.js';
import userRoutes from './routes/userRoute.js';

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
server.use(authRoutes);
server.use(urlRoutes);
server.use(userRoutes);

server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})