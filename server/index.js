import express, { json } from 'express';
import routes from './routes/routes.js';

const app = express();

app.use(json());
routes(app);


app.use('/', express.static('../client/public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});