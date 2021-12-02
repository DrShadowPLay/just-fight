import * as sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose()

export const db = new sqlite.Database('./databases/db.sqlite', err => {
    if (err) {
        console.log(err.message);
    } else console.log("Datenbankverbindung steht");
});

export function creatTbables() {
    db.run("CREATE TABLE IF NOT EXISTS  School(school_Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,school_Name VARCHER NOT NULL, school_place VARCHAR NOT NULL, school_plz INT NOT NULL);", err => {
        if (err) {
            console.log(err.message + "in createTabels");
        } else {
            console.log("Created School Table");
        }
    });
    db.run("CREATE TABLE IF NOT EXISTS Student( student_Id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, student_Name VARCHAR NOT NULL, student_LastName VARCHAR NOT NULL, student_age INTEGER NOT NULL, student_lvl VARCHAR ,student_mail VARCHAR, student_telNumber VARCHAR) ;", err => {
        if (err) {
            console.log(err.message + "in student");
        } else {
            console.log("Created Student Table");
        }
    });


    db.run("CREATE TABLE IF NOT EXISTS Übung(übungs_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT , beschreibung VARCHAR , zeit_in_min VARCHAR );", err => {
        if (err) {
            console.log(err.message + "in Übung");
        } else {
            console.log("you Created the ÜbungsTabel");
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS TrP_Üb(trainingsP_Id INTEGER NOT NULL REFERENCES TrainingsPlan(trainingsP_Id) ,übungs_id INTEGER  NOT NULL REFERENCES Übung(übungs_id), PRIMARY  KEY(trainingsP_Id, übungs_id));", err => {
        if (err) {
            console.log(err.message + "in TrP_ÜB");
        } else {
            console.log("you Created the TrP_Üb");
        }
    });
    db.run("CREATE TABLE IF NOT EXISTS  TrainingsGroup(trainingsGroup_Id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT ,trainigsGroup_name VARCHAR NOT NULL, trainingsGroup_difficulty VARCHAR ,trainingsGroup_duration TIMESTAMP);", err => {
        if (err) {
            console.log(err.message + "in Trainingsgoup");
        } else {
            console.log("CreatedTriningsgroup Table");
        }
    });
    db.run("CREATE TABLE IF NOT EXISTS TrainingsPlan(trainingsP_Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,student_Id INTEGER  NOT NULL REFERENCES Student(student_Id), trainingsGroup_Id INTEGER NOT NULL REFERENCES TrainingsGroup(trainingsGroup_Id), trainingsPlan_date DATE, trainingsPlan_time TIMESTAMP );", err => {
        if (err) {
            console.log(err.message + "in Trainignsplan");
        } else {
            console.log("CreatedTreinignsplan Table");
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS Teacher( teacher_Id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, school_Id INTEGER  NOT NULL REFERENCES School(school_Id), teacher_Name VARCHAR NOT NULL, teacher_LastName VARCHAR NOT NULL ,teacher_mail VARCHAR, teacher_telNumber VARCHAR);", err => {
        if (err) {
            console.log(err.message + "in Teacher");
        } else {
            console.log("Created Teacher Table")
        }

    });

    db.run("CREATE TABLE IF NOT EXISTS  SchoStud(school_Id INTEGER NOT NULL REFERENCES School(school_Id), student_Id INTEGER NOT NULL REFERENCES Student(student_Id), PRIMARY KEY (school_Id, student_Id));", err => {
        if (err) {
            console.log(err.message + "in SchoStud");

        } else {
            console.log("Created SchoStud Table");
        }
    });


    db.run("CREATE TABLE IF NOT EXISTS  TeachStu(teacher_Id INTEGER NOT NULL REFERENCES Teacher(teacher_Id), student_Id INTEGER NOT NULL REFERENCES Student(student_Id), PRIMARY KEY (teacher_Id, student_Id));", err => {
        if (err) {
            console.log(err.message + "in Teachstu");
        } else {
            console.log("Created TeachStu Table");
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS Übgroup(übungs_id INTEGER  NOT NULL REFERENCES Übung(übungs_id),trainingsGroup_Id INTEGER  NOT NULL REFERENCES TrainingsGroup(trainingsGroup_Id), PRIMARY KEY (übungs_id, trainingsGroup_Id));", err => {
        if (err) {
            console.log(err.message + " in Übgroup");
        } else {
            console.log("Ceated Übungstabel");
        }
    });


}
