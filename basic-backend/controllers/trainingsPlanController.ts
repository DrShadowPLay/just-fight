import * as express from "express";
import {
    addOneTrainingsPlanTostudent, addOneTrainingsPlanTostudentWithGroup,
    addOneTrainingsPlantoTrainingsGroup, addOneTrainingsPlantoTrainingsGroupWithStudent,
    deleteTrainingsPlanFromStudent, deleteTrainingsPlanFromTrainingsGroup,
    deleteTrainingsPlanGenerell,
    getAllTrainigsplans, getOneTrainigsplan,
    getTrainingsPlanFromStudent, getTrainingsPlanFromTraininsGroup
} from "../models/trainingsplan";
import {uebungsRouter} from "./uebungenController";

const router = express.Router();

declare module 'express-serve-static-core' {
    export interface Request {
        trainingsP_id?: string;
    }
}

router.use('/:trainingsP_id/uebungen', uebungsRouter);
router.param('trainingsP_id', (req: express.Request, res:express.Response, next: express.NextFunction, trainingsP_id: any) =>{
    req.trainingsP_id = trainingsP_id;
    next();
});
router.post('/', (req: any, res: any) => { //done
    if (req.student_id) { //done
        console.log("go to addOneTrainingsPlanTostudent ");
        if(req.body.trainingsGroup_id){
            addOneTrainingsPlanTostudentWithGroup(req.student_id, req.body.trainingsGroup_id,req.body.trainingsplan_date, req.body.trainingsplan_time).then(trainingsPlan => {
                res.status(200).send(trainingsPlan)

            }).catch(err => {
                res.status(404).send(err);
            });
        }
        else{
            addOneTrainingsPlanTostudent(req.student_id, req.body.trainingsplan_date, req.body.trainingsplan_time).then(trainingsPlan => {
                res.status(200).send(trainingsPlan)

            }).catch(err => {
                res.status(404).send(err);
            });
        }
    } else if (req.trainingsGroup_id) {
        if(req.body.student_id){
            console.log("go to addOneTrainingsPlantoTrainingsGroup");
            addOneTrainingsPlantoTrainingsGroupWithStudent(req.trainingsGroup_id,req.body.student_id,  req.body.trainingsplan_date, req.body.trainingsplan_time).then(trainingsPlan => {
                res.status(200).send(trainingsPlan)

            }).catch(err => {
                res.status(404).send(err);
            });
        }
        else{
            console.log("go to addOneTrainingsPlantoTrainingsGroup");
            addOneTrainingsPlantoTrainingsGroup(req.trainingsGroup_id, req.body.trainingsplan_date, req.body.trainingsplan_time).then(trainingsPlan => {
                res.status(200).send(trainingsPlan)

            }).catch(err => {
                res.status(404).send(err);
            });
        }

    } else {
        res.status(404).send("bad requst");
    }
});

router.get('/', (req: any, res: any) => {//done
    if (req.student_id) {//done
        console.log("get trainingsP from student");
        getTrainingsPlanFromStudent(req.student_id).then(trainingsPlans => {
            res.status(200).send(trainingsPlans);

        }).catch(err => {
            res.status(400).send(err);
        });
    } else if (req.trainingsGroup_id) {//done
        console.log("heelo in trainingsGroup")
        getTrainingsPlanFromTraininsGroup(req.trainingsGroup_id).then(trainingsG => {
            res.status(200).send(trainingsG);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

     else {
        getAllTrainigsplans().then(trainingsPlans => {
            res.status(200).send(trainingsPlans);

        }).catch(err => {
            res.status(400).send(err);
        });    }
});


router.get('/:trainingsP_id', (req:any, res:any) =>{ //done
    getOneTrainigsplan(req.params.trainingsP_id).then(trainingsPlan =>{ //done
        res.status(200).send(trainingsPlan);
    }).catch(err =>{
        res.status(404).send(err);
    });
})

router.delete('/:trainingsP_id', (req: any, res: any) => {//done
    if (req.student_id) { //done
        deleteTrainingsPlanFromStudent(req.student_id);
        res.status(200).send("deletedTrainingsPlaFromStudent");
    } else if (req.trainingsGroup_id) {
        deleteTrainingsPlanFromTrainingsGroup(req.trainingsGroup_id);
        res.status(200).send("deletetTrainingsPlanFromTRainingsGroup");

    } else {
        console.log( req.params.trainingsP_id);
        deleteTrainingsPlanGenerell(req.params.trainingsP_id);
        res.status(200).send("deletetTrainingsPlanGenerelll");


    }
});

export {router as trainingsPlanRouter};
