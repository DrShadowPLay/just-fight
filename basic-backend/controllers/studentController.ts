import * as express from "express";
import {
    addOneStudent, addOneStudentToSchool, deleteOneStudentFromSchoool,
    deleteOneStudentGenerel, deleteStudentFromTrainingsplan,
    getAllStudentsFromSchool,
    getAllStudentsGenerell, getAllStudentsthereNotInThisSchool,
    getOneStudent, getOneStudentFromSchool
} from "../models/student";
import {trainingsPlanRouter} from "./trainingsPlanController";

declare module 'express-serve-static-core' {
    export interface Request {
        student_id?: string;
    }
}

const router = express.Router();
router.use('/:student_id/trainingsplan', trainingsPlanRouter);
router.param('student_id', (req: express.Request, res: express.Response, next: express.NextFunction, student_id: any) => {
    req.student_id = student_id;
    next();
});


router.post('/', (req: any, res: any) => { //done
    addOneStudent(req.body.student_name, req.body.student_lastName, req.body.student_age, req.body.student_lvl, req.body.student_mail, req.body.student_telNumber).then(student => {
        console.log(req.body.student_lastName + "student_lastName");
        res.status(200).send(student);
    }).catch(err => {
        res.status(404).send(err);
    });
});

router.post('/:student_id', (req: any, res: any) => {// done
    addOneStudentToSchool(req.school_id, req.params.student_id).then(student => {
        res.status(200).send(student);
    }).catch(err => {
        res.status(400).send(err);
    });

});

router.get('/get', ((req:any, res:any) =>{
    console.log("in gets!!!!")

    getAllStudentsthereNotInThisSchool(req.school_id).then(students=>{
        console.log("in gets")
        res.status(200).send(students);
    }).catch(err=>{
        res.status(400).send(err);
    });
} ))

router.get('/', (_req: any, res: any) => { //done
    if (_req.school_id || _req.teacher_id) {
        getAllStudentsFromSchool(_req.school_id).then(students => {
            console.log(students)
            res.status(200).send(students);
        }).catch(err => {
            res.status(400).send(err);
        });
    } else {
        getAllStudentsGenerell().then(students => {
            res.status(200).send(students);
        }).catch(err => {
            res.status(404).send(err)
        });
    }

});

router.get('/:student_id', (req: any, res: any) => { //done
    if (req.school_id) {
        console.log(req.school_id + "in /:studend_id'" + req.params.student_id);
        getOneStudentFromSchool(req.school_id, req.params.student_id).then(student => {
            res.status(200).send(student);
        }).catch(err => {
            res.status(404).send(err);
        });
    } else {
        getOneStudent(req.params.student_id).then(students => {
            res.status(200).send(students);
        }).catch(err => {
            res.status(404).send(err);
        });
    }

});

router.delete('/:student_id', (req: any, res: any) => { //done
    if (req.school_id) {
        deleteOneStudentFromSchoool(req.school_id, req.params.student_id);
        res.status(200).send();

    } else if (req.trainingsP_id) {
        deleteStudentFromTrainingsplan(req.params.student_id)
        res.status(200).send();

    } else {
        deleteOneStudentGenerel(req.params.student_id);
        res.status(200).send();
    }

});

export {router as studentRouter};


