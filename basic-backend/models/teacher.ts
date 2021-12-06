import {db} from "./db"
import {student} from "./student";
import {trainingsplan} from "./trainingsplan";

export interface teacher {
    teacher_id: number,
    school_id: number,
    teacher_name: string,
    teacher_lastName: string,
    teacher_mail: string,
    teacher_telNumber: string,
    students: student[]
}


export function getOneTeacher(teacher_id: number): Promise<teacher> {
    return new Promise<teacher>((resolve, reject) => {
        db.get('SELECT * FROM Teacher WHERE  teacher_id =? ', [teacher_id], (err, teacherRow) => {
            if (err) {
                console.log(err.message + " erro in getOneTeacher");
                reject(err);
            } else if (teacherRow && teacherRow[0]) {
                let studentsFromTeacherArray: student[] = [];
                db.all('SELECT s.* FROM Student s, TeachStu t  WHERE s.student_id = t.student_id AND t.teacher_id = ?;', [teacher_id], (err, studenetRow) => {
                    if (err) {
                        reject(err);
                    } else if (studenetRow) {
                        let thisTraininsPlan: trainingsplan;
                        for (const studentRowElement of studenetRow) {
                            db.get('SELECT * FROM TrainingsPlan WHERE student_id = ?', [studentRowElement.student_id], (err, trainingsPlanRow) => {

                                if (err) {
                                    console.log(err.message + " erro in getOneTeacher ");
                                    reject(err);
                                } else {
                                    thisTraininsPlan = trainingsPlanRow;

                                    let thisStudent: student = {
                                        student_id: studentRowElement.student_id,
                                        student_name: studentRowElement.student_name,
                                        student_lastName: studentRowElement.student_lastName,
                                        student_age: studentRowElement.student_age,
                                        student_lvl: studentRowElement.student_lvl,
                                        student_mail: studentRowElement.student_mail,
                                        student_telNumber: studentRowElement.student_telNumber,
                                        trainingsPlan: thisTraininsPlan

                                    }
                                    studentsFromTeacherArray.push(thisStudent);
                                }


                            });

                        }
                        let thisTeacher: teacher = {
                            teacher_id: teacherRow[0].teacher_id,
                            school_id: teacherRow[0].school_id,
                            teacher_name: teacherRow[0].teacher_name,
                            teacher_lastName: teacherRow[0].teacher_lastName,
                            teacher_mail: teacherRow[0].teacher_mail,
                            teacher_telNumber: teacherRow[0].teacher_telNumber,
                            students: studentsFromTeacherArray
                        }

                        resolve(thisTeacher);

                    } else {
                        reject("bad Request");
                    }

                });
            }
        });
    });
}

export function getAllTeachers(): Promise<teacher[]> {
    return new Promise<teacher[]>((resolve, reject) => {
        let teachersArray: teacher[] = [];
        db.all('SELECT * FROM WHERE Teacher', (err, teacherRow) => {
            if (err) {
                console.log(err.message + " Erro getAllTeachers");
                reject(err);
            } else if (teacherRow) {
                let studetsInTeacherArray: student[] = [];
                for (const teacherRowElement of teacherRow) {
                    db.all('SELECT s.* from Student s , TeachStu t WHERE  s.student_id = t.stundet_id AND t.teacher_id =? ;', [teacherRowElement.teacher_id], (err, studentRow) => {
                        if (err) {
                            console.log(err.message + " erro in getAllTeachers studentRow ")
                            reject(err);
                        } else if (studentRow) {
                            let trainingsPlanOfStudent: trainingsplan;
                            for (const studentRowElement of studentRow) {
                                db.get('SELECT * FROM TrainingsPlan WHERE trainingsP_id =?;' [studentRowElement.trainingsP_id], (err, trainigsPlanRow) => {
                                    if (err) {
                                        console.log(err.message + "  ERRO in getAllTeachers, from trainigsPlanRow ");
                                        reject(err);
                                    } else if (trainigsPlanRow) {
                                        trainingsPlanOfStudent = trainigsPlanRow;
                                        let thisStudent: student = {
                                            student_id: studentRowElement.student_id,
                                            student_name: studentRowElement.student_name,
                                            student_lastName: studentRowElement.student_lastName,
                                            student_age: studentRowElement.student_age,
                                            student_lvl: studentRowElement.student_lvl,
                                            student_mail: studentRowElement.student_mail,
                                            student_telNumber: studentRowElement.student_telNumber,
                                            trainingsPlan: trainingsPlanOfStudent,

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
                                teacher_mail: teacherRowElement.student_mail,
                                teacher_telNumber: teacherRowElement.teacher_telNumber,
                                students: studetsInTeacherArray
                            }
                            teachersArray.push(thisTeacher);
                        }

                    });

                }
                resolve(teachersArray);

            }

        });
    });
}

export function getOneTeacherFromSchool(school_id: number): Promise<teacher> {
    return new Promise<teacher>((resolve, reject) => {
        db.get('SELECT * FROM Teacher WHERE  school_id =  ?' [school_id], (err, teacherRow) => {
            if (err) {
                console.log(err.message);
                reject(err);
            } else if (teacherRow && teacherRow[0]) {
                let studentsOfTeacher: student[] = [];
                db.all('SELECT s.* From Student s, TeachStu t WHERE s.student_id = t.student_id AND t.teacher_id = ? '[teacherRow[0].teacher_id], (err, studentRows) => {
                    if (err) {
                        console.log(err.message + " errro in getOneTeacherFromSchool");
                        reject(err);
                    } else if (studentRows) {
                        let trainingsPlanOfStudent: trainingsplan;
                        for (const studentRowElemt of studentRows) {
                            db.get('SELECT * FROM TrainingsP WHERE student_id  =?', [studentRowElemt.student_id], (err, trainingsPlanRow) => {
                                if (err) {
                                    console.log(err.message + " erro in getOneTeacherFromSchool trainingsPlanRow");
                                    reject(err);
                                } else if (trainingsPlanRow) {
                                    trainingsPlanOfStudent = trainingsPlanRow
                                    let thisStudent: student = {
                                        student_id: studentRowElemt.student_id,
                                        student_name: studentRowElemt.student_name,
                                        student_lastName: studentRowElemt.student_lastName,
                                        student_age: studentRowElemt.student_age,
                                        student_lvl: studentRowElemt.student_lvl,
                                        student_mail: studentRowElemt.teacher_mail,
                                        student_telNumber: studentRowElemt.student_telNumber,
                                        trainingsPlan: trainingsPlanOfStudent
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


export function addOneTeacherToschoool(school_id: number, teacher_name: string, teacherlastName: string, teacher_mail:string, teacher_telNumber:string){
    db.run('INSERT INTO Teacher(teacher_id, school_id, teacher_name, teacher_lastName, teacher_mail, teacher_telNumber) VALUE (?,?,?,?,?,?);', [getNextfreeIndexOfTeacher(getAllTeachers()) , school_id, teacher_name,teacherlastName,teacher_mail,teacher_telNumber] ,(err) =>{
       if (err){
           console.log(err.message + "erro in addOneTeacherToschoool");
       }
       else{
           console.log("teacher addet to school");
       }
    });
}

export function deleteTeacherFromSchool(teacher_id: number, school_id: number){
    db.run('DELETE FROM Teacher WHERE teacher_id =? AND  school_id =? ;' , [teacher_id, school_id], (err)=>{
       if (err){
           console.log(err.message + " erro in deleteTeacherFromSchool ")

       }
       else {
           console.log("teacher deletetFrom School");
       }
    });
}


export async function getNextfreeIndexOfTeacher(array: Promise<Array<any>>): Promise<number> {
    for (let index = 0; index < (await array).length; index++) {
        if ((await array).indexOf(index)) {
            return index;
        }
    }

    return (await array).length;

}

