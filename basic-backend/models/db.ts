import * as sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose()

export const db = new sqlite.Database('./databases/db.sqlite', err => {
    if (err) {
        console.log(err.message);
    } else console.log("Datenbankverbindung steht");
});

export function creatTbables() {
    db.run("CREATE TABLE IF NOT EXISTS  School(school_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,school_name VARCHAR NOT NULL, school_place VARCHAR NOT NULL, school_plz INT NOT NULL);", err => {
        if (err) {
            console.log(err.message + "in createTabels");
        } else {
            console.log("Created School Table");
        }
    });
    db.run("CREATE TABLE IF NOT EXISTS Student( student_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, student_name VARCHAR NOT NULL, student_lastName VARCHAR NOT NULL, student_age INTEGER NOT NULL, student_lvl VARCHAR ,student_mail VARCHAR, student_telNumber VARCHAR) ;", err => {
        if (err) {
            console.log(err.message + "in student");
        } else {
            console.log("Created Student Table");
        }
    });


    db.run("CREATE TABLE IF NOT EXISTS Uebung(uebungs_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT , uebungs_beschreibung VARCHAR , uebungsZeitInMin VARCHAR );", err => {
        if (err) {
            console.log(err.message + "in Übung");
        } else {
            console.log("you Created the ÜbungsTabel");
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS TrP_Üb(trainingsP_id INTEGER NOT NULL REFERENCES TrainingsPlan(trainingsP_id) ,uebungs_id INTEGER  NOT NULL REFERENCES Uebung(uebungs_id), numberOfSameUebungenInOneTrainingsPlan INTEGER, PRIMARY  KEY(trainingsP_Id, uebungs_id));", err => {
        if (err) {
            console.log(err.message + "in TrP_ÜB");
        } else {
            console.log("you Created the TrP_Üb");
        }
    });
    db.run("CREATE TABLE IF NOT EXISTS  TrainingsGroup(trainingsGroup_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT ,trainingsGroup_name VARCHAR NOT NULL, trainingsGroup_difficulty VARCHAR ,trainingsGroup_duration TIMESTAMP);", err => {
        if (err) {
            console.log(err.message + "in Trainingsgoup");
        } else {
            console.log("CreatedTriningsgroup Table");
        }
    });
    db.run("CREATE TABLE IF NOT EXISTS TrainingsPlan(trainingsP_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,student_id INTEGER  REFERENCES Student(student_id), trainingsGroup_id INTEGER REFERENCES TrainingsGroup(trainingsGroup_id), trainingsPlan_date DATE, trainingsPlan_time TIMESTAMP );", err => {
        if (err) {
            console.log(err.message + "in Trainignsplan");
        } else {
            console.log("CreatedTreinignsplan Table");
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS Teacher( teacher_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, school_id INTEGER  NOT NULL REFERENCES School(school_id), teacher_name VARCHAR NOT NULL, teacher_lastName VARCHAR NOT NULL ,teacher_mail VARCHAR, teacher_telNumber VARCHAR);", err => {
        if (err) {
            console.log(err.message + "in Teacher");
        } else {
            console.log("Created Teacher Table");
        }

    });

    db.run("CREATE TABLE IF NOT EXISTS  SchoStud(school_id INTEGER NOT NULL REFERENCES School(school_id), student_id INTEGER NOT NULL REFERENCES Student(student_id), PRIMARY KEY (school_id, student_id));", err => {
        if (err) {
            console.log(err.message + "in SchoStud");

        } else {
            console.log("Created SchoStud Table");
        }
    });


    db.run("CREATE TABLE IF NOT EXISTS  TeachStu(teacher_id INTEGER NOT NULL REFERENCES Teacher(teacher_id), student_id INTEGER NOT NULL REFERENCES Student(student_id), PRIMARY KEY (teacher_Id, student_id));", err => {
        if (err) {
            console.log(err.message + "in Teachstu");
        } else {
            console.log("Created TeachStu Table");
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS Uebgroup( uebungs_id INTEGER  NOT NULL REFERENCES Uebung(uebungs_id),trainingsGroup_id INTEGER  NOT NULL REFERENCES TrainingsGroup(trainingsGroup_id),numberOfSameUebungenInUebungsGroup INTEGER, PRIMARY KEY (uebungs_id, trainingsGroup_id));", err => {
        if (err) {
            console.log(err.message + " in Übgroup");
        } else {
            console.log("Ceated Übungstabel");
        }
    });


}


