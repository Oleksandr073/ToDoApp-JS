import express from "express";
import routes from "./routes/routes.js";

const app = express();

routes(app);


app.use('/', express.static('../client/public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});