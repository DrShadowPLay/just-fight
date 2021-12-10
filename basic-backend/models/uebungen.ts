import {db} from "./db";
import {uebungen} from "../types/uebungs-interface";


export function getAllUebungen(): Promise<uebungen[]> {
    return new Promise<uebungen[]>((resolve, reject) => {
        db.all("SELECT * FROM Uebung;", (err, row) => {
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
                    console.log(thisUebung + "from alle Uebungen");
                }
                resolve(uebungsArrayAllerUebungen);
            }

        });
    })

}

export function getAllUebungenFromTrainingsplan(trainingsP_id: number): Promise<uebungen[]> {
    return new Promise<uebungen[]>((resolve, reject) => {
        db.all("SELECT u.* FROM Uebung u , TrP_Üb tü WHERE u.uebungs_id = tü.uebungs_id AND tü.trainingsP_id = ?;", [trainingsP_id], (err, row) => {
            let uebungenAusTrainingsplanArray: uebungen[] = [];
            if (err) {
                console.log(err.message + "in uebungen.ts bei getAllUebungenFromTrainingsplan ");
                reject(err);
            } else {
                if (row) {
                    for (const rowElement of row) {
                        let thisUebungFromTrainingsplan: uebungen = {
                            uebungs_id: rowElement.uebungs_id,
                            uebungs_beschreibung: rowElement.uebungs_beschreibung,
                            uebungsZeitInMin: rowElement.uebungsZeitInMin
                        }
                        uebungenAusTrainingsplanArray.push(thisUebungFromTrainingsplan);
                        console.log(thisUebungFromTrainingsplan + "from getAllUebungenFromTrainingsplan");
                    }
                    resolve(uebungenAusTrainingsplanArray);
                }
            }
        });
    });
}


export function getAllUebungenFromUebungsGroup(uebungsGroup_id: number): Promise<uebungen[]> {
    return new Promise<uebungen[]>((resolve, reject) => {
        db.all("SELECT u.* FROM Uebung u , Uebgroup ug WHERE u.uebungs_id = ug.uebungs_id AND ug.trainingsGroup_id = ?;", [uebungsGroup_id], (err, row) => {
            let uebungenAusTrainingsplanArray: uebungen[] = [];
            if (err) {
                console.log(err.message + "in uebungen.ts bei getAllUebungenFromUebungsGroup ");
                reject(err);
            } else {
                if (row) {
                    for (const rowElement of row) {
                        let thisUebungFromTrainingsplan: uebungen = {
                            uebungs_id: rowElement.uebungs_id,
                            uebungs_beschreibung: rowElement.uebungs_beschreibung,
                            uebungsZeitInMin: rowElement.uebungsZeitInMin
                        }
                        uebungenAusTrainingsplanArray.push(thisUebungFromTrainingsplan);
                        console.log(thisUebungFromTrainingsplan + "from getAllUebungenFromUebungsGroup");
                    }
                    resolve(uebungenAusTrainingsplanArray);
                }
            }
        });
    });
}

export function getOneUebung(uebungs_id: number): Promise<uebungen> {
    return new Promise<uebungen>((resolve, reject) => {
        db.get("SELECT * FROM Uebung WHERE uebungs_id = ? ;", [uebungs_id], (err, row) => {
            if (err) {
                console.log(err.message + "erro in getOneUebung");
                reject(err);
            } else if (row) {
                console.log(row)
                let thisUebung = {
                    uebungs_id: row.uebungs_id,
                    uebungs_beschreibung: row.uebungs_beschreibung,
                    uebungsZeitInMin: row.uebungsZeitInMin
                }
                resolve(thisUebung);

            } else {
                console.log("keine Solche uebung gefunden")
            }
        })
    });
}

export function getOneUebungFromTrainigsgroup(uebungs_id: number, trainingsGroup_id: number): Promise<uebungen> {
    return new Promise<uebungen>((resolve, reject) => {
        db.get("SELECT * FROM Uebgroup WHERE uebungs_id = ? AND  trainingsGroup_id =? ;", [uebungs_id, trainingsGroup_id], (err, row) => {
            if (err) {
                console.log(err.message + "erro in getOneUebungFromTrainigsgroup");
                reject(err);
            } else if (row) {
                console.log("in row" + row.uebungs_id)
                db.get('SELECT * FROM Uebung WHERE uebungs_id = ?;', [row.uebungs_id], (err, uebungsRow) => {
                    console.log(uebungsRow);
                    if (err) {
                        reject(err.message)
                    } else if (uebungsRow) {
                        console.log(uebungsRow);
                        let thisUebung: uebungen = {
                            uebungs_id: uebungsRow.uebungs_id,
                            uebungs_beschreibung: uebungsRow.uebungs_beschreibung,
                            uebungsZeitInMin: uebungsRow.uebungsZeitInMin
                        }
                        console.log("hello");
                        resolve(thisUebung);
                    }
                });

            } else {
                reject("nothing like this here");
            }
        });
    });
}


export function getOneUebungFromTrainigsPlan(uebungs_id: number, trainingsP_ip: number): Promise<uebungen> {
    return new Promise<uebungen>((resolve, reject) => {
        db.get("SELECT * FROM TrP_Üb WHERE uebungs_id = ? AND  trainingsP_id =? ;", [uebungs_id, trainingsP_ip], (err, trP_ÜbRow) => {
            if (err) {
                console.log(err.message + "erro in getOneUebungFromTrainigsgroup");
                reject(err);
            } else if (trP_ÜbRow) {
                console.log("in trp");
                console.log(trP_ÜbRow.uebungs_id + " id")
                db.get('SELECT * FROM Uebung WHERE uebungs_id =? ;', [trP_ÜbRow.uebungs_id], (err, uebungsRow) => {
                    if (err) {
                        reject(err.message);
                    } else if (uebungsRow) {
                        console.log("in uebROW")
                        let thisUebung: uebungen = {
                            uebungs_id: uebungsRow.uebungs_id,
                            uebungs_beschreibung: uebungsRow.uebungs_beschreibung,
                            uebungsZeitInMin: uebungsRow.uebungsZeitInMin
                        }
                        console.log("after uebROW")
                        console.log(thisUebung)
                        resolve(thisUebung);
                        console.log("after resolve")
                    }
                });

            } else {
                reject("nothing like this in here");
            }
        });
    });
}


export async function addOneUebung(uebungs_beschreibung: string, uebungsZeitInMin: String) {
    db.run("INSERT INTO Uebung(uebungs_id, uebungs_beschreibung, uebungsZeitInMin) VALUES (?,?,?);", [nextFreeIndexFinder(await getAllUebungen()), uebungs_beschreibung, uebungsZeitInMin], (err) => {
        if (err) {
            console.log(err.message + "erro in addOneUebung");
        } else {
            console.log("uebung standart geaddet");
        }

    });
}

/*export function allreadyExistingInTrainingsGroup(trainingsgroup_id: number , uebungs_id: number) : boolean{
    if (await getAllUebungenFromUebungsGroup(trainingsgroup_id,)

    return true
}*/


export function addOneToTrainingsgroup(uebungs_id: number, trainingsGroup_id: number, anzahl: number) {
    db.run('UPDATE Uebgroup SET numberOfSameUebungenInUebungsGroup = 0 WHERE numberOfSameUebungenInUebungsGroup IS NULL ', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            db.get('SELECT * FROM Uebgroup  WHERE uebungs_id = ? AND trainingsGroup_id = ?;', [uebungs_id, trainingsGroup_id], (err, uebgroupRow) => {
                if (err) {
                    console.log(err.message);
                } else if (uebgroupRow) {
                    db.run('UPDATE Uebgroup SET numberOfSameUebungenInUebungsGroup = numberOfSameUebungenInUebungsGroup +1 WHERE uebungs_id =? AND trainingsGroup_id = ?', [uebgroupRow.uebungs_id, uebgroupRow.trainingsGroup_id], (err) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log("erhoet um 1");
                        }
                    })
                } else {
                    db.run('INSERT INTO Uebgroup(uebungs_id, trainingsGroup_id, numberOfSameUebungenInUebungsGroup) VALUES (?,?,?);', [uebungs_id, trainingsGroup_id, anzahl], (err => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log("geaddet");
                            }
                        })
                    );
                }
            });
        }
    })


}


export function addOneToTrainingsPlan(uebungs_id: number, trainingsP_id: number, anzahl: number) {
    db.run('UPDATE TrP_Üb SET numberOfSameUebungenInOneTrainingsPlan = 0 WHERE numberOfSameUebungenInOneTrainingsPlan IS NULL ', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            db.get('SELECT * FROM TrP_Üb  WHERE uebungs_id = ? AND trainingsP_id = ?;', [uebungs_id, trainingsP_id], (err, trainingsPRow) => {
                if (err) {
                    console.log(err.message);
                } else if (trainingsPRow) {
                    console.log("in trainingsPRow")
                    db.run('UPDATE TrP_Üb SET numberOfSameUebungenInOneTrainingsPlan = numberOfSameUebungenInOneTrainingsPlan + 1 WHERE uebungs_id =? AND trainingsP_id = ?', [trainingsPRow.uebungs_id, trainingsPRow.trainingsP_id], (err) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log("erhoet um 1");
                        }
                    })
                } else {
                    db.run('INSERT INTO TrP_Üb(uebungs_id, trainingsP_id,numberOfSameUebungenInOneTrainingsPlan) VALUES (?,?,?);', [uebungs_id, trainingsP_id, anzahl], (err => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log("geaddet");
                            }
                        })
                    );
                }
            });
        }
    })


}


export function deleteAllSameUebungenfromuebungsGruop(uebungs_id: number, trainigsGroup_id: number) {

    if (typeof getOneUebungFromTrainigsgroup(uebungs_id, trainigsGroup_id) != "boolean") {
        db.run('DELETE FROM Uebgroup WHERE uebungs_id = ? AND trainingsGroup_id = ?;', [uebungs_id, trainigsGroup_id], (err) => {
            if (err) {
                console.log(err.message + "erro in deleteAllSameUebungenfromuebungsGruop");
            } else {
                console.log("uebung aus gruppe gelöst");
            }
        });
    } else {
        console.log(" Üebung gibt es nicht in der Gruppe")
    }

}

export function deleteAllSameUebungenfromTrainingsUebung(trainingsP_id: number, uebungs_id: number) {
    if (typeof getOneUebungFromTrainigsPlan(trainingsP_id, uebungs_id) != "boolean") {
        db.run('DELETE FROM Uebgroup WHERE trainingsGroup_id = ? AND uebungs_id =?;', [trainingsP_id, uebungs_id], (err) => {
            if (err) {
                console.log(err.message + "erro in deleteAllSameUebungenfromTrainingsUebung");
            } else {
                console.log("uebung aus gruppe TRainigsP");
            }
        });
    } else {
        console.log("uebung ist nicht in dem plan");
    }
}


export function deleteUebunggenerell(uebungs_id: number) {
    db.run('DELETE FROM Uebung WHERE uebungs_id = ? ;', [uebungs_id], (err) => {
        if (err) {
            console.log(err.message + "erro in deleteUebunggenerell");
        } else {
            db.all('SELECT * FROM Uebgroup WHERE uebungs_id = ?;', [uebungs_id], (err, row) => {
                if (err) {
                    console.log(err.message + "erro in deleteUebunggenerell alle aus gruppenueb löschen");
                } else if (row) {
                    for (const rowElemet of row) {
                        deleteAllSameUebungenfromuebungsGruop(uebungs_id, rowElemet)
                    }

                }
            });

            db.all('SELECT * FROM TrP_Üb WHERE uebungs_id = ?;', [uebungs_id], (err, row) => {
                if (err) {
                    console.log(err.message + "erro in deleteUebunggenerell alle aus TrP_Üb löschen");
                } else if (row) {
                    for (const rowElemet of row) {
                        deleteAllSameUebungenfromTrainingsUebung(uebungs_id, rowElemet);
                    }

                }
            });
        }
    });
}

export function deleteSingelUebungInUebungsgroup(uebungs_id: number, trainingsGroup_id: number) {
    db.get('SELECT numberOfSameUebungenInUebungsGroup FROM Uebgroup WHERE uebungs_id =? AND  trainingsGroup_id = ?;', [uebungs_id, trainingsGroup_id], (err, row) => {
        if (err) {
            console.log(err.message + "errro in deleteSingelUebungInUebungsgroup");
        } else if (row) {
            let anzahl: number = row
            if (anzahl > 1) {
                db.run('UPDATE Uebgroup SET numberOfSameUebungenInUebungsGroup = numberOfSameUebungenInUebungsGroup -1 WHERE uebungs_id =? AND  trainingsGroup_id = ? ;', [uebungs_id, trainingsGroup_id], (err) => {
                    if (err) {
                        console.log(err.message + "erro in deleteSingelUebungInUebungsgroup tryed to reduce");
                    } else {
                        return ("anzahl ueungen is reduced by one");
                    }
                });
            } else {
                deleteAllSameUebungenfromuebungsGruop(uebungs_id, trainingsGroup_id);
            }
        }
    });
}


export function deleteSingelUebungInTrainingsplan(trainingsP_id: number, uebungs_id: number) {
    db.get('SELECT numberOfSameUebungenInUebungsGroup FROM Uebgroup WHERE trainingsGroup_id =? AND  uebungs_id = ?;', [trainingsP_id, uebungs_id], (err, row) => {
        if (err) {
            console.log(err.message + "errro in deleteSingelUebungInTrainingsplan");
        } else if (row) {
            let anzahl: number = row
            if (anzahl > 1) {
                db.run('UPDATE TrP_Üb SET numberOfSameUebungenInOneTrainingsPlan = numberOfSameUebungenInOneTrainingsPlan -1 WHERE trainingsP_id =? AND  uebungs_id = ?;', [trainingsP_id, uebungs_id], (err) => {
                    if (err) {
                        console.log(err.message + "erro in deleteSingelUebungInTrainingsplan tryed to reduce");
                    } else {
                        return ("anzahl ueungen is reduced by one");
                    }
                });
            } else {
                deleteAllSameUebungenfromuebungsGruop(trainingsP_id, uebungs_id);
            }
        }
    });
}


export function nextFreeIndexFinder(array: uebungen[]): number {
    array.sort(function (a, b) {
        return a.uebungs_id - b.uebungs_id;
    });


    for (let index = 0; index < array.length; index++) {
        if (array[index].uebungs_id != index) {
            return index;
        }
    }

    return array.length;

}



