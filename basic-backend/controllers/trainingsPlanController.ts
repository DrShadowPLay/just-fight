import * as express from "express";
import {
    addOneTrainingsPlanTostudent,
    addOneTrainingsPlantoTrainingsGroup,
    deleteTrainingsPlanFromStudent, deleteTrainingsPlanFromTrainingsGroup,
    deleteTrainingsPlanGenerell,
    getAllTrainigsplans,
    getTrainingsPlanFromStudent
} from "../models/trainingsplan";

const router = express.Router();

router.post('/', (req: any, res: any) => {
    if (req.query.student_id) {
        addOneTrainingsPlanTostudent(req.query.student_id, req.trainingsplan_date, req.trainingsplan_time);
        res.status(200).send("trainingsplantoStudentaddet")
    } else if (req.query.trainingsGroup_id) {
        addOneTrainingsPlantoTrainingsGroup(req.query.trainingsGroup_id, req.trainingsplan_date, req.trainingsplan_time);
        res.status(200).send("trainingsplantroGroupaddet")
    } else {
        res.status(404).send("bad requst");
    }
});

router.get('/', (req: any, res: any) => {
    if (req.query.student_id) {
        getTrainingsPlanFromStudent(req.query.student_id);
        res.status(200).send("gotTrainingsplanfromstudent");
    } else if (req.query.trainingsGroup_id) {
        res.status(200).send("gtoTrainingsplanFromGroup");
    } else if (req.trainingsP_id) {
        getAllTrainigsplans();
        res.status(200).send("gotAllTrainingsplans");
    } else {
        res.status(400).send("badRequest");
    }
});

router.delete('/:id', (req: any, res: any) => {
    if (req.query.student_id) {
        deleteTrainingsPlanFromStudent(req.query.student_id);
        res.status(200).send("deletedTrainingsPlaFromStudent");
    } else if (req.query.trainingsGroup_id) {
        deleteTrainingsPlanFromTrainingsGroup(req.query.trainingsGroup_id);
        res.status(200).send("deletetTrainingsPlanFromTRainingsGroup");

    } else if (req.trainingsP_id) {
        deleteTrainingsPlanGenerell(req.trainingsP_id);
        res.status(200).send("deletetTrainingsPlanGenerelll");

    } else {
        res.status(400).send("badRequest");
    }
});
