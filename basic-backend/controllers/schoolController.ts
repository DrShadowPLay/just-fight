import express from "express";
import {addSchool, deleteSchool, getAllSchools, getOneSchool} from "../models/school";
import {teacherRouter} from "./teacherController";
import {studentRouter} from "./studentController";




declare module 'express-serve-static-core' {
    export interface Request {
        school_id?: string;
    }
}


const router = express.Router();


router.use('/:school_id/teacher',teacherRouter);
router.use('/:school_id/student', studentRouter);
router.param('school_id', (req: express.Request , res:express.Response, next: express.NextFunction, school_id:any) =>{
    req.school_id = school_id;
    next();
});

router.get('/', (req: any, res: any) => { //done
    getAllSchools().then(school => {
        res.status(200).send(school);
    }).catch(err => {
        res.status(404).send(err);
    });
});
router.get('/:school_id', (req : any , res:any)=>{
   getOneSchool(req.params.school_id).then(school =>{
       res.status(200).send(school);
   }).catch(err =>{
           res.status(404).send(err.message);
       }
   )
});

router.post('/', (req:any, res: any) =>{ // done
addSchool(req.body.school_name, req.body.school_place, req.body.school_plz).then(school=>{
    res.status(200).send(school)
}).catch(err=>{
    res.status(400).send(err);
});
});

router.delete('/:school_id', (req:any, res:any) =>{//done
    console.log(req.params.school_id);
   deleteSchool(req.params.school_id);
    res.status(200).send("geloescht");
});

export {router as schoolRouter};
