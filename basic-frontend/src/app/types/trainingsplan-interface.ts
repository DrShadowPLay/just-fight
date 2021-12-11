import {uebungen} from "./uebungs-interface";

export interface trainingsplan {
    trainingsP_id: number,
    student_id: number,
    trainingsGroup_id: number,
    trainingsplan_date: Date,
    trainingsplan_time: string,
    uebunge: uebungen[],
}
