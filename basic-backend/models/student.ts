import {db} from "./db";
import {getTrainingsPlanFromStudent, trainingsplan} from "./trainingsplan";
import {getAllUebungenFromTrainingsplan, uebungen} from "./uebungen";


export interface student {
    student_id: number,
    student_name: string,
    stundent_lastName: string,
    student_age: number,
    student_lvl: number,
    student_mail: string,
    student_telNumber: number,
    trainingsPlan: trainingsplan
}


export function getAllStudentsGenerell(): Promise<student[]> {
    return new Promise<student[]>((resolve, reject) => {
        let sudentArray : student[]  = [];
        db.all('SELECT * FROM Student;', (err, studentRow) => {
            if (err) {
                reject(err);
                console.log(err.message + "erro in getAllStudentsGenerell ");
            } else if (studentRow) {
                for (const studenRowElement of studentRow) {
                    let  trainingsPOfStudent : trainingsplan
                    db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?;', [studenRowElement.student_id], async (err, trainingsPlanRow) => {
                        if (err) {
                            console.log(err.message + " erro in getAllStudentsGenerell trainingsPlanRow");
                            reject(err);
                        } else if (trainingsPlanRow) {
                             trainingsPOfStudent = await getTrainingsPlanFromStudent(studenRowElement.student_id)
                        }
                        let thisStudent: student = {
                            student_id: studenRowElement.student_id,
                            student_name: studenRowElement.student_name,
                            stundent_lastName: studenRowElement.stundent_lastName,
                            student_age: studenRowElement.student_age,
                            student_lvl: studenRowElement.student_lvl,
                            student_mail: studenRowElement.student_mail,
                            student_telNumber: studenRowElement.student_telNumber,
                            trainingsPlan: trainingsPOfStudent

                        }
                        sudentArray.push(thisStudent);
                    });

                }
                resolve(sudentArray);
            }
            else {
                console.log("erro in else getAllStudentsGenerell ");
            }
        });
    });
}

export function getOneStudent(student_id:number) : Promise<student>{
    return  new Promise<student>((resolve, reject)=>{
        let trainingsPOfStudend: trainingsplan;
       db.get('SELECT * From Student WHERE student_id  =?;' , [student_id], (err , studentRow) =>{
           if (err){
               console.log(err.message + "erro in getOneStudent");
               reject(err);
           }
           else if (studentRow){
               db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?;', [studentRow.student_id], async (err, trainingsPlanRow) => {
                   if (err) {
                       console.log(err.message + " erro in getAllStudentsGenerell trainingsPlanRow");
                       reject(err);
                   } else if (trainingsPlanRow) {
                       trainingsPOfStudend = await getTrainingsPlanFromStudent(studentRow.student_id);

                   }

                   let thisStudent: student = {
                       student_id : studentRow.student_id,
                       student_name: studentRow.student_name,
                       stundent_lastName: studentRow.stundent_lastName,
                       student_age: studentRow.student_age,
                       student_lvl: studentRow.student_lvl,
                       student_mail: studentRow.student_mail,
                       student_telNumber: studentRow.student_telNumber,
                       trainingsPlan: trainingsPOfStudend
                   }
                   resolve(thisStudent);
               });

           }
           else {
               reject("bad Requst");
           }

       });
    });
}

export  function getOneStudentFromSchool(school_id: number , student_id: number): Promise<student>{
    return new Promise<student>((resolve, reject) =>{
        db.get('SELECT s.student_id , s.student_name , s.stundent_lastName , s.student_age , s.student_lvl , s.student_mail , s.student_telNumber FROM Student s, SchoStud o , WHERE  s.student_id = ? AND s.student_id = o.student_id AND o.school_id = ?;', [student_id, school_id], (err, studentRow) =>{
           if (err){
               console.log(err.message + " erro in  getOneStudentFromSchool");
               reject(err);
           }
           else if(studentRow) {
               let trainingsPOfStudend : trainingsplan;
               db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?;', [studentRow.student_id], async (err, trainingsPlanRow) => {
                   if (err) {
                       console.log(err.message + " erro in getAllStudentsGenerell trainingsPlanRow");
                       reject(err);
                   } else if (trainingsPlanRow) {
                       trainingsPOfStudend = await getTrainingsPlanFromStudent(studentRow.student_id);

                   }
                   let thisStudent : student = {
                       student_id : studentRow.student_id,
                       student_name: studentRow.student_name,
                       stundent_lastName: studentRow.stundent_lastName,
                       student_age: studentRow.student_age,
                       student_lvl: studentRow.student_lvl,
                       student_mail: studentRow.student_mail,
                       student_telNumber: studentRow.student_telNumber,
                       trainingsPlan: trainingsPOfStudend
                   }
                   resolve(thisStudent);

               });


           }
           else{
               reject("bad requst");
           }
        });
    });
}

export function getAllStudentsFromSchool(school_id : number): Promise<student[]> {
    return new Promise<student[]>((resolve , reject)  => {
        db.all('SELECT s.student_id , s.student_name , s.stundent_lastName , s.student_age , s.student_lvl , s.student_mail , s.student_telNumber FROM Student s, SchoStud o WHERE s.student_id = o.student_id AND o.school_id = ?;' , [school_id], (err, studentRow)  => {
           if (err){
               console.log(err.message + " erro in getAllStudentsFromSchool ");
               reject(err);

           }

           else if(studentRow){
               let trainingsPOfStudend : trainingsplan;
               let studentArray: student[] =[];
               for (const studentRowElement of studentRow){
                   db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?;', [studentRowElement.student_id], async (err, trainingsPlanRow) => {
                       let thisStudnet: student = {
                           student_id : studentRowElement.student_id,
                           student_name: studentRowElement.student_name,
                           stundent_lastName: studentRowElement.stundent_lastName,
                           student_age: studentRowElement.student_age,
                           student_lvl: studentRowElement.student_lvl,
                           student_mail: studentRowElement.student_mail,
                           student_telNumber: studentRowElement.student_telNumber,
                           trainingsPlan: trainingsPOfStudend
                       }
                       studentArray.push(thisStudnet);
                   });
               }
               resolve(studentArray);
           }
           else{
               reject("bad request");
           }
        });
    })
}

export async function addOneStudent(student_name: string, student_lastName : string , student_age: number , student_lvl : number, student_mail: string , student_telNumber: string){
    db.run('INSERT INTO Student(student_id, student_name, student_lastName, student_age, student_lvl, student_mail, student_telNumber) VALUE (?,?,?,?,?,?,?);', [await getNextfreeIndexOfStudent(getAllStudentsGenerell()), student_name,student_lastName,student_age, student_lvl , student_mail, student_telNumber] , (err)=>{
       if (err){
           console.log(err.message + "erro in addOneStudent");
       }
       else{
           console.log("studentGeaddet");
       }
    });
}

export function deleteOneStudentGenerel(student_id :number){
    db.run('DELETE FROM SchoStud WHERE student_id = ?;' , [student_id] ,(err)=>{
        if (err){
            console.log(err.message +"erro in deleteOneStudentGenerel  SchoStud");
        }
        else {
            console.log("in schule gelöescht und");
        }
    });
    db.run('DELETE FROM Stundent  WHERE student_id =  ?;' ,[student_id], (err)=>{
        if (err){
            console.log(err.message + " erro in deleteOneStudentGenerel Stundent " );
        }
        else{
            console.log("student deleted");
        }
    });

    deleteStudentFromTrainingsplan(student_id);
}

export function  deleteStudentFromTrainingsplan(student_id:number){
    db.run('DELETE FROM TrainingsPlan WHERE student_id = ? ;' , [student_id], (err)=>{
     if (err){
         console.log(err.message + "erro in deleteStudentFromTrainingsplan");

     }
     else{
         console.log("student from trainingsplan gelöscht");
     }
    });
}

export function deleteOneStudentFromSchoool(school_id: number, student_id: number){
    db.run('DELETE FROM SchoStud WHERE school_id = ? AND  student_id = ?;' , [school_id, student_id] , (err)=>{
        if (err){
            console.log(err.message + " erro in deleteOneStudentGenerel ");
        }
        else{
            console.log("student form school gelöscht");
        }
    });
}




export async function getNextfreeIndexOfStudent(array: Promise<Array<any>>): Promise<number> {
    for (let index = 0; index < (await array).length; index++) {
        if ((await array).indexOf(index)) {
            return index;
        }
    }

    return (await array).length;

}


