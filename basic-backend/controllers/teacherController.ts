import * as express from "express";
import {
    addOneTeacherToschoool,
    deleteTeacherFromSchool, delteTeacherGenerell,
    getAllTeachers,
    getOneTeacher,
    getOneTeacherFromSchool
} from "../models/teacher";
import {getAllStudentsFromSchool} from "../models/student";

const router = express.Router();

router.post('/', (req: any, res: any) => { //done
    if (req.school_id) {
        //console.log(req);
        addOneTeacherToschoool(req.school_id, req.body.teacher_name, req.body.teacher_lastName, req.body.teacher_mail, req.body.teacher_telNumber).then(teacher =>{
            res.status(200).send(teacher);

        }).catch(err =>{
            res.status(404).send(err);

        });
    } else {
        res.status(404).send("erro by adding a teacher");
    }
});

router.get('/', (_req: any, res: any) => {//done
    getAllTeachers().then(teachers => {
        res.status(200).send(teachers)

    }).catch(err => {
        res.status(404).send(err.message + err);
    });


});

router.get('/:teacher_id', ((req: any, res: any) => { //done
    if (req.school_id) {//done
        getOneTeacherFromSchool(req.school_id , req.params.teacher_id).then(teacher => {
            res.status(200).send(teacher);
        }).catch(err => {
            res.status(404).send(err.message, +err);
        });
    } else {
        getOneTeacher(req.params.teacher_id).then(teacher => { // done
            res.status(200).send(teacher);
        }).catch(err => {
            res.status(404).send(err.message, +err);
        });
    }
}));


router.delete('/:teacher_id', (req: any, res: any) => { //done
    if (req.school_id) {
        deleteTeacherFromSchool(req.params.teacher_id, req.school_id);
        res.status(200).send("teacher deletet");
    } else { //done
        delteTeacherGenerell(req.params.teacher_id);
        res.status(200).send("teacher geloescht");
    }

});


export {router as teacherRouter};
