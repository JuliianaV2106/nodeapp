import express, {Express, Request, Response} from 'express';

import {db} from './config/connectionDB';
import {userRouter} from './routes/index';

const app: Express = express();

process.loadEnvFile();

//console.log(process.env.PORT); // For debugging purposes
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter.router);

//en el / puedo defirnir la ruta
app.get("/", (req: Request, res: Response) => {
  res.send('Hello World');
});

db.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});