import {student} from "./student-interface";

export interface teacher {
    teacher_id: number,
    school_id: number,
    teacher_name: string,
    teacher_lastName: string,
    teacher_mail: string,
    teacher_telNumber: string,
    students: student[]
}


