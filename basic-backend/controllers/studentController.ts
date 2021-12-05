import * as express from "express";
import {
    addOneStudent, deleteOneStudentFromSchoool,
    deleteOneStudentGenerel, deleteStudentFromTrainingsplan,
    getAllStudentsFromSchool,
    getAllStudentsGenerell,
    getOneStudent
} from "../models/student";


const router = express.Router();

router.post('/' ,(req:any , res:any) =>{
    addOneStudent(req.body.student_name , req.body.student_lastName , req.body.student_age, req.body.student_lvl  ,req.body.student_mail, req.body.student_telNumber);
    res.status(200).send("student geaddet");
});

router.get('/' ,(_req: any , res:any) =>{
    if(_req.query.school_id) {
        getAllStudentsFromSchool(+_req.query.school_id)
    }
    else{
        getAllStudentsGenerell();
        res.status(200).send("allStudents");
    }

});

router.get('/:studend_id' , (req:any , res: any) =>{
    getOneStudent(req.student_id).then(students => {
        res.status(200).send("this students");
    }).catch(err  =>{
        res.status(404).send("keine solche schule");
    });
});

router.delete('/:student_id', (req: any, res:any) =>{
    if(req.query.school_id){
        deleteOneStudentFromSchoool(req.query.school_id , req.student_id);
        res.status(200).send("studentGelöscht from school");

    }
    else if(req.query.trainingsplan_id){
        deleteStudentFromTrainingsplan(req.student_id)
        res.status(200).send("studentGelöscht from trainingsPlan");

    }
    else{
        deleteOneStudentGenerel(req.student_id);
        res.status(200).send("studentGelöscht");
    }

});

export{router as studentRouter};


