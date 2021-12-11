import {db} from "./db"
import {teacher} from "../types/teacher-interface";
import {student} from "../types/student-interface";
import {trainingsplan} from "../types/trainingsplan-interface";
import {uebungen} from "../types/uebungs-interface";



export function getOneTeacher(teacher_id: number): Promise<teacher> {
    return new Promise<teacher>((resolve, reject) => {
        db.get('SELECT * FROM Teacher WHERE  teacher_id =? ', [teacher_id], (err, teacherRow) => {
            if (err) {
                reject(err);
            } else if (teacherRow) {
                let studentsFromTeacherArray: student[] = [];
                db.all('SELECT s.* FROM Student s, TeachStu t  WHERE s.student_id = t.student_id AND t.teacher_id = ?;', [teacher_id], (err, studenetRow) => {
                    if (err) {
                        reject(err);
                    } else if (studenetRow) {
                        let trainingsplanArray: trainingsplan[];
                        for (const studentRowElement of studenetRow) {
                            db.all('SELECT * FROM TrainingsPlan WHERE student_id = ?', [studentRowElement.student_id], (err, trainingsPlanRow) => {

                                if (err) {
                                    reject(err);
                                } else if (trainingsPlanRow && trainingsPlanRow[0]) {
                                    let uebungenArray: uebungen[] = [];
                                    for (const trainingsPlanRowElement of trainingsPlanRow) {
                                        let thisTrainingsPlan: trainingsplan = {
                                            student_id: trainingsPlanRowElement.student_id,
                                            trainingsGroup_id: trainingsPlanRowElement.trainingsGroup_id,
                                            trainingsP_id: trainingsPlanRowElement.trainingsP_id,
                                            trainingsplan_time: trainingsPlanRowElement.trainingsplan_time,
                                            trainingsplan_date: trainingsPlanRowElement.trainingsplan_date,
                                            uebunge: uebungenArray
                                        }
                                        trainingsplanArray.push(thisTrainingsPlan);
                                    }

                                    let thisStudent: student = {
                                        student_id: studentRowElement.student_id,
                                        student_name: studentRowElement.student_name,
                                        student_lastName: studentRowElement.student_lastName,
                                        student_age: studentRowElement.student_age,
                                        student_lvl: studentRowElement.student_lvl,
                                        student_mail: studentRowElement.student_mail,
                                        student_telNumber: studentRowElement.student_telNumber,
                                        trainingsPlan: trainingsplanArray

                                    }
                                    studentsFromTeacherArray.push(thisStudent);

                                } else {
                                    let thisStudent: student = {
                                        student_id: studentRowElement.student_id,
                                        student_name: studentRowElement.student_name,
                                        student_lastName: studentRowElement.student_lastName,
                                        student_age: studentRowElement.student_age,
                                        student_lvl: studentRowElement.student_lvl,
                                        student_mail: studentRowElement.student_mail,
                                        student_telNumber: studentRowElement.student_telNumber,
                                        trainingsPlan: trainingsplanArray

                                    }
                                    studentsFromTeacherArray.push(thisStudent);
                                }

                            });

                        }
                        let thisTeacher: teacher = {
                            teacher_id: teacherRow.teacher_id,
                            school_id: teacherRow.school_id,
                            teacher_name: teacherRow.teacher_name,
                            teacher_lastName: teacherRow.teacher_lastName,
                            teacher_mail: teacherRow.teacher_mail,
                            teacher_telNumber: teacherRow.teacher_telNumber,
                            students: studentsFromTeacherArray
                        }

                        resolve(thisTeacher);

                    } else {
                        reject("bad Request");
                    }

                });
            }
            else {
                reject("bad request");
            }
        });
    });
}

export function getAllTeachers(): Promise<teacher[]> {
    return new Promise<teacher[]>((resolve, reject) => {
        let anzahlteacher: number
        let teachersArray: teacher[] = [];
        db.all('SELECT * FROM  Teacher', (err, teacherRow) => {
            if (err) {
                reject(err);
            } else if (teacherRow && teacherRow[0]) {
                anzahlteacher = teacherRow.length;
                let couter: number = 0;
                let studetsInTeacherArray: student[] = [];
                for (const teacherRowElement of teacherRow) {
                    db.all('SELECT s.* from Student s , TeachStu t WHERE  s.student_id = t.student_id AND t.teacher_id =? ;', [teacherRowElement.teacher_id], (err, studentRow) => {
                        couter = couter + 1;
                        if (err) {
                            reject(err);
                        } else if (studentRow) {
                            let trianingsPlanArray: trainingsplan[] = [];
                            for (const studentRowElement of studentRow) {
                                db.all('SELECT * FROM TrainingsPlan WHERE trainingsP_id =?;' [studentRowElement.trainingsP_id], (err, trainigsPlanRow) => {
                                    if (err) {
                                        reject(err);
                                    } else if (trainigsPlanRow && trainigsPlanRow[0]) {
                                        let uebungsArray: uebungen[] = [];
                                        for (const trainigsPlanRowElement of trainigsPlanRow) {
                                            let thisTrainingsPlan: trainingsplan = {
                                                trainingsP_id: trainigsPlanRowElement.trainingsP_id,
                                                student_id: trainigsPlanRowElement.student_id,
                                                trainingsGroup_id: trainigsPlanRowElement.trainingsGroup_id,
                                                trainingsplan_date: trainigsPlanRowElement.trainingsplan_date,
                                                trainingsplan_time: trainigsPlanRowElement.trainingsplan_time,
                                                uebunge: uebungsArray
                                            }
                                            trianingsPlanArray.push(thisTrainingsPlan);
                                        }
                                        let thisStudent: student = {
                                            student_id: studentRowElement.student_id,
                                            student_name: studentRowElement.student_name,
                                            student_lastName: studentRowElement.student_lastName,
                                            student_age: studentRowElement.student_age,
                                            student_lvl: studentRowElement.student_lvl,
                                            student_mail: studentRowElement.student_mail,
                                            student_telNumber: studentRowElement.student_telNumber,
                                            trainingsPlan: trianingsPlanArray,

                                        }
                                        studetsInTeacherArray.push(thisStudent);

                                    } else {
                                        let thisStudent: student = {
                                            student_id: studentRowElement.student_id,
                                            student_name: studentRowElement.student_name,
                                            student_lastName: studentRowElement.student_lastName,
                                            student_age: studentRowElement.student_age,
                                            student_lvl: studentRowElement.student_lvl,
                                            student_mail: studentRowElement.student_mail,
                                            student_telNumber: studentRowElement.student_telNumber,
                                            trainingsPlan: trianingsPlanArray,

                                        }
                                        studetsInTeacherArray.push(thisStudent);

                                    }
                                });

                            }
                            let thisTeacher: teacher = {
                                teacher_id: teacherRowElement.teacher_id,
                                school_id: teacherRowElement.school_id,
                                teacher_name: teacherRowElement.teacher_name,
                                teacher_lastName: teacherRowElement.teacher_lastName,
                                teacher_mail: teacherRowElement.teacher_mail,
                                teacher_telNumber: teacherRowElement.teacher_telNumber,
                                students: studetsInTeacherArray
                            }
                            teachersArray.push(thisTeacher);
                            if (couter == anzahlteacher) {
                                resolve(teachersArray);

                            }
                        }

                    });

                }

            } else {
                resolve(teachersArray);
            }


        });
    });
}

export function getOneTeacherFromSchool(school_id: number ,teacher_id:number): Promise<teacher> {
    return new Promise<teacher>((resolve, reject) => {
        db.all('SELECT * FROM Teacher WHERE school_id = ? AND teacher_id = ?;', [school_id ,teacher_id], (err, teacherRow) => {

            if (err) {
                reject(err);
            } else if (teacherRow && teacherRow[0]) {
                let studentsOfTeacher: student[] = [];
                db.all('SELECT s.* From Student s, TeachStu t WHERE s.student_id = t.student_id AND t.teacher_id = ? ;', [teacherRow[0].teacher_id], (err, studentRows) => {
                    if (err) {
                        reject(err);
                    } else if (studentRows) {
                        let trainingsPlanArray: trainingsplan[] = [];
                        let trainingsPlanOfStudent: trainingsplan;
                        for (const studentRowElemt of studentRows) {
                            db.all('SELECT * FROM TrainingsP WHERE student_id  =?', [studentRowElemt.student_id], (err, trainingsPlanRow) => {
                                if (err) {
                                    reject(err);
                                } else if (trainingsPlanRow && trainingsPlanRow[0]) {
                                    let uebungsArray : uebungen[] =[];
                                    for (const trainingsPlanRowElement of trainingsPlanRow) {
                                        let thisTrainingsPlan : trainingsplan ={
                                            trainingsP_id: trainingsPlanRowElement.trainingsP_id,
                                            student_id: trainingsPlanRowElement.student_id,
                                            trainingsGroup_id: trainingsPlanRowElement.trainingsGroup_id,
                                            trainingsplan_date: trainingsPlanRowElement.trainingsplan_date,
                                            trainingsplan_time: trainingsPlanRowElement.trainingsplan_time,
                                            uebunge: uebungsArray
                                        }
                                        trainingsPlanArray.push(thisTrainingsPlan);
                                    }
                                    let thisStudent: student = {
                                        student_id: studentRowElemt.student_id,
                                        student_name: studentRowElemt.student_name,
                                        student_lastName: studentRowElemt.student_lastName,
                                        student_age: studentRowElemt.student_age,
                                        student_lvl: studentRowElemt.student_lvl,
                                        student_mail: studentRowElemt.teacher_mail,
                                        student_telNumber: studentRowElemt.student_telNumber,
                                        trainingsPlan: trainingsPlanArray
                                    }
                                    studentsOfTeacher.push(thisStudent)
                                }
                                else{
                                    let thisStudent: student = {
                                        student_id: studentRowElemt.student_id,
                                        student_name: studentRowElemt.student_name,
                                        student_lastName: studentRowElemt.student_lastName,
                                        student_age: studentRowElemt.student_age,
                                        student_lvl: studentRowElemt.student_lvl,
                                        student_mail: studentRowElemt.teacher_mail,
                                        student_telNumber: studentRowElemt.student_telNumber,
                                        trainingsPlan: trainingsPlanArray
                                    }
                                    studentsOfTeacher.push(thisStudent)
                                }
                            });

                        }
                        let thisTeacher: teacher = {
                            teacher_id: teacherRow[0].teacher_id,
                            school_id: teacherRow[0].school_id,
                            teacher_name: teacherRow[0].teacher_name,
                            teacher_lastName: teacherRow[0].teacher_lastName,
                            teacher_mail: teacherRow[0].student_mail,
                            teacher_telNumber: teacherRow[0].teacher_telNumber,
                            students: studentsOfTeacher
                        }
                        resolve(thisTeacher);
                    } else {
                        reject("bad request");
                    }
                });
            }
        });
    });
}


export async function addOneTeacherToschoool(school_id: number, teacher_name: string, teacherlastName: string, teacher_mail: string, teacher_telNumber: string) {
    db.run('INSERT INTO Teacher(teacher_id, school_id, teacher_name, teacher_lastName, teacher_mail, teacher_telNumber) VALUES (?,?,?,?,?,?);', [getNextfreeIndexOfTeacher(await getAllTeachers()), school_id, teacher_name, teacherlastName, teacher_mail, teacher_telNumber], (err) => {
        if (err) {
            console.log(err.message);
        } else {
        }
    });
}

export function delteTeacherGenerell(teacher_id: number){
    db.run('DELETE FROM TeachStu WHERE teacher_id = ?;' ,[teacher_id] ,(err=>{
        if (err){
            console.log(err.message);

        }
        else
        {
            console.log("lerhre gelöscht");
        }

    }));
    db.run('DELETE FROM Teacher WHERE teacher_id  =?;', [teacher_id] , (err)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("teacher geloescht");
        }
    })
}

export function deleteTeacherFromSchool(teacher_id: number, school_id: number) {
    db.run('DELETE FROM Teacher WHERE teacher_id =? AND  school_id =? ;', [teacher_id, school_id], (err) => {
        if (err) {
            console.log(err.message + " erro in deleteTeacherFromSchool ")

        } else {
            console.log("teacher deletetFrom School");
        }
    });
}
export function getNextfreeIndexOfTeacher(array: teacher[]): number {
    array.sort(function (a, b){return a.teacher_id - b.teacher_id;});


    for (let index = 0; index < array.length; index++) {
        if (array[index].teacher_id != index){
            return index;
        }
    }

    return array.length;

}
