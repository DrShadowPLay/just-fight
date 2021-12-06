import {db} from "./db"
import {uebungen} from "./uebungen";
import {student} from "./student";
import {trainingsGroup} from "./trainingsgroups";

export interface trainingsplan{
    trainingsP_id: number,
    student_id :number,
    trainingsGroup_id: number,
    trainingsplan_date : Date,
    trainingsplan_time: string,
    uebunge: uebungen[],
}

export function getOneTrainigsplan(trainigsP_id :number) : Promise<trainingsplan>{
    return new Promise<trainingsplan>((resolve, reject)  =>{
        db.all('SELECT * FROM TrainingsPlan WHERE  trainingsP_id = ?;',[trainigsP_id], (err, row) =>{
           if(err) {
               console.log(err.message + "errro in getOneTrainigsplan");
               reject(err);
           }
           else {
               console.log(row)
           }
            if(row && row[0]){
               let uebungsArray : uebungen[] = [];
               db.all('SELECT u.uebungs_id, u.uebungs_beschreibung, u.uebungsZeitInMin  FROM Uebung u , TrP_Üb t WHERE t.trainingsp_id = ? AND t.uebungs_id =u.uebungs_id;' , [trainigsP_id], (err, uebungsrow) =>{
                  if (err){
                      console.log(err.message + " in getOneTrainigsplan  bei uebungssuche");
                      reject(err);
                  }
                  else {
                      for(const  rowElement of uebungsrow){
                          let thisUebung : uebungen = {
                              uebungs_id: rowElement.uebungs_id,
                              uebungs_beschreibung: rowElement.uebungs_beschreibung,
                              uebungsZeitInMin: rowElement.uebungsZeitInMin
                          }

                          uebungsArray.push(thisUebung);
                          console.log(thisUebung);
                      }
                  }

               });
               let trainignsplan : trainingsplan = {
                   trainingsP_id : row[0].trainingsP_id,
                   student_id : row[0].student_id,
                   trainingsGroup_id: row[0].trainingsGroup_id,
                   trainingsplan_date: row[0].trainingsplan_date,
                   trainingsplan_time: row[0].trainingsplan_time,
                   uebunge: uebungsArray


               }
               resolve (trainignsplan);
            }

            reject("hier kein Pln gefunden");
        });
    });
}

export function getAllTrainigsplans() : Promise<trainingsplan[]>{
    return new Promise<trainingsplan[]>((resolve, reject)=> {
       db.all('SELECT * FROM TrainingsPlan ;' , (err, TrainingsProw)=>{
           let  trainingsplansArray : trainingsplan[] = [];
           if (err){
               console.log(err.message + "erro in getAllTrainigsplans");
               reject(err);

           }
           else if(TrainingsProw){
               let uebungsArray: uebungen[] = [];
               for (const trainingsPRowElement of TrainingsProw){
                   db.all('SELECT u.uebungs_id, u.uebungs_beschreibung, u.uebungsZeitInMin  FROM Uebung u , TrP_Üb t WHERE t.trainingsp_id = ? AND t.uebungs_id =u.uebungs_id;' , [trainingsPRowElement.trainingsplan_id], (err, uebungsRow)=>{
                       if(err){
                           console.log(err.message + "erro in getAllTrainigsplans uebungsArray");
                           reject(err);
                       }
                       else {
                           for (const uebungsRowElemet of uebungsRow){
                               let thisUebung: uebungen = {
                                   uebungs_id: uebungsRowElemet.uebungs_id,
                                   uebungs_beschreibung: uebungsRowElemet.uebungs_beschreibung,
                                   uebungsZeitInMin: uebungsRowElemet.uebungsZeitInMin
                               }
                               uebungsArray.push(thisUebung);

                           }
                       }
                   });
                    let thisTrainingsPlan : trainingsplan ={
                        trainingsP_id: trainingsPRowElement.trainingsP_id,
                        student_id: trainingsPRowElement.student_id,
                        trainingsGroup_id: trainingsPRowElement.trainingsGroup_id,
                        trainingsplan_date: trainingsPRowElement.trainingsplan_date,
                        trainingsplan_time: trainingsPRowElement.trainingsplan_time,
                        uebunge: uebungsArray
                   }
                   trainingsplansArray.push(thisTrainingsPlan);
               }
               resolve(trainingsplansArray);
           }
           else {
               reject("erro in getAllTrainigsplans TrainingsProw ")
           }

       }) ;
    });
}

export function getTrainingsPlanFromStudent(student_id :number): Promise<trainingsplan>{
    return new Promise<trainingsplan>((resolve, reject)=>{
       db.get('SELECT *  FROM TrainingsPlan WHERE student_id = ?;' , [student_id], (err, trainingsPlanRow) =>{
           if (err){
               console.log(err.message + " Erro getTrainingsPlanFromStudent");
               reject(err);
           }
           else if (trainingsPlanRow){
               let uebungenFromTrainingsPlan: uebungen[]  =[];
               db.all('SELECT u.uebungs_id, u.uebungs_beschreibung , u.uebungsZeitInMin  FROM Uebung u, TrP_Üb t WHERE u.uebungs_id = t.uebungs_id AND  t.trainingsP_id = ?; ', [trainingsPlanRow.trainingsP_id], (err, uebungsrow) => {
                  if (err){
                      console.log(err.message + " Erro in  getTrainingsPlanFromStudent from  uebungsrow");
                      reject(err);
                  }
                  else if (uebungsrow){
                      for (const uebungsRowElement of uebungsrow){
                          let thisUebung: uebungen = {
                              uebungs_id: uebungsRowElement.uebungs_id,
                              uebungs_beschreibung: uebungsRowElement.uebungs_beschreibung,
                              uebungsZeitInMin: uebungsRowElement.uebungsZeitInMin
                          }
                          uebungenFromTrainingsPlan.push(thisUebung);
                      }
                  }
                  else {
                      reject("bad request");
                  }
               });
               let thisTrainingsPlan: trainingsplan= {
                   trainingsP_id : trainingsPlanRow.trainingsP_id,
                   student_id: trainingsPlanRow.student_id,
                   trainingsGroup_id: trainingsPlanRow.trainingsGroup_id,
                   trainingsplan_date: trainingsPlanRow.trainingsplan_date,
                   trainingsplan_time: trainingsPlanRow.trainingsplan_time,
                   uebunge: uebungenFromTrainingsPlan
               }
               resolve(thisTrainingsPlan);

           }
           else {
               reject("bad request");
           }
       });
    });
}

export  function getTrainingsPlanFromTraininsGroup(trainingsGroup_id:number) : Promise<trainingsplan>{
    return new Promise<trainingsplan>((resolve, reject)=>{
        db.get('SELECT *  FROM TrainingsPlan WHERE trainingsGroup_id = ?;' , [trainingsGroup_id], (err, trainingsPlanRow) =>{
            if (err){
                console.log(err.message + " Erro getTrainingsPlanFromStudent");
                reject(err);
            }
            else if (trainingsPlanRow){
                let uebungenFromTrainingsPlan: uebungen[]  =[];
                db.all('SELECT u.uebungs_id, u.uebungs_beschreibung , u.uebungsZeitInMin  FROM Uebung u, TrP_Üb t WHERE u.uebungs_id = t.uebungs_id AND  t.trainingsP_id = ?; ', [trainingsPlanRow.trainingsP_id], (err, uebungsrow) => {
                    if (err){
                        console.log(err.message + " Erro in  getTrainingsPlanFromStudent from  uebungsrow");
                        reject(err);
                    }
                    else if (uebungsrow){
                        for (const uebungsRowElement of uebungsrow){
                            let thisUebung: uebungen = {
                                uebungs_id: uebungsRowElement.uebungs_id,
                                uebungs_beschreibung: uebungsRowElement.uebungs_beschreibung,
                                uebungsZeitInMin: uebungsRowElement.uebungsZeitInMin
                            }
                            uebungenFromTrainingsPlan.push(thisUebung);
                        }
                    }
                    else {
                        reject("bad request");
                    }
                });
                let thisTrainingsPlan: trainingsplan= {
                    trainingsP_id : trainingsPlanRow.trainingsP_id,
                    student_id: trainingsPlanRow.student_id,
                    trainingsGroup_id: trainingsPlanRow.trainingsGroup_id,
                    trainingsplan_date: trainingsPlanRow.trainingsplan_date,
                    trainingsplan_time: trainingsPlanRow.trainingsplan_time,
                    uebunge: uebungenFromTrainingsPlan
                }
                resolve(thisTrainingsPlan);
            }
            else {
                reject("bad request");
            }


        });
    });
}


export function addOneTrainingsPlanTostudent(student_id: number , trainingsPlan_date: Date, trainingsPlan_time : string){
    db.run('INSERT INTO TrainingsPlan(trainingsP_id , student_id, trainingsGroup_id, trainingsPlan_date, trainingsPlan_time) VALUE (?,?,NULL , ?,?);', [getNextfreeIndexOfTrainingsPlan(getAllTrainigsplans()), student_id, trainingsPlan_date,trainingsPlan_time] , (err)=>{
       if(err){
           console.log(err.message + " erro in addOneTrainingsPlanTostudent");
       }
       else{
           console.log("addet Trainingsplan fro student");
       }
    });

}

export function addOneTrainingsPlantoTrainingsGroup(trainingsGroup_id : number ,  trainingsPlan_date: Date, trainingsPlan_time : string) {
    db.run('INSERT INTO TrainingsPlan(trainingsP_id , student_id, trainingsGroup_id, trainingsPlan_date, trainingsPlan_time) VALUE (?,NULL ,?, ?,?);', [getNextfreeIndexOfTrainingsPlan(getAllTrainigsplans()),trainingsGroup_id ,trainingsPlan_date,trainingsPlan_time] , (err)=>{
        if(err){
            console.log(err.message + " erro in addOneTrainingsPlanTostudent");
        }
        else{
            console.log("addet Trainingsplan fro student");
        }
    });

}



export function deleteTrainingsPlanGenerell (trainingsP_id : number){
    db.run('DELETE FROM TrainingsPlan WHERE trainingsP_id = ?', [trainingsP_id], (err) =>{
       if (err) {
           console.log(err.message + " erro in deleteTrainingsPlanGenerell");
       }
       else{
           console.log("trainingsplan deleted");
       }
    });
}
export function deleteTrainingsPlanFromStudent (student_id:number){
    db.run('DELETE FROM TrainingsPlan WHERE student_id = ?', [student_id], (err) =>{
        if (err) {
            console.log(err.message + " erro in deleteTrainingsPlanGenerell");
        }
        else{
            console.log("trainingsplan deleted");
        }
    });
}

export function deleteTrainingsPlanFromTrainingsGroup (trainingsGroup_id:number){
    db.run('DELETE FROM TrainingsPlan WHERE trainingsGroup_id = ?', [trainingsGroup_id], (err) =>{
        if (err) {
            console.log(err.message + " erro in deleteTrainingsPlanGenerell");
        }
        else{
            console.log("trainingsplan deleted");
        }
    });
}

export async function getNextfreeIndexOfTrainingsPlan(array: Promise<Array<any>>): Promise<number> {
    for (let index = 0; index < (await array).length; index++) {
        if ((await array).indexOf(index)) {
            return index;
        }
    }

    return (await array).length;

}
