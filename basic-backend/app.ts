import express from 'express';

const app = express();
import {api} from "./api";
import {creatTbables} from "./models/db";

app.use(express.json());
app.use('/api', api);
app.use('/', (_rep: express.Request, res: express.Response) => {
    res.status(200);
    res.send("Hello and WElcome");

});

app.listen(3000, () => {
    console.log('Backend listening at http://localhost:3000');
})
creatTbables();



