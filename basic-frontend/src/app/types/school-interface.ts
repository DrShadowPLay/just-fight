import {teacher} from "./teacher-interface";

export interface school {
    school_id: number,
    school_name: string,
    school_place: string,
    school_plz: number
    teacher: teacher
}
