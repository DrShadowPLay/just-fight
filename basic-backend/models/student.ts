import {db} from "./db";
import {getTrainingsPlanFromStudent} from "./trainingsplan";
import {getAllUebungenFromTrainingsplan} from "./uebungen";
import {student} from "../types/student-interface";
import {uebungen} from "../types/uebungs-interface";
import {trainingsplan} from "../types/trainingsplan-interface";



export function getAllStudentsGenerell(): Promise<student[]> {
    return new Promise<student[]>((resolve, reject) => {
        let thisStudentArrray: student[] = [];
        let counter: number = 0;
        let anzahlStudents: number = 0;
        db.all('SELECT * FROM Student', (err, studentRow) => {
            if (err) {
                console.log(" erro in getAllStudentsGenerell ");
                reject(err);
            } else if (studentRow && studentRow[0]) {
                anzahlStudents = studentRow.length;
                let trainingsPlanArray: trainingsplan[] = [];
                for (const studentRowElement of studentRow) {
                    db.all('SELECT * FROM TrainingsPlan WHERE student_id  = ?', [studentRowElement.student_id], (err, trainingsPlanRow)=>{
                        counter = counter +1;
                        if (err){
                           console.log(" erro in  getAllStudentsGenerell trainingsPlanRow");
                           reject(err);
                       }
                       else if(trainingsPlanRow && trainingsPlanRow[0]){
                           let uebungsArray :uebungen[] = [];
                           for (const trainingsPlanRowElement of trainingsPlanRow) {
                               let thistrainingsPlan : trainingsplan  ={
                                   trainingsP_id: trainingsPlanRowElement.trainingsP_id,
                                   student_id: trainingsPlanRowElement.student_id,
                                   trainingsGroup_id: trainingsPlanRowElement.trainingsGroup_id,
                                   trainingsplan_date: trainingsPlanRowElement.trainingsplan_date,
                                   trainingsplan_time: trainingsPlanRowElement.trainingsplan_time,
                                   uebunge: uebungsArray
                               }
                               trainingsPlanArray.push(thistrainingsPlan);
                           }
                            let thisStudent: student = {
                                student_id: studentRowElement.student_id,
                                student_name: studentRowElement.student_name,
                                student_lastName: studentRowElement.student_lastName,
                                student_age: studentRowElement.student_age,
                                student_lvl: studentRowElement.student_lvl,
                                student_mail: studentRowElement.student_mail,
                                student_telNumber: studentRowElement.student_telNumber,
                                trainingsPlan : trainingsPlanArray
                            }
                            thisStudentArrray.push(thisStudent);
                            if (counter == anzahlStudents){
                                resolve(thisStudentArrray);
                            }

                       }
                       else {
                            let thisStudent: student = {
                                student_id: studentRowElement.student_id,
                                student_name: studentRowElement.student_name,
                                student_lastName: studentRowElement.student_lastName,
                                student_age: studentRowElement.student_age,
                                student_lvl: studentRowElement.student_lvl,
                                student_mail: studentRowElement.student_mail,
                                student_telNumber: studentRowElement.student_telNumber,
                                trainingsPlan : trainingsPlanArray
                            }
                            thisStudentArrray.push(thisStudent);
                            if (counter == anzahlStudents){
                                resolve(thisStudentArrray);
                            }
                        }

                    });
                }
            }
            else {
                resolve(thisStudentArrray);
            }
        });
    });

}

export function getOneStudent(student_id: number): Promise<student> {
    return new Promise<student>((resolve, reject) => {
        let trainingsPOfStudend: trainingsplan[] = [];
        db.get('SELECT * From Student WHERE student_id  =?;', [student_id], (err, studentRow) => {
            if (err) {
                console.log(err.message + "erro in getOneStudent");
                reject(err);
            } else if (studentRow) {
                db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?;', [studentRow.student_id], async (err, trainingsPlanRow) => {
                    if (err) {
                        console.log(err.message + " erro in getAllStudentsGenerell trainingsPlanRow");
                        reject(err);
                    } else if (trainingsPlanRow) {
                        trainingsPOfStudend = await getTrainingsPlanFromStudent(studentRow.student_id);
                        let thisStudent: student = {
                            student_id: studentRow.student_id,
                            student_name: studentRow.student_name,
                            student_lastName: studentRow.student_lastName,
                            student_age: studentRow.student_age,
                            student_lvl: studentRow.student_lvl,
                            student_mail: studentRow.student_mail,
                            student_telNumber: studentRow.student_telNumber,
                            trainingsPlan: trainingsPOfStudend
                        }
                        resolve(thisStudent);

                    } else {
                        let thisStudent: student = {
                            student_id: studentRow.student_id,
                            student_name: studentRow.student_name,
                            student_lastName: studentRow.student_lastName,
                            student_age: studentRow.student_age,
                            student_lvl: studentRow.student_lvl,
                            student_mail: studentRow.student_mail,
                            student_telNumber: studentRow.student_telNumber,
                            trainingsPlan: trainingsPOfStudend
                        }
                        resolve(thisStudent);
                    }
                });

            } else {
                reject("bad Requst");
            }

        });
    });
}

export function getOneStudentFromSchool(school_id: number, student_id: number): Promise<student> {
    return new Promise<student>((resolve, reject) => {
        db.get('SELECT s.student_id , s.student_name , s.student_lastName , s.student_age , s.student_lvl , s.student_mail , s.student_telNumber FROM Student s, SchoStud o WHERE  s.student_id = ? AND s.student_id = o.student_id AND o.school_id = ?;', [student_id, school_id], (err, studentRow) => {
            if (err) {
                console.log(err.message + " erro in  getOneStudentFromSchool");
                reject(err);
            } else if (studentRow) {
                let trainingsPOfStudend: trainingsplan[];
                db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?;', [studentRow.student_id], async (err, trainingsPlanRow) => {
                    if (err) {
                        console.log(err.message + " erro in getAllStudentsGenerell trainingsPlanRow");
                        reject(err);
                    } else if (trainingsPlanRow) {
                        trainingsPOfStudend = await getTrainingsPlanFromStudent(studentRow.student_id);

                    }
                    let thisStudent: student = {
                        student_id: studentRow.student_id,
                        student_name: studentRow.student_name,
                        student_lastName: studentRow.student_lastName,
                        student_age: studentRow.student_age,
                        student_lvl: studentRow.student_lvl,
                        student_mail: studentRow.student_mail,
                        student_telNumber: studentRow.student_telNumber,
                        trainingsPlan: trainingsPOfStudend
                    }
                    resolve(thisStudent);

                });


            } else {
                reject("bad requst");
            }
        });
    });
}


export function getAllStudentsFromSchool(school_id: number): Promise<student[]> {
    return new Promise<student[]>((resolve, reject) => {
        let thisStudentArrray: student[] = [];
        let counter: number = 0;
        let anzahlStudents: number = 0;
        db.all('SELECT s.* FROM Student s , SchoStud st WHERE s.student_id = st.student_id AND  st.school_id =?', (err, studentRow) => {
            if (err) {
                console.log(" erro in getAllStudentsGenerell ");
                reject(err);
            } else if (studentRow && studentRow[0]) {
                anzahlStudents = studentRow.length;
                let trainingsPlanArray: trainingsplan[] = [];
                for (const studentRowElement of studentRow) {
                    db.all('SELECT * FROM TrainingsPlan WHERE student_id  = ?', [studentRowElement.student_id], (err, trainingsPlanRow)=>{
                        counter = counter +1;
                        if (err){
                            console.log(" erro in  getAllStudentsGenerell trainingsPlanRow");
                            reject(err);
                        }
                        else if(trainingsPlanRow && trainingsPlanRow[0]){
                            let uebungsArray :uebungen[] = [];
                            for (const trainingsPlanRowElement of trainingsPlanRow) {
                                let thistrainingsPlan : trainingsplan  ={
                                    trainingsP_id: trainingsPlanRowElement.trainingsP_id,
                                    student_id: trainingsPlanRowElement.student_id,
                                    trainingsGroup_id: trainingsPlanRowElement.trainingsGroup_id,
                                    trainingsplan_date: trainingsPlanRowElement.trainingsplan_date,
                                    trainingsplan_time: trainingsPlanRowElement.trainingsplan_time,
                                    uebunge: uebungsArray
                                }
                                trainingsPlanArray.push(thistrainingsPlan);
                            }
                            let thisStudent: student = {
                                student_id: studentRowElement.student_id,
                                student_name: studentRowElement.student_name,
                                student_lastName: studentRowElement.student_lastName,
                                student_age: studentRowElement.student_age,
                                student_lvl: studentRowElement.student_lvl,
                                student_mail: studentRowElement.student_mail,
                                student_telNumber: studentRowElement.student_telNumber,
                                trainingsPlan : trainingsPlanArray
                            }
                            thisStudentArrray.push(thisStudent);
                            if (counter == anzahlStudents){
                                resolve(thisStudentArrray);
                            }

                        }
                        else {
                            let thisStudent: student = {
                                student_id: studentRowElement.student_id,
                                student_name: studentRowElement.student_name,
                                student_lastName: studentRowElement.student_lastName,
                                student_age: studentRowElement.student_age,
                                student_lvl: studentRowElement.student_lvl,
                                student_mail: studentRowElement.student_mail,
                                student_telNumber: studentRowElement.student_telNumber,
                                trainingsPlan : trainingsPlanArray
                            }
                            thisStudentArrray.push(thisStudent);
                            if (counter == anzahlStudents){
                                resolve(thisStudentArrray);
                            }
                        }

                    });
                }
            }
            else {
                resolve(thisStudentArrray);
            }
        });
    });

}

export async function addOneStudent(student_name: string, student_lastName: string, student_age: number, student_lvl: number, student_mail: string, student_telNumber: string) {
    console.log("studnet_lastName : " + student_lastName);
    db.run('INSERT INTO Student(student_id, student_name, student_lastName, student_age, student_lvl, student_mail, student_telNumber) VALUES (?,?,?,?,?,?,?);', [getNextfreeIndexOfStudent(await getAllStudentsGenerell()), student_name, student_lastName, student_age, student_lvl, student_mail, student_telNumber], (err) => {
        if (err) {
            console.log(err.message + "erro in addOneStudent");
        } else {
            console.log("studentGeaddet");
        }
    });
}

export async function addOneStudentToSchool(school_id: number, student_id: number) {
    db.run('INSERT INTO SchoStud(school_id, student_id) VALUES (?,?);', [school_id, student_id], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("schueler zu schule geadeet");
        }
    });
}

export async function addOneStudentToTeacher(teacher_id: number, student_id: number) {
    db.run('INSERT INTO TeachStu(teacher_id, student_id) VALUES (?,?);', [teacher_id, student_id], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("schueler zu teacher geadeet");
        }
    });
}

export function deleteOneStudentGenerel(student_id: number) {
    db.run('DELETE FROM SchoStud WHERE student_id = ?;', [student_id], (err) => {
        if (err) {
            console.log(err.message + "erro in deleteOneStudentGenerel  SchoStud");
        } else {
            console.log("in schule gelöescht und");
        }
    });
    db.run('DELETE FROM Student  WHERE student_id =  ?;', [student_id], (err) => {
        if (err) {
            console.log(err.message + " erro in deleteOneStudentGenerel Stundent ");
        } else {
            console.log("student deleted");
        }
    });

    deleteStudentFromTrainingsplan(student_id);
}

export function deleteStudentFromTrainingsplan(student_id: number) {
    db.run('DELETE FROM TrainingsPlan WHERE student_id = ? ;', [student_id], (err) => {
        if (err) {
            console.log(err.message + "erro in deleteStudentFromTrainingsplan");

        } else {
            console.log("student from trainingsplan gelöscht");
        }
    });
}

export function deleteOneStudentFromSchoool(school_id: number, student_id: number) {
    db.run('DELETE FROM SchoStud WHERE school_id = ? AND  student_id = ?;', [school_id, student_id], (err) => {
        if (err) {
            console.log(err.message + " erro in deleteOneStudentGenerel ");
        } else {
            console.log("student form school gelöscht");
        }
    });
}

export function getNextfreeIndexOfStudent(array: student[]): number {
    array.sort(function (a, b){return a.student_id - b.student_id;});


    for (let index = 0; index < array.length; index++) {
        if (array[index].student_id != index){
            return index;
        }
    }

    return array.length;

}
