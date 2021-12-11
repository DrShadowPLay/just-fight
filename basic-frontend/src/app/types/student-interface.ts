import {trainingsplan} from "./trainingsplan-interface";

export interface student {
    student_id: number,
    student_name: string,
    student_lastName: string,
    student_age: number,
    student_lvl: number,
    student_mail: string,
    student_telNumber: number,
    trainingsPlan: trainingsplan[]
}
