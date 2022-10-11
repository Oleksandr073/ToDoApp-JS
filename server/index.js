import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
routes(app);
app.use(errorMiddleware);

app.use('/', express.static('../client/public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});