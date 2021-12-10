import {db} from "./db"
import {school} from "../types/school-interface";
import {teacher} from "../types/teacher-interface";


export function getAllSchools(): Promise<school[]> {
    return new Promise<school[]>((resolve, reject) => {
        let schoolArray: school[] = [];
        let anzahlschulen: number;
        db.all('SELECT * FROM School', (err, schoolRows) => {
            if (err) {
                console.log(" Erro in getAllSchools");
                reject(err);
            } else if (schoolRows && schoolRows[0]) {

                let thisTeacher: teacher;
                anzahlschulen = schoolRows.length;
                console.log(anzahlschulen);
                let counter: number = 0;
                for (const schoolRowElement of schoolRows) {
                    db.all('SELECT * FROM Teacher WHERE  school_id = ?', [schoolRowElement.school_id], (err, teacherRow) => {
                        counter = counter +1;
                        if (err) {
                            console.log(err.message + "getAllSchools  teacherRow");
                            reject(err);
                        } else if (teacherRow && teacherRow[0]) {

                            thisTeacher = teacherRow[0];
                            let thisSchool: school = {
                                school_id: schoolRowElement.school_id,
                                school_name: schoolRowElement.school_name,
                                school_place: schoolRowElement.school_place,
                                school_plz: schoolRowElement.school_plz,
                                teacher: thisTeacher
                            }
                            schoolArray.push(thisSchool)
                            if (counter == anzahlschulen) {
                                resolve(schoolArray);
                            }


                        } else {
                            let thisSchool: school = {
                                school_id: schoolRowElement.school_id,
                                school_name: schoolRowElement.school_name,
                                school_place: schoolRowElement.school_place,
                                school_plz: schoolRowElement.school_plz,
                                teacher: thisTeacher
                            }
                            schoolArray.push(thisSchool);
                            if (counter === anzahlschulen) {
                                console.log(schoolArray);
                                resolve(schoolArray);
                            }

                        }


                    });


                }

            }
            else {
                resolve(schoolArray)
            }
        });

    });
}

export function getOneSchool(school_id: number): Promise<school> {
    return new Promise<school>((resolve, reject) => {
        db.all('SELECT * FROM School WHERE school_id = ?', [school_id], (err, schoolRow) => {
            console.log(schoolRow + " blalal" + schoolRow[0]);
            if (err) {
                console.log(err.message + " getOneSchoool");
                reject(err);
            } else if (schoolRow && schoolRow[0]) {
                console.log("after id else")
                let teacherOfSchool: teacher;
                db.get('SELECT * FROM Teacher WHERE  school_id = ?', [school_id], (err, teacherRow) => {
                    if (err) {
                        console.log(err.message + " erro in getOneSchool");
                    } else if (teacherRow) {
                        console.log("after id else in teacher")

                        teacherOfSchool = teacherRow;
                        let thisSchool: school = {
                            school_id: schoolRow[0].school_id,
                            school_name: schoolRow[0].school_name,
                            school_place: schoolRow[0].school_place,
                            school_plz: schoolRow[0].school_plz,
                            teacher: teacherOfSchool
                        }
                        resolve(thisSchool);
                        console.log(thisSchool + "after resolve")

                    } else {
                        let thisSchool: school = {
                            school_id: schoolRow[0].school_id,
                            school_name: schoolRow[0].school_name,
                            school_place: schoolRow[0].school_place,
                            school_plz: schoolRow[0].school_plz,
                            teacher: teacherOfSchool
                        }
                        resolve(thisSchool);

                    }
                });
            } else {
                console.log("no sutch school");
                reject("no sutch school");
            }
        });
    });
}


export async function addSchool(school_name: string, school_place: string, school_plz: number) {
    db.run('INSERT INTO School(school_id, school_name, school_place, school_plz) VALUES (?,?,?,?);', [getNextfreeIndexOfSchool(await getAllSchools()), school_name, school_place, school_plz], (err) => {
        if (err) {
            console.log(err.message + "erro in  addSchool");
        } else {
            console.log("school geaddet");
        }
    });
}

export function deleteSchool(school_id: number) {
    db.run('DELETE FROM School WHERE school_id = ?', [school_id], (err) => {
        if (err) {
            console.log(err.message + " erro in  deleteSchool");
        } else {
            console.log("school deleted");
        }
    });
}


export function getNextfreeIndexOfSchool(array: school[]): number {
    array.sort(function (a, b){return a.school_id - b.school_id;});


    for (let index = 0; index < array.length; index++) {
            if (array[index].school_id != index){
                return index;
            }
    }

    return array.length;

}
