import {db} from "./db";
import * as process from "process";

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
                    console.log(thisUebung + "from alle Uebungen");
                }
                resolve(uebungsArrayAllerUebungen);
            }

        });
    })

}

export function getAllUebungenFromTrainingsplan(trainingsP_id: number): Promise<uebungen[]> {
    return new Promise<uebungen[]>((resolve, reject) => {
        db.all("SELECT u.* FROM Uebungen u , TrP_Üb tü WHERE u.uebungs_id = tü.uebungs_id AND tü.trainingsP_id = ?;", [trainingsP_id], (err, row) => {
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
        db.all("SELECT u.* FROM Uebungen u , Uebgroup ug WHERE u.uebungs_id = ug.uebungs_id AND ug.trainingsGroup_id = ?;", [uebungsGroup_id], (err, row) => {
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

export function getOneUebungFromTrainigsgroup(uebungs_id: number, trainingsGroup_id: number): Promise<uebungen> | boolean {
    return new Promise<uebungen>((resolve, reject) => {
        db.get("SELECT * FROM Uebgroup WHERE uebungs_id = ? AND  trainingsGroup_id =? ;", [uebungs_id, trainingsGroup_id], (err, row) => {
            if (err) {
                console.log(err.message + "erro in getOneUebungFromTrainigsgroup");
                reject(err);
            } else if (row) {
                let thisUebung: uebungen = {
                    uebungs_id: row.uebungs_id,
                    uebungs_beschreibung: row.uebungs_beschreibung,
                    uebungsZeitInMin: row.uebungsZeitInMin
                }
                resolve(thisUebung);
            } else {
                return false;
            }
        });
    });
}


export function getOneUebungFromTrainigsPlan(uebungs_id: number, trainingsP_ip: number): Promise<uebungen> | boolean {
    return new Promise<uebungen>((resolve, reject) => {
        db.get("SELECT * FROM TrP_Üb WHERE uebungs_id = ? AND  trainingsP_ip =? ;", [uebungs_id, trainingsP_ip], (err, row) => {
            if (err) {
                console.log(err.message + "erro in getOneUebungFromTrainigsgroup");
                reject(err);
            } else if (row) {
                let thisUebung: uebungen = {
                    uebungs_id: row.uebungs_id,
                    uebungs_beschreibung: row.uebungs_beschreibung,
                    uebungsZeitInMin: row.uebungsZeitInMin
                }
                resolve(thisUebung);
            } else {
                return false;
            }
        });
    });
}




export function addOneUebung(uebungs_beschreibung: string, uebungsZeitInMin: String) {
    db.run("INSERT INTO Uebung(uebungs_id, uebungs_bezeichnung, uebungsZeitInMin) VALUE (?,?,?);", [nextFreeIndexFinder(getAllUebungen()), uebungs_beschreibung, uebungsZeitInMin], (err) => {
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


export function addOneToTrainingsgroup(uebungs_id: number, trainigsGroup_id: number, anzahl: number) {

    if (typeof getOneUebungFromTrainigsgroup(uebungs_id, trainigsGroup_id) == "boolean" && getOneUebungFromTrainigsgroup(uebungs_id, trainigsGroup_id) == false) {
        anzahl = 0;
        db.run("INSERT INTO Uebgroup(uebungs_id, trainigsGroup_id, UGCsameUebungen) VALUE (?, ?, ?);", [uebungs_id, trainigsGroup_id, anzahl], (err) => {
            if (err) {
                console.log(err.message + "erro in addOneToTrainingsgroup from getOneUebungFromTrainigsgroup == false")
            } else {
                console.log("uebung einer trainingsgruppe geaddet");
            }
        });
    } else {
        db.run("UPDATE Uebgroup SET UGCsameUebungen  = UGCsameUebungen +1 WHERE uebungs_id = ? AND  trainingsGroup_id  = ?", [uebungs_id, trainigsGroup_id], (err) => {
            if (err) {
                console.log(err.message + "erro in addOneToTrainingsgroup from existing")
            } else {
                console.log("anzahl erhöht");
            }
        });
    }


}


export function addOneToTrainingsPlan(uebungs_id: number, trainingsP_id: number, anzahl: number) {

    if (typeof getOneUebungFromTrainigsgroup(uebungs_id, trainingsP_id) == "boolean" && getOneUebungFromTrainigsgroup(uebungs_id, trainingsP_id) == false) {
        anzahl = 0;
        db.run("INSERT INTO Uebgroup(trainingsP_id, uebungs_id, numberOfSp) VALUE (?, ?, ?);", [uebungs_id, trainingsP_id, anzahl], (err) => {
            if (err) {
                console.log(err.message + "erro in addOneToTrainingsPlan from getOneUebungFromTrainigsgroup == false")
            } else {
                console.log("uebung eines Planes geaddet");
            }
        });
    } else {
        db.run("UPDATE Uebgroup SET numberOfSp  = numberOfSp +1 WHERE uebungs_id = ? AND  trainingsGroup_id  = ?", [uebungs_id, trainingsP_id], (err) => {
            if (err) {
                console.log(err.message + "erro in addOneToTrainingsPlan from existing")
            } else {
                console.log("anzahl erhöht");
            }
        });
    }
}


export  function deleteAllSameUebungenfromuebungsGruop(uebungs_id: number, trainigsGroup_id: number) {

    if (typeof getOneUebungFromTrainigsgroup(uebungs_id, trainigsGroup_id) != "boolean") {
        db.run('DELETE FROM Uebgroup WHERE uebungs_id = ? AND trainingsGroup_id = ?;', [uebungs_id, trainigsGroup_id], (err) => {
            if (err) {
                console.log(err.message + "erro in deleteAllSameUebungenfromuebungsGruop");
            } else {
                console.log("uebung aus gruppe gelöst");
            }
        });
    }
    else {
        console.log(" Üebung gibt es nicht in der Gruppe")
    }

}

export  function deleteAllSameUebungenfromTrainingsUebung(trainingsP_id: number ,uebungs_id: number) {
    if (typeof getOneUebungFromTrainigsPlan(trainingsP_id, uebungs_id) != "boolean") {
        db.run('DELETE FROM Uebgroup WHERE triningsP_id = ? AND uebungs_id =?;', [trainingsP_id, uebungs_id], (err) => {
            if (err) {
                console.log(err.message + "erro in deleteAllSameUebungenfromTrainingsUebung");
            } else {
                console.log("uebung aus gruppe TRainigsP");
            }
        });
    }
    else  {
        console.log("uebung ist nicht in dem plan");
    }
}


export function deleteUebunggenerell(uebungs_id: number){
    db.run('DELETE FROM Uebung WHERE uebungs_id = ? ;',[uebungs_id] ,(err)=>{
       if (err){
           console.log(err.message + "erro in deleteUebunggenerell");
       }
       else {
           db.all('SELECT * FROM Uebgroup WHERE uebungs_id = ?;',[uebungs_id], (err, row) =>{
               if (err){
                   console.log(err.message + "erro in deleteUebunggenerell alle aus gruppenueb löschen");
               }

               else if (row) {
                   for (const rowElemet of row){
                       deleteAllSameUebungenfromuebungsGruop(uebungs_id, rowElemet)
                   }

               }
           });

           db.all('SELECT * FROM TrP_Üb WHERE uebungs_id = ?;',[uebungs_id], (err, row) =>{
               if (err){
                   console.log(err.message + "erro in deleteUebunggenerell alle aus TrP_Üb löschen");
               }

               else if (row) {
                   for (const rowElemet of row){
                       deleteAllSameUebungenfromTrainingsUebung(uebungs_id, rowElemet);
                   }

               }
           });
       }
    });
}

export function deleteSingelUebungInUebungsgroup(uebungs_id:number , trainingsGroup_id:number) {
    db.get('SELECT UGCsameUebungen FROM Uebgroup WHERE uebungs_id =? AND  trainingsGroup_id = ?;',[uebungs_id,trainingsGroup_id] , (err ,row)=>{
       if (err){
           console.log(err.message +"errro in deleteSingelUebungInUebungsgroup");
       }
       else if(row){
           let anzahl: number = row
           if(anzahl >1)
           {
               db.run('UPDATE Uebgroup SET UGCsameUebungen = UGCsameUebungen -1 WHERE uebungs_id =? AND  trainingsGroup_id = ? ;',[uebungs_id,trainingsGroup_id] , (err)=>{
                  if (err){
                      console.log(err.message + "erro in deleteSingelUebungInUebungsgroup tryed to reduce");
                  }
                  else{
                      return("anzahl ueungen is reduced by one");
                  }
               });
           }
           else {
               deleteAllSameUebungenfromuebungsGruop(uebungs_id,trainingsGroup_id);
           }
       }
    });
}



export function deleteSingelUebungInTrainingsplan( trainingsP_id:number, uebungs_id:number ) {
    db.get('SELECT UGCsameUebungen FROM Uebgroup WHERE trainingsP_id =? AND  uebungs_id = ?;',[trainingsP_id,uebungs_id] , (err ,row)=>{
        if (err){
            console.log(err.message +"errro in deleteSingelUebungInTrainingsplan");
        }
        else if(row){
            let anzahl: number = row
            if(anzahl >1)
            {
                db.run('UPDATE TrP_Üb SET numberOfSp = numberOfSp -1 WHERE trainingsP_id =? AND  uebungs_id = ?;',[trainingsP_id,uebungs_id] , (err)=>{
                    if (err){
                        console.log(err.message + "erro in deleteSingelUebungInTrainingsplan tryed to reduce");
                    }
                    else{
                        return("anzahl ueungen is reduced by one");
                    }
                });
            }
            else {
                deleteAllSameUebungenfromuebungsGruop(trainingsP_id,uebungs_id);
            }
        }
    });
}

export async function nextFreeIndexFinder(array: Promise<Array<any>>): Promise<number> {
    for (let index = 0; index < (await array).length; index++) {
        if ((await array).indexOf(index)) {

            return index;
        }
    }
    return (await array).length;
}





