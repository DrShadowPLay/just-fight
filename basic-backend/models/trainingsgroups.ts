import {uebungen} from "./uebungen";
import {db} from "./db";
import {school} from "./school";


export interface trainingsGroup {
    trainingsGroup_id: number,
    trainingsGroup_name: string,
    trainingsGroup_difficulty: string,
    trainingsGroup_duration: string
    trainigsGroup_uebungen: uebungen[]
}


export function getAllTrainingsGroups(): Promise<trainingsGroup[]> {
    return new Promise<trainingsGroup[]>((resolve, reject) => {
        let trainingsGroupAnzahl: number = 0;
        let trainingsGroupsArray: trainingsGroup[] = [];
        db.all('SELECT * FROM TrainingsGroup; ', (err, trainingsGroupRow) => {
            if (err) {
                console.log(err.message + "erro in getAllTrainingsGroups ");
                reject(err);
            } else if (trainingsGroupRow && trainingsGroupRow[0]) {
                console.log("trainingsGroupRow:" + trainingsGroupRow);
                trainingsGroupAnzahl = trainingsGroupRow.length;
                let counter: number = 0;
                let uebungeninGroupArray: uebungen[] = [];
                for (const trainingsGroupRowElement of trainingsGroupRow) {
                    db.all('SELECT u.uebungs_id, u.uebungs_beschreibung, u.uebungsZeitInMin FROM Uebung u , Uebgroup g WHERE  u.uebungs_id = g.uebungs_id AND g.trainingsGroup_id  = ? ;', [trainingsGroupRowElement.trainingsGroup_id], (err, uebungsRow) => {
                        counter = counter+ 1;
                        if (err) {
                            console.log(err.message + "erro in getAllTrainingsGroups  uebungeninGroupArray ");
                            reject(err);
                        } else if(uebungsRow) {
                            for (const uebungsRowElemet of uebungsRow) {
                                let thisUebung: uebungen = {
                                    uebungs_id: uebungsRowElemet.uebungs_id,
                                    uebungs_beschreibung: uebungsRowElemet.uebungs_beschreibung,
                                    uebungsZeitInMin: uebungsRowElemet.uebungsZeitInMin
                                }
                                uebungeninGroupArray.push(thisUebung);

                            }
                            let thisUebungsGroup: trainingsGroup = {
                                trainingsGroup_id: trainingsGroupRowElement.trainingsGroup_id,
                                trainingsGroup_name: trainingsGroupRowElement.trainingsGroup_name,
                                trainingsGroup_difficulty: trainingsGroupRowElement.trainingsGroup_difficulty,
                                trainingsGroup_duration: trainingsGroupRowElement.trainingsGroup_duration,
                                trainigsGroup_uebungen: uebungeninGroupArray
                            }
                            trainingsGroupsArray.push(thisUebungsGroup);
                            if(counter == trainingsGroupAnzahl){
                                console.log(trainingsGroupsArray);
                                resolve(trainingsGroupsArray)
                            }

                        }
                        else {
                            let thisUebungsGroup: trainingsGroup = {
                                trainingsGroup_id: trainingsGroupRowElement.trainingsGroup_id,
                                trainingsGroup_name: trainingsGroupRowElement.trainingsGroup_name,
                                trainingsGroup_difficulty: trainingsGroupRowElement.trainingsGroup_difficulty,
                                trainingsGroup_duration: trainingsGroupRowElement.trainingsGroup_duration,
                                trainigsGroup_uebungen: uebungeninGroupArray
                            }
                            trainingsGroupsArray.push(thisUebungsGroup);
                            if(counter == trainingsGroupAnzahl){
                                console.log(trainingsGroupsArray);
                                resolve(trainingsGroupsArray)
                            }
                        }


                    });

                }
                console.log("tainingsGroupArray:" + trainingsGroupsArray);
            } else {
                resolve(trainingsGroupsArray);
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


export async function addTrainingsGroup(trainingsGroup_name: string, trainingsGroup_difficulty: string, trainingsGroup_duration: string) {
    db.run('INSERT INTO TrainingsGroup (trainingsGroup_id, trainingsGroup_name , trainingsGroup_difficulty, trainingsGroup_duration) VALUES (?,?,?,?);', [getNextfreeIndexInTrainingsGroup( await getAllTrainingsGroups()), trainingsGroup_name, trainingsGroup_difficulty, trainingsGroup_duration], (err) => {
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

export function getNextfreeIndexInTrainingsGroup(array: trainingsGroup[]): number {
    array.sort(function (a, b){return a.trainingsGroup_id - b.trainingsGroup_id;});


    for (let index = 0; index < array.length; index++) {
        if (array[index].trainingsGroup_id != index){
            return index;
        }
    }

    return array.length;

}
