/*import express from 'express';
import path from 'path';
import { api } from './api'
import {creatTbables} from "./models/db";

const dotenv = require('dotenv');
dotenv.config({ path: './config/appVomProf.env' });

const appVomProf = express();

appVomProf.use('/api', api);

appVomProf.use(express.static(process.env.FRONTEND_DIST_PATH as string));
appVomProf.use((_req, res) => {
  res.sendFile(path.join(__dirname, process.env.FRONTEND_DIST_PATH as string, 'index.html'))
});

appVomProf.listen(process.env.NODE_PORT, () => {
  console.log(`App listening at http://localhost:${process.env.NODE_PORT}`)
});
creatTbables();
*/
