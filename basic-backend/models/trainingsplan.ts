import {db} from "./db"
import {uebungen} from "./uebungen";

export interface trainingsplan{
    trainingsplan_id: number,
    trainingsplan_date : Date,
    trainingsplan_time: string
    uebunge: uebungen[]
}
