import * as express from "express";
import {
    addOneTeacherToschoool,
    deleteTeacherFromSchool,
    getAllTeachers,
    getOneTeacher,
    getOneTeacherFromSchool
} from "../models/teacher";
import {getAllStudentsFromSchool} from "../models/student";

const router = express.Router();
router.post('/', (req: any, res: any) => {
    if (req.query.school_id) {
        addOneTeacherToschoool(+req.query.school_id, req.body.teacher_name, req.body.teacher_lastName, req.body.teacher_mail, req.body.teacher_telNumber);
        res.status(200).send("this Teacher was searched");
    } else {
        res.status(404).send("teacher not existing");
    }
});

router.get('/', (_req: any, res: any) => {
    getAllTeachers().then(getAllTeachers => {
        res.status(200).send("allteachers")

    }).catch(err => {
        res.status(404).send(err.message + " Bad Request");
    });


});

router.get('/:teacher_id', ((req: any, res: any) => {
    if (req.query.school_id) {
        getOneTeacherFromSchool(+req.school_id).then(teacher => {
            res.status(200).send("this Teacher");
        }).catch(err => {
            res.status(404).send(err.message, +" Erro getOneTeacherFromSchool");
        });
    } else {
        getOneTeacher(req.teacher_id).then(teacher => {
            res.status(200).send("this Teacher");
        }).catch(err => {
            res.status(404).send(err.message, +" Erro getOneTeacherFromSchool");
        });
    }
}));


router.delete('/:teacher_id', (req: any, res: any) => {
    if (req.query.school_id) {
        deleteTeacherFromSchool(req.teacher_id, +req.query.school_id);
        res.status(200).send("teacher deletet");
    } else {
        res.status(400).send(" bad request");
    }

});


export {router as teacherRouter};
