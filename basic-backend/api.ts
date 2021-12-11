import * as express from "express";
import * as logger from './util/logger'
import {schoolRouter} from "./controllers/schoolController";
import {trainingsGroupRouter} from "./controllers/trainingsGroupController";
import {trainingsPlanRouter} from "./controllers/trainingsPlanController";
import {studentRouter} from "./controllers/studentController";
import {teacherRouter} from "./controllers/teacherController";
import {uebungsRouter} from "./controllers/uebungenController";
import cors from 'cors';


let router = express.Router();
router.use(cors());
router.use(logger.logToConsole);
router.use(express.json());
router.use('/school', schoolRouter);
router.use('/trainingsGroup', trainingsGroupRouter);
router.use('/trainingsplan', trainingsPlanRouter);
router.use('/student', studentRouter);
router.use('/teacher',teacherRouter);
router.use('/uebunge', uebungsRouter);
router.use('/', (_req: express.Request, res: express.Response) => {
    res.status(200);
    res.send("start api!");
});
router.use((_req: express.Request, res: express.Response) => {
    res.status(404)
    res.send('Route does not exist');

});

export {router as api}
