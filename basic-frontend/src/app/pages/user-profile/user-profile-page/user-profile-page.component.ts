import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TrainingsPlanService} from "../../../core/services/trainings-plan.service";
import {trainingsplan} from "../../../types/trainingsplan-interface";
import {student} from "../../../types/student-interface";
import {SchoolService} from "../../../core/services/school.service";
import {school} from "../../../types/school-interface";
import {StudentService} from "../../../core/services/student.service";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  trainingsPArray:trainingsplan[] = [];
  oneStudent: student;
  schoolsArray: school[] = [];
  studentsInSchoolArray: student[] = [];
  selectedSchool: school;
  selectedStudent: student;


  constructor(private studentService: StudentService, private ref: ChangeDetectorRef,private trainingsPService: TrainingsPlanService, private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.getAllSchools();
    //this.studentsInSchoolArray();
  }

  getStudent(indexOfSchool: number){
    this.selectedSchool = this.schoolsArray[indexOfSchool];
    this.getAllStudentsFromSchool(this.selectedSchool.school_id.toString());
  }

  getAllStudentsFromSchool(school_id: string){
    this.studentService.getStudentsFromSchool(school_id).subscribe(studentsArray=>{
      this.studentsInSchoolArray  = studentsArray;

    }, error => {
      console.log(error.message);
    })

  }

  getAllSchools(){
    this.schoolService.getSchools().subscribe( schollsArray=>{
    this.schoolsArray = schollsArray;
  }, error => {
    console.log(error.message);
  })


  }

  getTrainingsPlans(student_id: number, school_id: number){
    console.log(student_id, school_id)
    this.trainingsPService.getAllTrainingsPlanFromStudent(student_id, school_id).subscribe(trainingsPs=>{
      this.trainingsPArray = trainingsPs;
      console.log(this.trainingsPArray);
      this.ref.detectChanges();

    }, error => {
      console.log(error.message);
    });
  }

  deleteUebungeFromTrainingsPlas(trainingsP_id: string, uebungs_id:string){

  }

}
