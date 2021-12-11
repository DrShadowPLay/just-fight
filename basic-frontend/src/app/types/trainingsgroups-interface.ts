import {uebungen} from "./uebungs-interface";

export interface trainingsGroup {
    trainingsGroup_id: number,
    trainingsGroup_name: string,
    trainingsGroup_difficulty: string,
    trainingsGroup_duration: string
    trainigsGroup_uebungen: uebungen[]
}

