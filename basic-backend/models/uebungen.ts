import {db} from "./db";

export interface uebungen {
    uebungs_id: number,
    uebungs_beschreibung: string,
    uebungsZeitInMin: number
}

export function getAllUebungen(): Promise<uebungen[]> {
    return new Promise<uebungen[]>((resolve, reject) => {
        db.all("SELECT * FROM Übung;", (err, row) => {
            let uebungsArrayAllerUebungen: uebungen[] = [];
            if (err) {
                console.log(err.message + "in uebung.ts")
            } else {
                for (const rowElement of row) {
                    let thisUebung: uebungen = {
                        uebungs_id: rowElement.uebungs_id,
                        uebungs_beschreibung: rowElement.uebungs_beschreibung,
                        uebungsZeitInMin: rowElement.uebungsZeitInMin
                    }
                    uebungsArrayAllerUebungen.push(thisUebung);
                    console.log(thisUebung);
                }
                resolve(uebungsArrayAllerUebungen);
            }

        });
    })

}
