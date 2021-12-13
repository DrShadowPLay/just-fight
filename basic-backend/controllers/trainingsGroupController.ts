import * as express from "express";

import {uebungsRouter} from "./uebungenController";
import {
    addTrainingsGroup,
    deleteTrainingsGroup,
    getAllTrainingsGroups,
    getOneTrainierGroup
} from "../models/trainingsgroups";
import {verbose} from "sqlite3";
import {trainingsPlanRouter} from "./trainingsPlanController";

declare module 'express-serve-static-core' {
    export interface Request {
        trainingsGroup_id?: string;
    }
}


let router = express.Router();


router.use('/:trainingsGroup_id/uebungen', uebungsRouter);
router.use('/:trainingsGroup_id/trainingsplan', trainingsPlanRouter);
router.param('trainingsGroup_id', (req: express.Request, res: express.Response, next: express.NextFunction, trainingsGroup_id: any) => {
    req.trainingsGroup_id = trainingsGroup_id;
    next();
});


router.get('/:trainingsGroup_id/', (req: any, res: any) => {  //done
    getOneTrainierGroup(req.params.trainingsGroup_id).then(trainingsGroup => {
        res.status(200).send(trainingsGroup);
    }).catch(err => {
        res.status(404).send(err);
    });
});


router.get('/', (_req: any, res: any) => { // done
    getAllTrainingsGroups().then(trainingsGroups => {
        res.status(200).send(trainingsGroups);
    }).catch(err => {
        res.status(404).send(err);
    });
});

router.post('/', (req: any, res: any) => { //done
    addTrainingsGroup(req.body.trainingsGroup_name, req.body.trainingsGroup_difficulty, req.body.trainingsGroup_duration).then(trainingsG => {
        res.status(200).send();
        console.log(trainingsG);
    }).catch(err => {
        res.status(400).send(err);
    });
});

router.delete('/:trainingsGroup_id', (req: any, res: any) => { //done
    deleteTrainingsGroup(req.trainingsGroup_id);
    res.status(200).send("TrainingGruppe gelöscht");
});

export {router as trainingsGroupRouter};
