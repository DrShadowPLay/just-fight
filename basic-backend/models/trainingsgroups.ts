import {uebungen} from "./uebungen";
import {db} from "./db";


export interface trainingsGroup {
    trainingsGroup_id: number,
    trainingsGroup_name: string,
    trainingsGroup_difficulty: string,
    trainingsGroup_duration: string
    trainigsGroup_uebungen: uebungen[]
}


export function getAllTrainingsGroups(): Promise<trainingsGroup[]> {
    return new Promise<trainingsGroup[]>((resolve, reject) => {
        let trainingsGroupsArray: trainingsGroup[] = [];
        db.all('SELECT * FROM TrainingsGroup; ', (err, trainingsGroupRow) => {
            if (err) {
                console.log(err.message + "erro in getAllTrainingsGroups ");
                reject(err);
            } else if (trainingsGroupRow) {
                let uebungeninGroupArray: uebungen[] = [];
                for (const trainingsGroupRowElement of trainingsGroupRow) {
                    db.all('SELECT u.uebungs_id, u.uebungs_bezeichung, u.eubungsZeitInMin FROM Uebung u , Uebgroup g WHERE  u.uebungs_id = g.uebungs_id AND g.trainingsGroup_id  = ? ;', [trainingsGroupRowElement.trainingsGroup_id], (err, uebungsRow) => {
                        if (err) {
                            console.log(err.message + "erro in getAllTrainingsGroups  uebungeninGroupArray ");
                            reject(err);
                        } else {
                            for (const uebungsRowElemet of uebungsRow) {
                                let thisUebung: uebungen = {
                                    uebungs_id: uebungsRowElemet.uebungs_id,
                                    uebungs_beschreibung: uebungsRowElemet.uebungs_beschreibung,
                                    uebungsZeitInMin: uebungsRowElemet.uebungsZeitInMin
                                }
                                uebungeninGroupArray.push(thisUebung);
                            }

                        }

                    });
                    let thisUebungsGroup: trainingsGroup = {
                        trainingsGroup_id: trainingsGroupRowElement.trainingsGroup_id,
                        trainingsGroup_name: trainingsGroupRowElement.trainingsGroup_name,
                        trainingsGroup_difficulty: trainingsGroupRowElement.trainingsGroup_difficulty,
                        trainingsGroup_duration: trainingsGroupRowElement.trainingsGroup_duration,
                        trainigsGroup_uebungen: uebungeninGroupArray
                    }
                    trainingsGroupsArray.push(thisUebungsGroup);
                }

                resolve(trainingsGroupsArray);
            } else {
                reject("erro in getAllTrainingsGroups after trainingsGroupsArray.push ");
            }
        });
    });
}


export function getOneTrainierGroup(trainingsGroup_id: number): Promise<trainingsGroup> {
    return new Promise<trainingsGroup>((resolve, reject) => {
        db.all('SELECT * FROM TrainingsGroup WHERE  trainingsGroup_id =  ?;', [trainingsGroup_id], (err, trainingsGroupRow) => {
            if (err) {
                console.log(err.message + "in getOneTrainierGroup ");
                reject(err);
            } else if (trainingsGroupRow && trainingsGroupRow[0]) {
                let uebungenInGroupArray: uebungen[] = [];

                db.all('SELECT u.uebungs_id, u.uebungs_beschreibung, u.uebungsZeitInMin FROM Uebung u , Uebgroup g WHERE u.uebungs_id = g.uebungs_id AND g.uebungs_id = ? ;', [trainingsGroup_id], (err, uebungsRow) => {
                    if (err) {
                        console.log(err.message + "in getOneTrainierGroup from getOneTrainierGroup");
                        reject(err);
                    } else {
                        for (const uebungsElement of uebungsRow) {
                            let thisUebung: uebungen = {
                                uebungs_id: uebungsElement.uebungs_id,
                                uebungs_beschreibung: uebungsElement.uebungs_beschreibung,
                                uebungsZeitInMin: uebungsElement.uebungsZeitInMin
                            }

                            uebungenInGroupArray.push(thisUebung);

                        }

                    }
                });

                let thisUebungsGroup: trainingsGroup = {
                    trainingsGroup_id: trainingsGroupRow[0].trainingsGroup_id,
                    trainingsGroup_name: trainingsGroupRow[0].trainingsGroup_name,
                    trainingsGroup_difficulty: trainingsGroupRow[0].trainingsGroup_difficulty,
                    trainingsGroup_duration: trainingsGroupRow[0].trainingsGroup_duration,
                    trainigsGroup_uebungen: uebungenInGroupArray
                }

                resolve(thisUebungsGroup);

            } else {
                reject("erro in getOneTrainierGroup last")
            }
        });
    });
}


export function addTrainingsGroup(trainingsGroup_name: string, trainingsGroup_difficulty: string, trainingsGroup_duration: string) {
    db.run('INSERT INTO TrainingsGroup (trainingsGroup_id, trainingsGroup_name , trainingsGroup_difficulty, trainingsGroup_duration) VALUE (?,?,?,?);', [getNextfreeIndexInTrainingsGroup(getAllTrainingsGroups()), trainingsGroup_name, trainingsGroup_difficulty, trainingsGroup_duration], (err) => {
        if (err) {
            console.log(err.message + "erro in addTrainingsGroup");

        } else {
            console.log("trainingsGroupaddet");
        }
    });

}

export function deleteTrainingsGroup(trainingsGroup_id: number) {
    db.run('DELETE FROM TrainingsGroup WHERE trainingsGroup_id =  ? ;', [trainingsGroup_id] ,(err) => {
       if (err){
           console.log(err.message  + "erro in deleteTrainingsGroup");
       }
       else{
           console.log("gruppe gelöscht");
       }
    });
}


export async function getNextfreeIndexInTrainingsGroup(array: Promise<Array<any>>): Promise<number> {
    for (let index = 0; index < (await array).length; index++) {
        if ((await array).indexOf(index)) {
            return index;
        }
    }

    return (await array).length;

}

